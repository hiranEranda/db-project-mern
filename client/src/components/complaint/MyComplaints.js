import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import ViewComplaint from "./ViewComplaint";

function MyComplaints() {
  const client_id = 1;
  const [complaints, setcomplaints] = useState([]);

  useEffect(() => {
    axios(`http://localhost:5000/api/complaints/mycomplaints/${client_id}`)
      .then((res) => {
        console.log(res.data);
        setcomplaints(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const click = (val) => {
    console.log(val);
  };
  return (
    <>
      <div className="container">
        <h2>Recent Complaints</h2>
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
                          <DoubleArrowIcon
                            onClick={() => click(complaint.complaint_id)}
                          />
                        </Grid>
                      </td>
                      <td>
                        <Grid item xs={8}>
                          <DeleteIcon
                            onClick={() => click(complaint.complaint_id)}
                          />
                        </Grid>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <ViewComplaint />
      </div>
    </>
  );
}

export default MyComplaints;
