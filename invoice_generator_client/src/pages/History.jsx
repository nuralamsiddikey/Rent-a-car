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
    var invoiceContent = `
      <div>
        <h1>Invoice</h1>
        <p>Name: ${invoiceData.firstName} ${invoiceData.lastName}</p>
        <p>Address: ${invoiceData.address}</p>
      </div>
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
