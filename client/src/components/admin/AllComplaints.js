import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import AdNavBar from "./AdNavBar";
import AdViewComplaint from "./AdViewComplaint";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const IdContext = React.createContext();
export const DeleteIdContext = React.createContext();

function AllComplaints({ authorized }) {
  const [selectedDate, setSelectedDate] = useState(null);

  let date = null;

  if (selectedDate != null) {
    date = convert(selectedDate);
  }

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  const [complaints, setComplaints] = useState([]);

  const [deleteid, setDeleteid] = useState({ id: 100000000 });
  const [viewid, setViewid] = useState({ id: 0 });

  const handler = () => {
    window.location.reload();
  };

  useEffect(() => {
    console.log(date);

    if (date != null) {
      axios
        .get(`http://localhost:5000/api/admin/filteredcomplaints/${date}`, {
          headers: { authToken: sessionStorage.getItem("authToken") },
        })
        .then((res) => {
          setComplaints(res.data);
        })
        .catch((e) => console.log(e));
    } else {
      axios
        .get(`http://localhost:5000/api/admin/allcomplaints/`, {
          headers: { authToken: sessionStorage.getItem("authToken") },
        })
        .then((res) => {
          setComplaints(res.data);
        })
        .catch((e) => console.log(e));
    }
  }, [deleteid.id, date]);

  const view = (val) => {
    setViewid({ id: val });
  };

  const del = (val) => {
    setDeleteid({ id: val });
    console.log(val);
    axios
      .delete(`http://localhost:5000/api/admin/deletecomplaint/${val}`, {
        headers: { authToken: sessionStorage.getItem("authToken") },
      })
      .then((res) => {
        console.log(res.data);
        alert("Complaint deleted!");
      })
      .catch((e) => console.log(e.message));
  };

  // if (!authorized) {
  //   return (
  //     <>
  //       {alert("Unauthorized Access Bloked")}
  //       <Redirect to="/admin/login" />
  //     </>
  //   );
  // }
  return (
    <>
      <AdNavBar />
      <div className="container">
        <h2 id="header" className="text-center">
          Recent Complaints
        </h2>
        <hr />
        <div className="container mb-5">
          <DeleteIdContext.Provider value={deleteid.id}>
            <IdContext.Provider value={viewid.id}>
              <AdViewComplaint />
            </IdContext.Provider>
          </DeleteIdContext.Provider>
        </div>

        <div className="container">
          <div>
            <h3 style={{ paddingRight: "20px", width: "10" }}>
              Filter by date
            </h3>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
              maxDate={new Date()}
            />

            <button
              style={{ marginTop: "20px", width: "10" }}
              className="btn btn-primary"
              onClick={handler}
            >
              Show All
            </button>
          </div>

          <div className="row" style={{ marginTop: 30 }}>
            <div className="col-md-12">
              <div className="table-responsive-sm">
                {complaints.length == 0 ? (
                  <h2>No complaints recorded on {date}</h2>
                ) : (
                  <table
                    id="table"
                    className="table table-bordered table-light table-hover border-secondary"
                  >
                    <tbody>
                      <tr>
                        <th className="text-center">Subject</th>
                        <th className="text-center">Consumer's Name</th>
                        <th className="text-center">Seller's Name</th>
                        <th className="text-center">Date</th>
                        <th className="text-center">Details</th>
                        <th className="text-center">Delete</th>
                      </tr>
                      {complaints.map((complaint) => (
                        <tr key={complaint.complaint_id}>
                          <td className="text-center">{complaint.subject}</td>
                          <td className="text-center">
                            {complaint.uFname} {complaint.uLname}
                          </td>
                          <td className="text-center">
                            {complaint.sFname} {complaint.sLname}
                          </td>
                          <td className="text-center">
                            {complaint.complaint_date}
                          </td>
                          <td className="text-center">
                            <div className="h5">
                              <a href="#header">
                                <i
                                  className="bi bi-arrow-right-square-fill"
                                  onClick={() => view(complaint.complaint_id)}
                                ></i>
                              </a>
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="h5 ">
                              <i
                                className="bi bi-trash-fill"
                                onClick={() => del(complaint.complaint_id)}
                              ></i>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllComplaints;
