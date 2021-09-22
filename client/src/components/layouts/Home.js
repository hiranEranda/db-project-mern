import React, { useContext } from "react";

import { AuthContext } from "../../helpers/AuthContext";

import ShowCase from "./ShowCase";
import ShowCase_IN from "./ShowCase_IN";
import TypeFilter from "../products/TypeFilter";
import AppNavBar from "./AppNavBar";

export default function Home() {
  const { authState } = useContext(AuthContext);
  return (
    <>
      <AppNavBar />
      {authState.status ? <ShowCase_IN /> : <ShowCase />}

      <div className="bg-light">
        <div className="container p-5">
          <TypeFilter />
        </div>
      </div>
    </>
  );
}
