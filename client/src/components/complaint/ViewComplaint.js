import React, { useState, useEffect, useContext } from "react";
import { DeleteIdContext, IdContext } from "./MyComplaints";
import axios from "axios";

function ViewComplaint({ authorized }) {
  const complaint_id = useContext(IdContext);
  const delete_id = useContext(DeleteIdContext);
  const [complaints, setcomplaints] = useState([]);
  useEffect(() => {
    if (delete_id !== complaint_id) {
      axios
        .get(
          `http://localhost:5000/api/complaints/viewcomplaint/${complaint_id}`,
          {
            headers: { authToken: sessionStorage.getItem("authToken") },
          }
        )
        .then((res) => {
          setcomplaints(res.data);
          console.log(res.data);
        })
        .catch((e) => console.log(e));
    }
  }, [complaint_id, delete_id]);

  return (
    <div>
      {complaints.map((complaint) => (
        <div className="container" key={complaint.complaint_id}>
          <dl className="row">
            {/* <dt className="col-sm-5">Complaint ID</dt>
            <dd className="col-sm-7">{complaint.complaint_id}</dd>
            <dt className="col-sm-5">Complainant ID</dt>
            <dd className="col-sm-7"> {complaint.consumer_id} </dd> */}
            <dt className="col-sm-5">Subject</dt>
            <dd className="col-sm-7"> {complaint.subject}</dd>
            <dt className="col-sm-5">Description</dt>
            <dd className="col-sm-7">{complaint.description} </dd>
            <dt className="col-sm-5">Product</dt>
            <dd className="col-sm-7">{complaint.product} </dd>
            <dt className="col-sm-5">Max price</dt>
            <dd className="col-sm-7"> {complaint.max_price}</dd>
            <dt className="col-sm-5">Seller's retail price</dt>
            <dd className="col-sm-7"> {complaint.sellers_retail_price}</dd>
            <dt className="col-sm-5">Date created</dt>
            <dd className="col-sm-7"> {complaint.complaint_date}</dd>
          </dl>
        </div>
      ))}
    </div>
  );
}

export default ViewComplaint;
