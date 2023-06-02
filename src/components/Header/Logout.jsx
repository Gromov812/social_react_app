import React from "react";
import l from "./Header.module.css";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

function Logout({ logout, name }) {
  return (
    <>
      <div className={l.welcome}>
        <span className={l.welcome__name}> Welcome, {name}! </span>
        <Button variant="contained" size={"small"} onClick={logout} path="/">
          {" "}
          <LogoutIcon />
        </Button>
      </div>
    </>
  );
}

export default Logout;
