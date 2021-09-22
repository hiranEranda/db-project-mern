import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import AdNavBar from "./AdNavBar";

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
    return () => {
      axios.get(`http://localhost:5000/api/admin/allcomplaints`);
    };
  }, [deleteid.id]);

  const view = (val) => {
    setviewid({ id: val });
  };

  const del = (val) => {
    setdeleteid({ id: val });
    // axios
    //   .delete(`http://localhost:5000/api/complaints/deletecomplaint/${val}`, {
    //     headers: { authToken: sessionStorage.getItem("authToken") },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((e) => console.log(e.message));
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
        <h2>Recent Complaints</h2>
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive-sm">
              <table className="table table-bordred table-striped table-fixed">
                <tbody>
                  <tr>
                    <th>Subject</th>
                    <th>Consumer's Name</th>
                    <th>Seller's Name</th>
                    <th>Date</th>
                    <th>Details</th>
                    <th>Delete</th>
                  </tr>
                  {complaints.map((complaint) => (
                    <tr key={complaint.complaint_id}>
                      <td>{complaint.subject}</td>
                      <td>
                        {complaint.uFname} {complaint.uLname}
                      </td>
                      <td>
                        {complaint.sFname} {complaint.sLname}
                      </td>
                      <td>{complaint.complaint_date}</td>
                      <td className="text-center">
                        <div className="h5">
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
      </div>
    </>
  );
}

export default AllComplaints;
