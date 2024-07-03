
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

const Brand = () => {
  return (
   
      <div className="brand">
        <img src={logo} alt="logo" />
        <div className="brand-text">
          <h1>core-commerce</h1>
          <span>admin panel</span>
        </div>
      </div>
   
  );
};

export default Brand;
