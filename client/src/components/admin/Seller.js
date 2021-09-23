import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { IdContext } from "./Sellers";

function Seller() {
  let id = useContext(IdContext);
  const [seller, setSeller] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/admin/seller/${id}`, {
        headers: { authToken: sessionStorage.getItem("authToken") },
      })
      .then((res) => {
        setSeller(res.data);
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  }, [id]);

  return (
    <>
      <div className="container">
        <div className="container mb-5">
          <div className="row d-flex justify-content-center">
            <div className="col-7">
              <div className="card border-secondary">
                <div className="card-body">
                  <h4 className="card-header text-center mb-3">
                    Seller Details
                  </h4>
                  <div className="card-text">
                    {seller.map((s) => (
                      <div className="container" key={s.complaint_id}>
                        <dl className="row">
                          <dt className="col-sm-5">Seller ID</dt>
                          <dd className="col-sm-7">{s.seller_id}</dd>
                          <dt className="col-sm-5">NIC</dt>
                          <dd className="col-sm-7"> {s.snic} </dd>
                          <dt className="col-sm-5">Full Name</dt>
                          <dd className="col-sm-7">
                            {s.sFname} {s.sLname}
                          </dd>
                          <dt className="col-sm-5">Address</dt>
                          <dd className="col-sm-7">{s.s_address} </dd>
                          <dt className="col-sm-5">Phone Number</dt>
                          <dd className="col-sm-7">{s.s_phone_number} </dd>
                          <dt className="col-sm-5">Works At</dt>
                          <dd className="col-sm-7"> {s.name}</dd>
                        </dl>
                      </div>
                    ))}
                  </div>
                  <div className="card-text"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Seller;
