import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import "../../css/complaint.css";
import axios from "axios";
import AppNavBar from "../layouts/AppNavBar";

function MakeComplaint({ authorized }) {
  const [complaint, setComplaint] = useState({
    subject: "",
    description: "",
    product: "",
    seller: "",
    seller_r_p: "",
  });

  const handleData = (e) => {
    setComplaint({
      ...complaint,
      [e.target.name]: e.target.value,
    });
  };

  const formHandler = (e) => {
    e.preventDefault();
    console.log("form handler called");
    console.log(complaint);
    axios
      .post(`http://localhost:5000/api/complaints/addcomplaint`, complaint, {
        headers: { authToken: sessionStorage.getItem("authToken") },
      })
      .then((res) => {
        console.log(res.status);
        setComplaint({
          subject: "",
          description: "",
          product: "",
          seller: "",
          seller_r_p: "",
        });
        alert("complaint filed");
      })
      .catch((e) => console.log(e));
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
        <h3 className="pt-2  text-center">File your complaint here</h3>
        <hr />
        <div className="d-flex justify-content-center">
          <div className="card w-50 border-secondary">
            <div className="card-body">
              <form onSubmit={formHandler}>
                <div className="mb-1">
                  <label className="col-form-label">
                    Select the most suitable reason
                  </label>
                  <select
                    name="subject"
                    className="form-control"
                    value={complaint.subject}
                    onChange={handleData}
                  >
                    <option name="1">Item over priced</option>
                    <option name="2">Products are not in good quality</option>
                  </select>
                </div>
                <div className="mb-1">
                  <label className="col-form-label">Description</label>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={complaint.description}
                    onChange={handleData}
                  />
                </div>
                <div className="mb-1">
                  <label className="col-form-label">Product</label>
                  <input
                    type="text"
                    name="product"
                    className="form-control"
                    value={complaint.product}
                    onChange={handleData}
                  />
                </div>
                <div className="mb-1">
                  <label className="col-form-label">Seller ID</label>
                  <input
                    type="text"
                    name="seller"
                    className="form-control"
                    value={complaint.seller}
                    onChange={handleData}
                  />
                </div>
                <div className="mb-1">
                  <label className="col-form-label">Sellers Retail Price</label>
                  <input
                    type="text"
                    name="seller_r_p"
                    className="form-control"
                    value={complaint.seller_r_p}
                    onChange={handleData}
                  />
                </div>
                <div className="mt-3">
                  <button type="submit" className="btn btn-primary float-end">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MakeComplaint;
