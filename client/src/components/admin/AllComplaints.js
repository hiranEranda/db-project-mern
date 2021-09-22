import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import AdNavBar from "./AdNavBar";
import AdViewComplaint from "./AdViewComplaint";

export const IdContext = React.createContext();
export const DeleteIdContext = React.createContext();

function AllComplaints({ authorized }) {
  const [complaints, setcomplaints] = useState([]);

  const [deleteid, setdeleteid] = useState({ id: 100000000 });
  const [viewid, setviewid] = useState({ id: 0 });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/admin/allcomplaints`, {
        headers: { authToken: sessionStorage.getItem("authToken") },
      })
      .then((res) => {
        setcomplaints(res.data);
      })
      .catch((e) => console.log(e));
  }, [deleteid.id]);

  const view = (val) => {
    setviewid({ id: val });
  };

  const del = (val) => {
    setdeleteid({ id: val });
    console.log(val);
    axios
      .delete(`http://localhost:5000/api/admin/deletecomplaint/${val}`, {
        headers: { authToken: sessionStorage.getItem("authToken") },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => console.log(e.message));
  };

  if (!authorized) {
    return (
      <>
        {alert("Unauthorized Access Bloked")}
        <Redirect to="/admin/login" />
      </>
    );
  }
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
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive-sm">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllComplaints;
