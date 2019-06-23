import React from "react";
import auth from "./auth";

export const Logout = props => {
  return (
    <div>
      <h1>Logout</h1>
      <button
        onClick={() => {
          auth.logout(() => {
            props.history.push("/");
          });
        }}
      >
        {" "}
        Logout{" "}
      </button>
    </div>
  );
};
