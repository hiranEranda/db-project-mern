import React, { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios("http://localhost:5000/api/products/all")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div>
      <table>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Date</th>
        </tr>
        {products.map((product) => (
          <tr key={product.product_id}>
            <td>{product.name}</td>
            <td>{product.p_type}</td>
            <td>{product.product_id}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Products;
