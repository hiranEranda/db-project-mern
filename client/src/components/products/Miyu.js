import React, { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";

function Miyu() {
  const [spinner, setSpinner] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
      setShow(true);
    }, 2700);
  }, []);

  return (
    <>
      {spinner ? (
        <div className="cliploader-div d-flex justify-content-center align-items-center">
          <HashLoader size={80} color={"000"} />\
        </div>
      ) : null}
      <div style={{ display: show ? "block" : "none" }}>
        <div id="products"></div>
      </div>
    </>
  );
}

export default Miyu;
