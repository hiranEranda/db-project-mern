import React from "react";

function ProductAutoComplete(name, onSelectItem) {
  return (
    <div className="form-control mt-1" onClick={onSelectItem}>
      <span className="text-primary">{name}</span>
    </div>
  );
}

export default ProductAutoComplete;
