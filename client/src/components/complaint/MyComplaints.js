import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { IconButton } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import ViewComplaint from "./ViewComplaint";
import { HashLoader } from "react-spinners";

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

        // window.location.reload();
      })
      .catch((e) => console.log(e));
  };

  if (!authorized) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <div className="container">
        <h2>Recent Complaints</h2>
        {spinner ? (
          <div className="cliploader-div d-flex justify-content-center align-items-center">
            <HashLoader size={80} color={"0f0"} />\
          </div>
        ) : null}
        <div style={{ display: show ? "block" : "none" }}>
          <Grid container>
            <Grid item xs={6}>
              <div className="row">
                <div className="col-md-12">
                  <div className="table-responsive">
                    <table className="table table-bordred table-striped">
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
                            <td>
                              <Grid item xs={8}>
                                <IconButton
                                  color="primary"
                                  onClick={() => view(complaint.complaint_id)}
                                >
                                  <DoubleArrowIcon />
                                </IconButton>
                              </Grid>
                            </td>
                            <td>
                              <Grid item xs={8}>
                                <IconButton
                                  color="primary"
                                  onClick={() => del(complaint.complaint_id)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Grid>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <DeleteIdContext.Provider value={deleteid.id}>
                <IdContext.Provider value={viewid.id}>
                  <ViewComplaint />
                </IdContext.Provider>
              </DeleteIdContext.Provider>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

export default MyComplaints;
