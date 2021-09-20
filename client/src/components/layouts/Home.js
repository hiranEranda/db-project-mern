import React from "react";
import { Redirect } from "react-router-dom";

import TypeFilter from "../products/TypeFilter";

export default function Home({ authorized }) {
  if (!authorized) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <h1>Home</h1>
      <TypeFilter />
    </div>
  );
}
