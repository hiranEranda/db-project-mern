import React, { useState } from "react";
import { Box } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Bridge from "./Bridge";

export const TypeContext = React.createContext();

export default function TypeFilter() {
  let initType = "all";
  const [type, setType] = useState(initType);

  const handleChange = (event) => {
    event.preventDefault();
    window.location.hash = "prices";
    setType(event.target.value);
  };
  return (
    <div>
      <Box sx={{ maxWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select value={type} label="type" onChange={handleChange}>
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={"vegetables"}>Vegetables</MenuItem>
            <MenuItem value={"rice"}>Rice</MenuItem>
            <MenuItem value={"fish"}>Fish</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <br />
      <br />

      <TypeContext.Provider value={type}>
        <Bridge id="prices" />
      </TypeContext.Provider>
    </div>
  );
}
