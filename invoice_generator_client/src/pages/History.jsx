import { useEffect, useState } from "react";

const History = () => {
  const [reserve, setReserve] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/reserve")
      .then((res) => res.json())
      .then((result) => setReserve(result.data));
  }, []);

  const generateInvoice = (id) => {
    fetch(`http://localhost:4000/invoice/${id}`)
      .then((res) => res.json())
      .then((invoiceData) => {
        printInvoice(invoiceData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  
  const printInvoice = (invoiceData) => {
    console.log(invoiceData);
    var invoiceContent = `
      <html>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
       
        </style>
      </head>
      <body>
        <div class="flex justify-center gap-5">
          <div>
              <h2>RENTER INFO</h2>
              <p>${invoiceData.firstName} ${invoiceData.lastName}</p>
              <p>${invoiceData.email}</p>
              <p>${invoiceData.phoneNumber}</p>
          </div>
          <div>
              <h2>Reservation</h2>
              <p>Date/Time Out: ${invoiceData.pickupDateTime}</p>
              <p>Date/Time Out: ${invoiceData.dropDateTime}</p>

              <div class="bg-gray-300 p-2">
                <h2 class="font-bold">CHARGE SUMMARY</h2>

                <table>
                  <thead>
                    <tr>
                        <th></th>
                        <th>Unit</th>
                        <th>Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                  ${
                    invoiceData.hour
                      ? `<tr> 
                            <td>Hourly</td>
                            <td>${invoiceData.hour}</td>
                            <td>${invoiceData.hour*invoiceData.hourlyRate}</td>
                        </tr>`
                      : ""
                  }
                  ${
                    invoiceData.day
                      ? `<tr> 
                            <td>Day</td>
                            <td>${invoiceData.day}</td>
                            <td>${invoiceData.day*invoiceData.dailyRate}</td>
                        </tr>`
                      : ""
                  }

                  ${
                    invoiceData.week
                      ? `<tr> 
                            <td>Week</td>
                            <td>${invoiceData.week}</td>
                            <td>${invoiceData.week*invoiceData.weeklyRate}</td>
                        </tr>`
                      : ""
                  }
                  ${
                    invoiceData.discount
                      ? `<tr> 
                            <td>Discount</td>
                            <td></td>
                            <td>${invoiceData.discount}</td>
                        </tr>`
                      : ""
                  }

                  ${
                    invoiceData.additionalCharge
                      ? `<tr> 
                            <td>Additional Charge</td>
                            <td></td>
                            <td>${invoiceData.additionalCharge}</td>
                        </tr>`
                      : ""
                  }
                  ${
                    invoiceData.collisionDamageWaiver
                      ? `<tr> 
                            <td>Collision Damage waiver</td>
                            <td></td>
                            <td>9$</td>
                        </tr>`
                      : ""
                  }
                  ${
                    invoiceData.liabilityInsurance
                      ? `<tr> 
                            <td>Liability Insurance</td>
                            <td></td>
                            <td>16$</td>
                        </tr>`
                      : ""
                  }
                  ${
                    invoiceData.rentTax
                      ? `<tr> 
                            <td>Rent tax</td>
                            <td></td>
                            <td>11$</td>
                        </tr>`
                      : ""
                  }
                  
                  
                  </tbody>
                </table>

                <hr>
                <h2>Total: ${invoiceData.total} $</h2>


              </div>
          </div>
        </div>
      </body>
      </html>
    `;

    var printWindow = window.open("", "_blank");
    printWindow.document.write(invoiceContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="mt-10">
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Sl.No</th>
              <th>Name</th>
              <th>Address</th>
              <th>Pickup Date</th>
              <th>Return Date</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {reserve?.map((r, index) => {
              var pickDate = new Date(r.pickupDateTime)
                .toISOString()
                .slice(0, 10);
              var pickTime = new Date(r.pickupDateTime)
                .toTimeString()
                .slice(0, 8);

              var dropDate = new Date(r.dropDateTime)
                .toISOString()
                .slice(0, 10);
              var dropTime = new Date(r.dropDateTime)
                .toTimeString()
                .slice(0, 8);

              return (
                <tr>
                  <th>{index + 1}</th>
                  <th>{r.firstName + " " + r.lastName}</th>
                  <td>{r.address}</td>
                  <td>
                    {pickDate}-{pickTime}
                  </td>
                  <td>
                    {dropDate}-{dropTime}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => generateInvoice(r._id)}
                    >
                      Invoice
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
