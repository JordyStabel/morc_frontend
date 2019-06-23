import React from "react";
//import spinner from "./spinner.gif";
//import spinner from "./morc_loading.png";

export default function Loading() {
  return (
    <div>
      <div
        className="spinner-border text-primary"
        style={{ width: 150, height: 150, margin: 100 }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <h2 style={{ textAlign: "center" }}>Loading...</h2>
    </div>
  );
}
