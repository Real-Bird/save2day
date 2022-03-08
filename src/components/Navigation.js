import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => (
  <nav className="pageTitle">
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/todos">Today ToDos</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
