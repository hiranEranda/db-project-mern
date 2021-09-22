import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import AdNavBar from "./AdNavBar";

function Sellers({ authorized }) {
  const [sellers, setSellers] = useState([]);
  const [viewid, setviewid] = useState({ id: 0 });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/admin/sellers`, {
        headers: { authToken: sessionStorage.getItem("authToken") },
      })
      .then((res) => {
        setSellers(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const view = (val) => {
    setviewid({ id: val });
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
        <h2 className="text-center m-4">Sellers</h2>
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
                      <th className="text-center bg-secondary">Details</th>
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
                            seller.TotalCount > 20
                              ? "text-center bg-danger"
                              : seller.TotalCount > 5
                              ? "text-center bg-warning"
                              : "text-center bg-primary"
                          }
                        >
                          <div className="h5">
                            <a
                              href="/admin/seller"
                              style={{ color: "inherit" }}
                            >
                              <i
                                className="bi bi-arrow-right-square-fill boder-dark"
                                onClick={() => view(seller.seller_id)}
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
      </div>
    </>
  );
}

export default Sellers;
