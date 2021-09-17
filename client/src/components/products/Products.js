import React, { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [state, setstate] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/all")
      .then((res) => {
        setstate(res.data);
      })
      .catch((e) => {
        console.log("err was called from all");
      });
  }, []);

  return (
    <>
      {state.map((product) => (
        <tr key={product.product_id}>
          <td>{product.name}</td>
          <td>{product.mrp}</td>
          <td>{product.mrp_date}</td>
        </tr>
      ))}
    </>
  );
}

export default Products;
