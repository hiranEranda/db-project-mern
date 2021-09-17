import React, { useContext } from "react";

import Products from "./Products";
import Filtered from "./Filtered";
import { TypeContext } from "./TypeFilter";

function Bridge() {
  const type = useContext(TypeContext);
  return (
    <>
      <table className="table table-bordred table-striped">
        <tbody>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
          {type === "all" ? <Products /> : <Filtered />}
        </tbody>
      </table>
    </>
  );
}

export default Bridge;
