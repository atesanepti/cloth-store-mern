import React from "react";
import { Link } from 'react-router-dom';


const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/addProduct" className="btn-primary btn">
        add product
      </Link>

      <Link to="/productsList" className="btn-primary btn">
        product list
      </Link>
    </div>
  );
};

export default Sidebar;
