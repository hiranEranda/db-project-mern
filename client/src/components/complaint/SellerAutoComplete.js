import React from "react";

function SellerAutoComplete({ sFname, sLname, s_address, onSelectItem }) {
  return (
    <div className="form-control mt-1" onClick={onSelectItem}>
      <span className="text-primary">
        {sFname + " " + sLname + "/" + s_address}
      </span>
    </div>
  );
}

export default SellerAutoComplete;
