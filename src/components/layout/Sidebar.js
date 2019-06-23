import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <Link to="/friends/add" className="btn btn-success btn-block">
      <i className="fas fa-plus" /> Add Friend
    </Link>
  );
}
