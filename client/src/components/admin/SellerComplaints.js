import React, { useState, useEffect, useContext } from "react";
import { DeleteIdContext, IdContext } from "./Seller";
import axios from "axios";

function SellerComplaints() {
  const complaint_id = useContext(IdContext);
  const delete_id = useContext(DeleteIdContext);
  const [complaints, setcomplaints] = useState([]);

  useEffect(() => {
    if (delete_id !== complaint_id) {
      axios
        .get(`http://localhost:5000/api/admin/viewcomplaint/${complaint_id}`, {
          headers: { authToken: sessionStorage.getItem("authToken") },
        })
        .then((res) => {
          setcomplaints(res.data);
          console.log(res.data);
        })
        .catch((e) => console.log(e));
    }
  }, [complaint_id, delete_id]);

  return (
    <div>
      <div className="row">
        <div className="col">
          <div className="card border-secondary">
            <div className="card-body">
              <h4 className="card-header text-center mb-3">
                Complaint Details
              </h4>
              <div className="card-text">
                {complaints.map((complaint) => (
                  <div className="container" key={complaint.complaint_id}>
                    <dl className="row">
                      <dt className="col-sm-5">Complaint ID</dt>
                      <dd className="col-sm-7">{complaint.complaint_id}</dd>
                      <dt className="col-sm-5">Complainant ID</dt>
                      <dd className="col-sm-7"> {complaint.consumer_id} </dd>
                      <dt className="col-sm-5">Subject</dt>
                      <dd className="col-sm-7"> {complaint.subject}</dd>
                      <dt className="col-sm-5">Description</dt>
                      <dd className="col-sm-7">{complaint.description} </dd>
                      <dt className="col-sm-5">Product</dt>
                      <dd className="col-sm-7">{complaint.product} </dd>
                      <dt className="col-sm-5">Max price</dt>
                      <dd className="col-sm-7"> {complaint.max_price}</dd>
                      <dt className="col-sm-5">Seller's retail price</dt>
                      <dd className="col-sm-7">
                        {complaint.sellers_retail_price}
                      </dd>
                      <dt className="col-sm-5">Date created</dt>
                      <dd className="col-sm-7"> {complaint.complaint_date}</dd>
                    </dl>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 border-secondary ">
            <div className="card-body">
              <h4 className="card-header text-center mb-3">Seller Details</h4>
              <div className="card-text">
                {complaints.map((complaint) => (
                  <div className="container" key={complaint.complaint_id}>
                    <dl className="row">
                      <dt className="col-sm-5">Seller ID</dt>
                      <dd className="col-sm-7">{complaint.seller_id}</dd>
                      <dt className="col-sm-5">NIC</dt>
                      <dd className="col-sm-7"> {complaint.snic} </dd>
                      <dt className="col-sm-5">Full Name</dt>
                      <dd className="col-sm-7">
                        {complaint.sFname} {complaint.sLname}
                      </dd>
                      <dt className="col-sm-5">Address</dt>
                      <dd className="col-sm-7">{complaint.s_address} </dd>
                      <dt className="col-sm-5">Phone Number</dt>
                      <dd className="col-sm-7">{complaint.s_phone_number} </dd>
                      <dt className="col-sm-5">Works At</dt>
                      <dd className="col-sm-7"> {complaint.name}</dd>
                    </dl>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 border-secondary ">
            <div className="card-body">
              <h4 className="card-header text-center mb-3">
                Complainanat Details
              </h4>
              <div className="card-text">
                {complaints.map((complaint) => (
                  <div className="container" key={complaint.complaint_id}>
                    <dl className="row">
                      <dt className="col-sm-5">Client ID</dt>
                      <dd className="col-sm-7">{complaint.consumer_id}</dd>
                      <dt className="col-sm-5">NIC</dt>
                      <dd className="col-sm-7"> {complaint.nic} </dd>
                      <dt className="col-sm-5">Full Name</dt>
                      <dd className="col-sm-7">
                        {complaint.uFname} {complaint.uLname}
                      </dd>
                      <dt className="col-sm-5">Address</dt>
                      <dd className="col-sm-7">{complaint.address} </dd>
                      <dt className="col-sm-5">Phone Number</dt>
                      <dd className="col-sm-7">{complaint.phone_number} </dd>
                      <dt className="col-sm-5">E-mail</dt>
                      <dd className="col-sm-7"> {complaint.email}</dd>
                    </dl>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerComplaints;
