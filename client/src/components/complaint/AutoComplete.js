import React from "react";

function AutoComplete({ sFname, sLname, s_address, onSelectItem }) {
  return (
    <div
      className="form-control mt-1"
      name="seller"
      // value={item.sFname}
      onClick={onSelectItem}
    >
      <span className="text-primary">
        {sFname + " " + sLname + "/" + s_address}
      </span>
    </div>
  );
}

export default AutoComplete;
