import React, { useState, useEffect } from "react";
import axios from "axios";
const Find = (props) => {
  const [state, setState] = useState(null);
  const get = () => {
    axios
      .get("/api/course/" + props.match.params.id)
      .then((res) => setState(res.data.result));
  };
  useEffect(() => {
    get();
  }, []);
  return <h1>123123</h1>;
};
export default Find;
