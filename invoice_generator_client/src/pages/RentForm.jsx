import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCarContext } from "../Context";
import toast from "react-hot-toast";

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

const RentForm = () => {
  const { id } = useParams();
  const { cars } = useCarContext();
  const [car, setCar] = useState({});
  const [hour, setHour] = useState(null);
  const [day, setDay] = useState(null);
  const [week, setWeek] = useState(null);

  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    pickupDateTime: "",
    dropDateTime: "",
    discount: 0,
    additionalCharge: 0,
    vehicleId: "",
    collisionDamageWaiver: false,
    liabilityInsurance: false,
    rentTax: false,
  });

  const navigate = useNavigate();

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setCustomerInfo((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleSubmit = () => {
    fetch("http://localhost:4000/reserve", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(customerInfo),
    }).then((res) => {
      if (res.ok) {
        toast.success("Successfully created!");
        navigate("/history");
      } else toast.error("Something went wrong");
    });
  };

  useEffect(() => {
    const selectedCar = cars?.filter((c) => c.id === id);
    setCar(selectedCar[0]);
  }, []);

  useEffect(() => {
    const dif = hourDifference(
      customerInfo.pickupDateTime,
      customerInfo.dropDateTime
    );
    console.log(dif);
    if (dif.day) setDay(dif.day);
    if (dif.week) setWeek(dif.week);
    if (dif.hour) setHour(dif.hour);
  }, [customerInfo.pickupDateTime, customerInfo.dropDateTime]);

  return (
    <div className="border p-10 m-4 mt-10 rounded-lg">
      <div className="flex justify-end">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5 mt-8">
        <div>
          <div>
            <h3>Reservation Details</h3>
            <hr className="mt-2 mb-4" />
            <div className="border p-5 rounded-md mt-3">
              {/* <label htmlFor="pickupDate" className="text-gray-600">
                Reservation ID
              </label>
              <input
                id="pickupDate"
                name="pickupDate"
                value={customerInfo.pickupDate}
                onChange={handleOnChange}
                className="input input-bordered w-full max-w-xs block mt-2 mb-3"
              /> */}
              <label htmlFor="pickupDate" className="text-gray-600">
                Pickup Date <span className="text-red-600">*</span>
              </label>
              <input
                id="pickupDate"
                type="datetime-local"
                name="pickupDateTime"
                value={customerInfo.pickupDateTime}
                onChange={handleOnChange}
                className="input input-bordered w-full max-w-xs block mt-2 mb-3"
              />

              <label htmlFor="dropDate" className="text-gray-600">
                Return Date <span className="text-red-600">*</span>
              </label>
              <input
                id="dropDate"
                type="datetime-local"
                name="dropDateTime"
                value={customerInfo.dropDateTime}
                onChange={handleOnChange}
                className="input input-bordered w-full max-w-xs block mt-2 mb-5"
              />

              <div className="flex justify-between my-2">
                <p>Duration</p>
                <p className="border py-1 px-5 rounded-lg">
                  {week && <span>{week}week </span>}
                  {day && <span>{day}day </span>}
                  {hour && <span>{hour}hour</span>}
                </p>
              </div>

              <label htmlFor="discount" className="text-gray-600">
                Discount
              </label>
              <input
                id="discount"
                type="number"
                placeholder="discount"
                name="discount"
                value={customerInfo.discount !== 0 ? customerInfo.discount : ""}
                onChange={handleOnChange}
                className="input input-bordered w-full max-w-xs block mt-2"
              />
            </div>
          </div>
          <div className="mt-5">
            <h2>Vehicle Information</h2>
            <hr className="mt-2 mb-3" />
            <div className="border p-5 rounded-md">
              {/* <label htmlFor="vehicleType">Vehicle Type <span className="text-red-600">*</span> </label>
              <select className="select select-bordered w-full max-w-xs mt-2 mb-3">
              <option disabled selected>
                  Select
                </option>
                {cars?.map(c=>(<option>{c.type}</option>))}
              </select> */}
              <label htmlFor="vehicle">
                Vehicle <span className="text-red-600">*</span>
              </label>
              <select
                name="vehicleId"
                className="select select-bordered w-full max-w-xs mt-2"
                onChange={handleOnChange}
              >
                <option disabled selected>
                  Select
                </option>
                {cars?.map((c) => (
                  <option value={c.id} key={c.id}>
                    {c.make}-{c.model} ({c.type})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <div>
            <h2>Customer Information</h2>
            <hr className="mt-2 mb-3" />
            <div className="border p-5 rounded-md">
              <label htmlFor="fname">
                First Name <span className="text-red-600">*</span>
              </label>
              <input
                id="fname"
                placeholder="first name"
                name="firstName"
                value={customerInfo.firstName}
                onChange={handleOnChange}
                className="input input-bordered w-full max-w-xs block mt-2 mb-3"
              />
              <label htmlFor="lname">Last Name</label>
              <input
                id="lname"
                placeholder="last name"
                name="lastName"
                value={customerInfo.lastName}
                onChange={handleOnChange}
                className="input input-bordered w-full max-w-xs block mt-2 mb-3"
              />

              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                id="phoneNumber"
                placeholder="phone number"
                name="phoneNumber"
                value={customerInfo.phoneNumber}
                onChange={handleOnChange}
                className="input input-bordered w-full max-w-xs block mt-2 mb-3"
              />

              <label htmlFor="email">Email</label>
              <input
                id="email"
                placeholder="email"
                name="email"
                value={customerInfo.email}
                onChange={handleOnChange}
                className="input input-bordered w-full max-w-xs block mt-2 mb-3"
              />

              <label htmlFor="address" className="text-gray-600 font-bold">
                Address
              </label>
              <input
                id="address"
                placeholder="address"
                name="address"
                value={customerInfo.address}
                onChange={handleOnChange}
                className="input input-bordered w-full max-w-xs block mt-2"
              />
            </div>
          </div>
          <div className="mt-3">
            <h2>Additional Charges</h2>
            <hr className="mt-2 mb-3" />
            <div className="border p-5 rounded-md">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 justify-between items-center">
                  <input
                    onChange={(e) =>
                      setCustomerInfo((prevData) => ({
                        ...prevData,
                        collisionDamageWaiver: e.target.checked,
                      }))
                    }
                    type="checkbox"
                    className="checkbox checkbox-md"
                  />
                  <span>Collision Damage Waiver</span>
                </div>
                <span>$9.00</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex  gap-2 justify-between items-center mt-3">
                  <input
                    onChange={(e) =>
                      setCustomerInfo((prevData) => ({
                        ...prevData,
                        liabilityInsurance: e.target.checked,
                      }))
                    }
                    type="checkbox"
                    className="checkbox checkbox-md"
                  />
                  <span>Liability Insurance</span>
                </div>
                <span>$16.00</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 mt-3">
                  <input
                    onChange={(e) =>
                      setCustomerInfo((prevData) => ({
                        ...prevData,
                        rentTax: e.target.checked,
                      }))
                    }
                    type="checkbox"
                    className="checkbox checkbox-md"
                  />
                  <span>Rent Tax</span>
                </div>
                <span>$11.00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <h2>Charges Summary</h2>
          <hr className="mt-2 mb-3" />
          <div className="overflow-x-auto border rounded-lg bg-[#DFDFFF]">
            <table className="table">
              <thead>
                <tr>
                  <th>Charge</th>
                  <th>Unit</th>
                  <th>Rate</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {hour && (
                  <tr>
                    <td>Hour</td>
                    <td>{hour}</td>
                    <td>c</td>
                    <td>d</td>
                  </tr>
                )}
                  {day && (
                  <tr>
                    <td>Day</td>
                    <td>{day}</td>
                    <td>c</td>
                    <td>d</td>
                  </tr>
                )}
                  {week && (
                  <tr>
                    <td>Week</td>
                    <td>{week}</td>
                    <td>c</td>
                    <td>d</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentForm;
