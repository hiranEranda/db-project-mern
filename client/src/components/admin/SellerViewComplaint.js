import React, { useContext, useEffect, useState } from "react";
import { DeleteIdContext, ViewIdContext } from "./Sellers";
import axios from "axios";

function SellerViewComplaint() {
  const complaint_id = useContext(ViewIdContext);
  const delete_id = useContext(DeleteIdContext);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    if (delete_id !== complaint_id) {
      axios
        .get(`http://localhost:5000/api/admin/viewcomplaint/${complaint_id}`, {
          headers: { authToken: sessionStorage.getItem("authToken") },
        })
        .then((res) => {
          setComplaints(res.data);
          console.log(res.data);
        })
        .catch((e) => console.log(e));
    }
  }, [complaint_id, delete_id]);

  return (
    <div>
      <div className="row mb-3">
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
                      <dt className="col-sm-6">Complaint ID</dt>
                      <dd className="col-sm-6">{complaint.complaint_id}</dd>
                      <dt className="col-sm-6">Complainant ID</dt>
                      <dd className="col-sm-6"> {complaint.consumer_id} </dd>
                      <dt className="col-sm-6">Subject</dt>
                      <dd className="col-sm-6"> {complaint.subject}</dd>
                      <dt className="col-sm-6">Description</dt>
                      <dd className="col-sm-6">{complaint.description} </dd>
                      <dt className="col-sm-6">Product</dt>
                      <dd className="col-sm-6">{complaint.product} </dd>
                      <dt className="col-sm-6">Max price</dt>
                      <dd className="col-sm-6"> {complaint.max_price}</dd>
                      <dt className="col-sm-6">Seller's retail price</dt>
                      <dd className="col-sm-6">
                        {complaint.sellers_retail_price}
                      </dd>
                      <dt className="col-sm-6">Date created</dt>
                      <dd className="col-sm-6"> {complaint.complaint_date}</dd>
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
                      <dt className="col-sm-6">Client ID</dt>
                      <dd className="col-sm-6">{complaint.consumer_id}</dd>
                      <dt className="col-sm-6">NIC</dt>
                      <dd className="col-sm-6"> {complaint.nic} </dd>
                      <dt className="col-sm-6">Full Name</dt>
                      <dd className="col-sm-6">
                        {complaint.uFname} {complaint.uLname}
                      </dd>
                      <dt className="col-sm-6">Address</dt>
                      <dd className="col-sm-6">{complaint.address} </dd>
                      <dt className="col-sm-6">Phone Number</dt>
                      <dd className="col-sm-6">{complaint.phone_number} </dd>
                      <dt className="col-sm-6">E-mail</dt>
                      <dd className="col-sm-6"> {complaint.email}</dd>
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

export default SellerViewComplaint;
