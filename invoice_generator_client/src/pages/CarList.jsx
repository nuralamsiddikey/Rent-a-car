import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarContext } from "../Context";

const CarList = () => {
 const {cars,loading} = useCarContext()
 const navigate = useNavigate()

 if(loading) return <div className="flex justify-center mt-20"><span className="loading loading-dots loading-lg"></span></div>



  return (
    <div className="grid grid-cols-2 justify-center gap-10 mt-10">
      {cars?.map((car,index) => (
        <div key={index} className="card bg-base-100 shadow-xl">
          <figure>
            <img src={car.imageURL} alt="car" />
          </figure>
          <div className="card-body">
            <h2 className="bg-gray-400 text-white rounded-md p-1">
                {car.make} {car.type}
            </h2>
            <h2 className="font-bold">Features: </h2>
            {car.features.map((f, index) => (
              <p key={index}>
                {index + 1}. {f}
              </p>
            ))}

            <h2 className="font-bold">Rates: </h2>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Hourly</th>
                    <th>Daily</th>
                    <th>Weekly</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{car.rates.hourly}</td>
                    <td>{car.rates.daily}</td>
                    <td>{car.rates.weekly}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarList;
