import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import AdNavBar from "./AdNavBar";
import Seller from "./Seller";
import SellerViewComplaint from "./SellerViewComplaint";

export const IdContext = React.createContext();
export const ViewIdContext = React.createContext();
export const DeleteIdContext = React.createContext();

function Sellers({ authorized }) {
  const [sellers, setSellers] = useState([]);
  const [complaints, setComplaints] = useState([]);

  const [seller, setSeller] = useState({ id: 0 });
  const [flag, setFlag] = useState(true);

  const [deleteid, setDeleteid] = useState({ id: 100000000 });
  const [viewid, setViewid] = useState({ id: 0 });

  useEffect(() => {
    console.log("getting");
    axios
      .get(`http://localhost:5000/api/admin/sellers`, {
        headers: { authToken: sessionStorage.getItem("authToken") },
      })
      .then((res) => {
        setSellers(res.data);
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  }, [deleteid.id]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/admin/seller/complaints/${seller.id}`, {
        headers: { authToken: sessionStorage.getItem("authToken") },
      })
      .then((res) => {
        setComplaints(res.data);
      })
      .catch((e) => console.log(e));
  }, [seller.id, deleteid.id]);

  const del = (val) => {
    setDeleteid({ id: val });
    console.log(val);
    axios
      .delete(`http://localhost:5000/api/admin/deletecomplaint/${val}`, {
        headers: { authToken: sessionStorage.getItem("authToken") },
      })
      .then((res) => {
        console.log(res.data);
        alert("Complaint deleted!");
      })
      .catch((e) => console.log(e.message));
  };

  const sell = (val) => {
    setSeller({ id: val });
    setFlag(true);
  };

  const view = (val) => {
    setViewid({ id: val });
    setFlag(false);
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
        <h2 id="header" className="text-center m-4">
          Sellers
        </h2>
        <hr />
        <div className="container mt-4">
          <DeleteIdContext.Provider value={deleteid.id}>
            <ViewIdContext.Provider value={viewid.id}>
              <IdContext.Provider value={seller.id}>
                {flag ? <Seller /> : <SellerViewComplaint />}
              </IdContext.Provider>
            </ViewIdContext.Provider>
          </DeleteIdContext.Provider>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive-sm">
                <table className="table table-bordered table-light border-primary">
                  <tbody>
                    <tr>
                      <th className="text-center bg-secondary">Seller ID</th>
                      <th className="text-center bg-secondary">Seller Name</th>
                      <th className="text-center bg-secondary">
                        Total Complaints
                      </th>
                      <th className="text-center bg-secondary">
                        Seller Details
                      </th>
                      <th className="text-center bg-secondary">Complaints</th>
                    </tr>
                    {sellers.map((seller) => (
                      <tr key={seller.seller_id}>
                        <td className="text-center">{seller.seller_id}</td>
                        <td className="text-center">
                          {seller.sFname} {seller.sLname}
                        </td>
                        <td className="text-center">{seller.TotalCount}</td>
                        <td
                          className={
                            seller.TotalCount > 15
                              ? "text-center bg-danger"
                              : seller.TotalCount > 5
                              ? "text-center bg-warning"
                              : "text-center bg-success"
                          }
                        >
                          <div className="h5">
                            <a href="#header" style={{ color: "inherit" }}>
                              <i
                                className="bi bi-arrow-up-square-fill boder-dark"
                                onClick={() => sell(seller.seller_id)}
                              ></i>
                            </a>
                          </div>
                        </td>
                        <td
                          className={
                            seller.TotalCount > 15
                              ? "text-center bg-danger"
                              : seller.TotalCount > 5
                              ? "text-center bg-warning"
                              : "text-center bg-success"
                          }
                        >
                          <div className="h5">
                            <a href="#com-table" style={{ color: "inherit" }}>
                              <i
                                className="bi bi-arrow-down-square-fill boder-dark"
                                onClick={() => sell(seller.seller_id)}
                              ></i>
                            </a>
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
        <div className="container mt-3">
          <h2 id="com-table" className="text-center">
            Complaints
          </h2>
          <hr />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive-sm">
                <table className="table table-bordered table-light border-primary">
                  <tbody>
                    <tr>
                      <th className="text-center">Subject</th>
                      <th className="text-center">Consumer's Name</th>
                      <th className="text-center">Date</th>
                      <th className="text-center">Details</th>
                      <th className="text-center">Delete</th>
                    </tr>
                    {complaints.map((complaint) => (
                      <tr key={complaint.complaint_id}>
                        <td className="text-center">{complaint.subject}</td>
                        <td className="text-center">
                          {complaint.uFname} {complaint.uLname}
                        </td>
                        <td className="text-center">
                          {complaint.complaint_date}
                        </td>
                        <td className="text-center">
                          <div className="h5">
                            <a href="#header">
                              <i
                                className="bi bi-arrow-right-square-fill"
                                onClick={() => view(complaint.complaint_id)}
                              ></i>
                            </a>
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
      </div>
    </>
  );
}

export default Sellers;
