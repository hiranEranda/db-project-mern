import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import AdNavBar from "./AdNavBar";

function Sellers({ authorized }) {
  const [sellers, setSellers] = useState([]);
  const [deleteid, setdeleteid] = useState({ id: 100000000 });
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

  const del = (val) => {
    setdeleteid({ id: val });
    // axios
    //   .delete(`http://localhost:5000/api/sellers/deletecomplaint/${val}`, {
    //     headers: { authToken: sessionStorage.getItem("authToken") },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((e) => console.log(e.message));
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
        <h2>Sellers</h2>
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive-sm">
              <table className="table table-bordred table-striped table-fixed">
                <tbody>
                  <tr>
                    <th>Seller ID</th>
                    <th>Seller Name</th>
                    <th>Total Complaints</th>
                    <th>Details</th>
                  </tr>
                  {sellers.map((seller) => (
                    <tr key={seller.seller_id}>
                      <td>{seller.seller_id}</td>
                      <td>
                        {seller.sFname} {seller.sLname}
                      </td>
                      <td>{seller.TotalCount}</td>
                      <td className="text-center">
                        <div className="h5">
                          <i
                            className="bi bi-arrow-right-square-fill"
                            onClick={() => view(seller.seller_id)}
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
    </>
  );
}

export default Sellers;
