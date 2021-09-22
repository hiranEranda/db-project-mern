import React, { useContext } from "react";

import Products from "./Products";
import Filtered from "./Filtered";
import { TypeContext } from "./TypeFilter";

function Bridge() {
  const type = useContext(TypeContext);
  return (
    <>
      <table className="table table-bordered table-light table-hover border-success">
        <tbody>
          <tr>
            <th className="text-center">Product Name</th>
            <th className="text-center">Price</th>
            <th className="text-center">Date</th>
          </tr>
          {type === "all" ? <Products /> : <Filtered />}
        </tbody>
      </table>
    </>
  );
}

export default Bridge;
