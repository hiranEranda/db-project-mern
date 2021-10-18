import React from "react";
import { Link, Redirect } from "react-router-dom";
import AdNavBar from "./AdNavBar";
import Area from "./charts/Area";
import Products from "./charts/Products";

function AdminHome({ authorized }) {
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
      <div className="container mt-5 d-flex justify-content-center">
        <div className="row w-75">
          <div className="col-md-6">
            <div className="card">
              <img src="" alt="" />
              <div className="card-body">
                <h5 className="card-title">Complaints</h5>
                <p className="card-text">Complaints Details</p>
                <Link
                  to="/admin/complaints"
                  className="btn btn-primary float-end"
                >
                  Complaints
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            {" "}
            <div className="card">
              <img className="" src="" alt="" />
              <div className="card-body">
                <h5 className="card-title">Sellers</h5>
                <p className="card-text">Seller Details</p>
                <Link to="/admin/sellers" className="btn btn-primary float-end">
                  Sellers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5 mb-5 w-50">
        <Products />
      </div>
      <div className="container mt-5 mb-5 w-50">
        <Area />
      </div>
    </>
  );
}

export default AdminHome;
