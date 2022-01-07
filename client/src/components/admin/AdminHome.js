import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import AdNavBar from "./AdNavBar";
import Area from "./charts/Area";
import Products from "./charts/Products";
// import "./admin.css";

export const FlagContext = React.createContext();

function AdminHome({ authorized }) {
  const [flags, setFlags] = useState({
    today: true,
    week: false,
    month: false,
    all: false,
  });

  // if (!authorized) {
  //   return (
  //     <>
  //       {alert("Unauthorized Access Bloked")}
  //       <Redirect to="/admin/login" />
  //     </>
  //   );
  // }

  return (
    <>
      <AdNavBar />
      <div className="container border border-secondary p-2 mt-3">
        <div className="container mt-5 d-flex justify-content-around w-75 ">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              setFlags({
                today: true,
                week: false,
                month: false,
                all: false,
              })
            }
          >
            Today
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              setFlags({
                today: false,
                week: true,
                month: false,
                all: false,
              })
            }
          >
            This week
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              setFlags({
                today: false,
                week: false,
                month: true,
                all: false,
              })
            }
          >
            This month
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              setFlags({
                today: false,
                week: false,
                month: false,
                all: true,
              })
            }
          >
            All time
          </button>
        </div>
        <div className="container d-flex justify-content-center">
          <div className="row w-100">
            <div className="container mt-5 mb-2 w-50">
              <FlagContext.Provider value={flags}>
                <Products />
              </FlagContext.Provider>
            </div>
            <div className="container mt-5 mb-2 w-50">
              <FlagContext.Provider value={flags}>
                <Area />
              </FlagContext.Provider>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5 d-flex justify-content-center mb-3 border border-secondary p-5">
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
    </>
  );
}

export default AdminHome;
