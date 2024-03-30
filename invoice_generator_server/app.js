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
    const result = await Reserve.find();
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

   const a = hourDifference(result.pickupDateTime,result.dropDateTime)
   console.log(a)

    // const invoiceData = {
    //   firstName: result.firstName,
    //   lastName: result.lastName,
    //   address: result.address,
    // };

    // res.json(invoiceData);
    

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

function hourDifference(date1, date2) {
  // Convert strings to Date objects
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  // Calculate the difference in milliseconds
  let diffMilliseconds = Math.abs(d2 - d1);

  // Convert milliseconds to hours
  let hourDiff = diffMilliseconds / (1000 * 60 * 60);

  // If hour difference exceeds 24 hours
  if (hourDiff >= 24) {
      let days = Math.floor(hourDiff / 24);
      let remainingHours = Math.floor(hourDiff % 24);
      if (days >= 7) {
          let weeks = Math.floor(days / 7);
          let remainingDays = days % 7;
          return `${weeks} week${weeks > 1 ? 's' : ''} and ${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
      } else {
          return `${days} day${days > 1 ? 's' : ''} and ${remainingHours} hour${remainingHours > 1 ? 's' : ''}`;
      }
  } else {
      return `${Math.floor(hourDiff)} hour${hourDiff > 1 ? 's' : ''}`;
  }
}




app.listen(port, () => console.log(`Server is listeing at port ${port}`));
