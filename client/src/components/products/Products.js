import React, { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [state, setState] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/all")
      .then((res) => {
        if (res.data.error);
        setState(res.data);
      })
      .catch((e) => {
        console.log("err was called from all");
      });
  }, []);

  return (
    <>
      {state.map((product) => (
        <tr key={product.product_id}>
          <td className="text-center">{product.name}</td>
          <td className="text-center">{product.mrp}</td>
          <td className="text-center">{product.mrp_date}</td>
        </tr>
      ))}
    </>
  );
}

export default Products;
