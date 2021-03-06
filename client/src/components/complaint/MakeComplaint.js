import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import AppNavBar from "../layouts/AppNavBar";
import SellerAutoComplete from "./SellerAutoComplete";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

function MakeComplaint({ authorized }) {
  // get product data
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/all")
      .then((res) => {
        if (res.data.error);
        setProduct(res.data);
      })
      .catch((e) => {
        console.log("err was called from product fetching");
      });
  }, []);

  // get seller data
  const [sellers, setSellers] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/api/seller`, {
  //       headers: { authToken: sessionStorage.getItem("authToken") },
  //     })
  //     .then((res) => {
  //       if (res.data.error);
  //       setSellers(res.data);
  //     })
  //     .catch((e) => {
  //       console.log("err was called from sellers fetching");
  //     });
  // }, []);

  // complaint state
  const [complaint, setComplaint] = useState({
    subject: "Item over priced",
    description: "",
    product: "",
    seller: "",
    seller_id: "",
    seller_r_p: "",
  });

  // updating complaint state except seller and product
  const handleData = (e) => {
    setComplaint({
      ...complaint,
      [e.target.name]: e.target.value,
    });
  };

  // updating complaint product state
  const handleProduct = (val) => {
    setComplaint({
      ...complaint,
      product: val,
    });
  };

  // For update seller and seller_id in complaint state
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const seller = async () => {
      const res = await axios.get(`http://localhost:5000/api/seller`, {
        headers: { authToken: sessionStorage.getItem("authToken") },
      });
      setSellers(res.data);
      console.log(sellers);
    };
    seller();
  }, [matches]);

  const searchSeller = (text) => {
    setComplaint({ ...complaint, seller: text });
    let matches = sellers.filter((seller) => {
      const regex = new RegExp(`^${text}`, "gi");
      return (
        seller.sFname.match(regex) ||
        seller.sLname.match(regex) ||
        seller.s_address.match(regex)
      );
    });
    if (text === "") {
      matches = [];
    }
    setMatches(matches);
  };

  const suggestion = (firstName, lastName, address, id) => {
    setComplaint({
      ...complaint,
      seller: firstName + " " + lastName + "/" + address,
      seller_id: id,
    });
  };

  // to submit the complaint
  const formHandler = (e) => {
    e.preventDefault();
    console.log("form handler called");
    console.log(complaint);
    axios
      .post(`http://localhost:5000/api/complaints/addcomplaint`, complaint, {
        headers: { authToken: sessionStorage.getItem("authToken") },
      })
      .then((res) => {
        console.log(res.status);
        setComplaint({
          subject: "Item over priced",
          description: "",
          product: "",
          seller: "",
          seller_id: "",
          seller_r_p: "",
        });
        alert("complaint filed");
      })
      .catch((e) => console.log(e));
  };

  // autocomplete div handler
  const [isVisible, setVisibility] = useState(false);
  const searchContainer = useRef(null);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (
      searchContainer.current &&
      !searchContainer.current.contains(e.target)
    ) {
      hideSuggestions();
    }
  };

  const showSuggestions = () => setVisibility(true);
  const hideSuggestions = () => {
    setVisibility(false);
    setMatches([]);
  };

  if (!authorized) {
    return (
      <>
        {alert("You have to be logged in first")}
        <Redirect to="/" />
      </>
    );
  }
  return (
    <>
      <AppNavBar />
      <div className="container">
        <h3 className="pt-2  text-center">File your complaint here</h3>
        <hr />
        <div className="d-flex justify-content-center">
          <div className="card w-50 border-secondary">
            <div className="card-body">
              <form onSubmit={formHandler}>
                <div className="mb-1">
                  <label className="col-form-label">
                    Select the most suitable reason
                  </label>
                  <select
                    required={true}
                    name="subject"
                    className="form-control"
                    value={complaint.subject}
                    onChange={handleData}
                  >
                    <option name="1">Item over priced</option>
                    <option name="2">Products are not in good quality</option>
                  </select>
                </div>
                <div className="mb-1">
                  <label className="col-form-label">Description</label>
                  <input
                    required={true}
                    type="text"
                    name="description"
                    className="form-control"
                    value={complaint.description}
                    onChange={handleData}
                  />
                </div>
                <div className="mb-1">
                  <label className="col-form-label">Product</label>
                  <Stack spacing={2}>
                    <Autocomplete
                      name="product"
                      options={product.map((option) => option.name)}
                      onChange={(event, value) => {
                        console.log(value);
                        handleProduct(value);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Product" />
                      )}
                    />
                  </Stack>
                  {/* <input
                    required="true"
                    type="text"
                    name="product"
                    className="form-control"
                    value={complaint.product}
                    onChange={handleData}
                  /> */}
                </div>

                <div className="mb-1" ref={searchContainer}>
                  <label className="col-form-label">Seller</label>
                  {/* <Stack spacing={2}>
                    <Autocomplete
                      name="seller"
                      options={sellers.map(
                        (option) =>
                          option.sFname +
                          " " +
                          option.sLname +
                          "/" +
                          option.s_address
                      )}
                      onChange={(event, value) => {
                        console.log(value);
                        handleSeller(value);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Seller" />
                      )}
                    />
                  </Stack> */}
                  <input
                    required={true}
                    type="text"
                    name="seller"
                    className="form-control"
                    value={complaint.seller}
                    onClick={showSuggestions}
                    onChange={(e) => searchSeller(e.target.value)}
                  />
                  {matches &&
                    isVisible &&
                    matches.map((item, index) => (
                      <SellerAutoComplete
                        key={index}
                        onSelectItem={() => {
                          hideSuggestions();
                          suggestion(
                            item.sFname,
                            item.sLname,
                            item.s_address,
                            item.seller_id
                          );
                        }}
                        {...item}
                      />
                    ))}
                </div>
                <div className="mb-1">
                  <label className="col-form-label">Sellers Retail Price</label>
                  <input
                    required={true}
                    type="text"
                    name="seller_r_p"
                    className="form-control"
                    value={complaint.seller_r_p}
                    onChange={handleData}
                  />
                </div>
                <div className="mt-3">
                  <button type="submit" className="btn btn-primary float-end">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MakeComplaint;
