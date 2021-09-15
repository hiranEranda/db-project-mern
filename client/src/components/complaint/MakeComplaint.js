import React, { useState } from "react";
import "../../css/complaint.css";

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
  return (
    <div>
      <div className="container">
        <form action="complaint.php" method="post">
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

          <button id="submit" type="submit" name="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default MakeComplaint;
