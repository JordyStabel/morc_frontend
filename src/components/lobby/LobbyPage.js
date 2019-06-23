import React from "react";
import Lobbies from "../lobby/Lobbies";
import Sidebar from "../lobby/Sidebar";

export default function LobbyPage() {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-9">
          <Lobbies />
        </div>
        <div className="col-md-3">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
