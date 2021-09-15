import React, { useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/actions/products/productActions.js";

function Products({ productData }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  //  const data = useSelector((state) => state.products);
  console.log(productData);
  return productData.loading ? (
    <tr key="1">
      <td>loading</td>
      <td>loading</td>
      <td>loading</td>
    </tr>
  ) : productData.error ? (
    <tr key="1">
      <td>{productData.error}</td>
      <td>{productData.error}</td>
      <td>{productData.error}</td>
    </tr>
  ) : (
    <>
      {productData.products.map((product) => (
        <tr key={product.product_id}>
          <td>{product.name}</td>
          <td>{product.p_type}</td>
          <td>{product.product_id}</td>
        </tr>
      ))}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    productData: state.products,
  };
};

export default connect(mapStateToProps)(Products);

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function Products() {
//   const [products, setProducts] = useState([]);
//   useEffect(() => {
//     axios("http://localhost:5000/api/products/all")
//       .then((res) => {
//         console.log(res.data);
//         setProducts(res.data);
//       })
//       .catch((e) => {
//         const errorMsg = e.message;
//         console.log(errorMsg);
//       });
//   }, []);

//   return (
//     <>
//       {products.map((product) => (
//         <tr key={product.product_id}>
//           <td>{product.name}</td>
//           <td>{product.p_type}</td>
//           <td>{product.product_id}</td>
//         </tr>
//       ))}
//     </>
//   );
// }

// export default Products;
