import React from 'react';
import { Link } from "@reach/router";

function Sidebar() {
  return (
    <div>
      <h1>LIBRARY</h1>
      <Link to="/artists/">Artists</Link>
    </div>
  )
}

export default Sidebar;