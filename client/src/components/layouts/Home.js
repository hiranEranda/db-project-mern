import React from "react";
import ShowCase from "./ShowCase";

import TypeFilter from "../products/TypeFilter";

export default function Home() {
  return (
    <>
      <ShowCase />
      <div className="bg-light">
        <div className="container p-5">
          <TypeFilter />
        </div>
      </div>
    </>
  );
}
