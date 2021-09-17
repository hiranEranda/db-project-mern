import React, { useState, useEffect, useContext } from "react";
import { IdContext } from "./MyComplaints";
import axios from "axios";

function ViewComplaint() {
  const complaint_id = useContext(IdContext);
  const [complaints, setcomplaints] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/complaints/viewcomplaint/${complaint_id}`)
      .then((res) => {
        setcomplaints(res.data);
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  }, [complaint_id]);
  return (
    <div>
      {complaints.map((complaint) => (
        <div className="container" key={complaint.complaint_id}>
          <dl className="row">
            <dt className="col-sm-3">Complaint ID</dt>
            <dd className="col-sm-9">{complaint.complaint_id}</dd>
            <dt className="col-sm-3">Complainant ID</dt>
            <dd className="col-sm-9"> {complaint.consumer_id} </dd>
            <dt className="col-sm-3">Subject</dt>
            <dd className="col-sm-9"> {complaint.subject}</dd>
            <dt className="col-sm-3">Description</dt>
            <dd className="col-sm-9">{complaint.description} </dd>
            <dt className="col-sm-3">Product</dt>
            <dd className="col-sm-9">{complaint.product} </dd>
            <dt className="col-sm-3">Max price</dt>
            <dd className="col-sm-9"> {complaint.max_price}</dd>
            <dt className="col-sm-3">Seller's retail price</dt>
            <dd className="col-sm-9"> {complaint.sellers_retail_price}</dd>
            <dt className="col-sm-3">Date created</dt>
            <dd className="col-sm-9"> {complaint.complaint_date}</dd>
          </dl>
        </div>
      ))}
    </div>
  );
}

export default ViewComplaint;
