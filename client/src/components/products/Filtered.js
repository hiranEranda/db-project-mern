import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { TypeContext } from "./TypeFilter";

function Filtered() {
  const [filter, setFilter] = useState([]);
  const type = useContext(TypeContext);

  useEffect(() => {
    if (type) {
      axios
        .get(`http://localhost:5000/api/products/${type}`)
        .then((res) => {
          if (res.data.error);
          setFilter(res.data);
        })
        .catch((e) => {
          console.log("err was from filter");
        });
    }
  }, [type]);
  return (
    <>
      {filter.map((product) => (
        <tr key={product.product_id}>
          <td>{product.name}</td>
          <td>{product.mrp}</td>
          <td>{product.mrp_date}</td>
        </tr>
      ))}
    </>
  );
}

export default Filtered;
