import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { TypeContext } from "./TypeFilter";

function Filtered() {
  const [filter, setfilter] = useState([]);
  const type = useContext(TypeContext);

  useEffect(() => {
    if (type) {
      axios
        .get(`http://localhost:5000/api/products/${type}`)
        .then((res) => {
          setfilter(res.data);
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
          <td>{product.p_type}</td>
          <td>{product.product_id}</td>
        </tr>
      ))}
    </>
  );
}

export default Filtered;
