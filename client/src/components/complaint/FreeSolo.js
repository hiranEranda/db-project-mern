import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

export default function FreeSolo() {
  const [state, setState] = useState([]);
  const [name, setName] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/all")
      .then((res) => {
        if (res.data.error);
        setState(res.data);
      })
      .catch((e) => {
        console.log("err was called from all");
      });
  }, []);
  console.log(state);
  return (
    <Stack spacing={2}>
      <Autocomplete
        id="free-solo-demo"
        options={state.map((option) => option.name)}
        renderInput={(params) => <TextField {...params} label="Product" />}
      />
    </Stack>
  );
}
