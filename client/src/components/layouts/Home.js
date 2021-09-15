import React from "react";
import Products from "../products/Products";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <table className="table table-bordred table-striped">
              <tbody>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Date</th>
                </tr>
                <Products />
              </tbody>
            </table>
          </div>
        </div>
      </div>
      ;
    </div>
  );
}
