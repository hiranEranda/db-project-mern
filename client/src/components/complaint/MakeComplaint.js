import React, { useState } from "react";
import { Button } from "@material-ui/core";
import "../../css/complaint.css";
import axios from "axios";

function MakeComplaint() {
  const [complaint, setComplaint] = useState({
    subject: "",
    description: "",
    product: "",
    seller: "",
    seller_r_p: "",
  });

  const handleData = (e) => {
    setComplaint({
      ...complaint,
      [e.target.name]: e.target.value,
    });
  };

  const formHandler = (e) => {
    e.preventDefault();
    console.log("form handler called");
    axios
      .post(
        `http://localhost:5000/api/complaints/addcomplaint?subject=${complaint.subject}&description=${complaint.description}&product=${complaint.product}&seller_r_p=${complaint.seller_r_p}&seller=${complaint.seller}&client_id=1`
      )
      .then((res) => {
        console.log("success");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={formHandler}>
          <div className="col-md-12">
            <h3>Complaint</h3>
            <hr />
          </div>
          <select
            name="subject"
            value={complaint.subject}
            onChange={handleData}
          >
            <option name="1">Item over priced</option>
            <option name="2">Products are not in good quality</option>
          </select>
          <input
            type="text"
            name="description"
            value={complaint.description}
            placeholder="Description"
            onChange={handleData}
          />
          <input
            type="text"
            name="product"
            value={complaint.product}
            placeholder="Product"
            onChange={handleData}
          />
          <input
            type="text"
            name="seller"
            value={complaint.seller}
            placeholder="Seller ID"
            onChange={handleData}
          />
          <input
            type="text"
            name="seller_r_p"
            value={complaint.seller_r_p}
            placeholder="Seller's retail price"
            onChange={handleData}
          />

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default MakeComplaint;
