import React from "react";
import Products from "../products/Products";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="row">
        <div className="col-md-10">
          <Products />
        </div>
      </div>
    </div>
  );
}
