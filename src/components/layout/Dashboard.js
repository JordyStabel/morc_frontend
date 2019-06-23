import React from "react";
import Friends from "../friends/Friends";
import Sidebar from "../layout/Sidebar";

export default function Dashboard() {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-10">
          <Friends />
        </div>
        <div className="col-md-2">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
