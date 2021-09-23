import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import ViewComplaint from "./ViewComplaint";
import { HashLoader } from "react-spinners";
import AppNavBar from "../layouts/AppNavBar";

export const IdContext = React.createContext();
export const DeleteIdContext = React.createContext();

function MyComplaints({ authorized }) {
  const [complaints, setcomplaints] = useState([]);
  const [viewid, setviewid] = useState({ id: 0 });

  const [deleteid, setdeleteid] = useState({ id: 100000000 });

  const [spinner, setSpinner] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
      setShow(true);
    }, 1000);
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/complaints/mycomplaints`, {
        headers: { authToken: sessionStorage.getItem("authToken") },
      })
      .then((res) => {
        setcomplaints(res.data);
      })
      .catch((e) => console.log(e));
    return () => {
      axios.get(`http://localhost:5000/api/complaints/mycomplaints`, {
        headers: { authToken: sessionStorage.getItem("authToken") },
      });
    };
  }, [deleteid.id]);

  const view = (val) => {
    setviewid({ id: val });
  };

  const del = (val) => {
    setdeleteid({ id: val });
    axios
      .delete(`http://localhost:5000/api/complaints/deletecomplaint/${val}`, {
        headers: { authToken: sessionStorage.getItem("authToken") },
      })
      .then((res) => {
        console.log(res.data);
        alert("Complaint deleted!");
      })
      .catch((e) => console.log(e.message));
  };

  if (!authorized) {
    return (
      <>
        {alert("You have to be logged in first")}
        <Redirect to="/" />
      </>
    );
  }
  return (
    <>
      <AppNavBar />
      <div className="container">
        <h3 className="pt-2  text-center">Recent Complaints</h3>
        <hr className="mb-4" />
        {spinner ? (
          <div className="cliploader-div d-flex justify-content-center align-items-center">
            <HashLoader size={80} color={"0f0"} />\
          </div>
        ) : null}
        <div style={{ display: show ? "block" : "none" }}>
          <div className="container">
            <div className="row">
              <div className="col-7">
                <div className="overflow-auto" style={{ height: 480.0 }}>
                  <div className="table-responsive-sm">
                    <table className="table table-bordred table-striped table-fixed">
                      <tbody>
                        <tr>
                          <th>Subject</th>
                          <th>Seller's Name</th>
                          <th>Date</th>
                          <th>Details</th>
                          <th>Delete</th>
                        </tr>
                        {complaints.map((complaint) => (
                          <tr key={complaint.complaint_id}>
                            <td>{complaint.subject}</td>
                            <td>
                              {complaint.sFname} {complaint.sLname}
                            </td>
                            <td>{complaint.complaint_date}</td>
                            <td className="text-center">
                              <div className="h5">
                                {" "}
                                <i
                                  className="bi bi-arrow-right-square-fill"
                                  onClick={() => view(complaint.complaint_id)}
                                ></i>
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
              <div className="col-5 align-items-center">
                <div className="card border-secondary">
                  <div className="card-body">
                    <h4 className="card-title mb-3 text-center">
                      Complaint Details
                    </h4>
                    <div className="card-text">
                      <DeleteIdContext.Provider value={deleteid.id}>
                        <IdContext.Provider value={viewid.id}>
                          <ViewComplaint />
                        </IdContext.Provider>
                      </DeleteIdContext.Provider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyComplaints;
