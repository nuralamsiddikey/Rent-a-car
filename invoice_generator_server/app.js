import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Reserve from "./models/Reserve.js";
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

async function main() {
  await mongoose.connect(
    "mongodb+srv://nur:99088@cluster0.jzt6s.mongodb.net/invoice?retryWrites=true&w=majority&appName=Cluster0"
  );
}

main()
  .then(() => console.log("DBConnection success"))
  .catch((error) => console.log("DBConnection failed!!", error));

app.get("/carsList", async (req, res) => {
  try {
    const response = await fetch(
      "https://exam-server-7c41747804bf.herokuapp.com/carsList"
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/reserve", async (req, res) => {
  try {
    const newReserve = new Reserve(req.body);
    await newReserve.save(req.body);

    res.json({ message: "Successfully created the reserve" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/reserve", async (req, res) => {
  try {
    const result = await Reserve.find().sort({ createdAt: -1 });
    res.json({ message: "Showing results", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/invoice/:id", async (req, res) => {
  try {
    const result = await Reserve.findOne({ _id: req.params.id });
    if (!result) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    const a = hourDifference(result.pickupDateTime, result.dropDateTime);
    console.log(a);
    const response = await fetch(
      "https://exam-server-7c41747804bf.herokuapp.com/carsList"
    );
    const { data } = await response.json();

    const rate = data.filter((r) => result.vehicleId === r.id);
    let total = 0;

    if (a.hour) total = total + a.hour * rate[0].rates.hourly;
    if (a.day) total = total + a.day * rate[0].rates.daily;
    if (a.week) total = total + a.week * rate[0].rates.weekly;

    if(result.collisionDamageWaiver) total = total-9
    if(result.liabilityInsurance) total = total-16
    if(result.rentTax) total = total-11
    if(result.discount) total = total-result.discount


    const invoiceData = {
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      phoneNumber: result.phoneNumber,
      address: result.address,
      discount: result.discount > 0 ? result.discount : null,
      additionalCharge:
        result.additionalCharge > 0 ? result.additionalCharge : null,
      collisionDamageWaiver: result.collisionDamageWaiver
        ? result.collisionDamageWaiver
        : null,
      liabilityInsurance: result.liabilityInsurance
        ? result.liabilityInsurance
        : null,
      rentTax: result.rentTax ? result.rentTax : null,
      week: a.week ? a.week : null,
      day: a.day ? a.day : null,
      hour: a.hour ? a.hour : null,
      hourlyRate: rate[0].rates.hourly,
      dailyRate: rate[0].rates.daily,
      weeklyRate: rate[0].rates.weekly,
      pickupDateTime: result.pickupDateTime,
      dropDateTime: result.dropDateTime,
      total,
    };

    res.json(invoiceData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

function hourDifference(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  let diffMilliseconds = Math.abs(d2 - d1);

  let hourDiff = diffMilliseconds / (1000 * 60 * 60);

  let result = {};

  if (hourDiff >= 24) {
    let days = Math.floor(hourDiff / 24);
    let remainingHours = Math.floor(hourDiff % 24);
    if (days >= 7) {
      let weeks = Math.floor(days / 7);
      let remainingDays = days % 7;
      result.week = weeks;
      result.day = remainingDays;
      result.hour = remainingHours;
    } else {
      result.day = days;
      result.hour = remainingHours;
    }
  } else {
    result.hour = Math.floor(hourDiff);
  }
  return result;
}

app.listen(port, () => console.log(`Server is listeing at port ${port}`));
