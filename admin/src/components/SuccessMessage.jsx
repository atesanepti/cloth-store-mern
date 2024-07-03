import React from 'react'
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';


const SuccessMessage = (props) => {
  return (
    <div className="success-message">
      <IoCheckmarkDoneCircle className="icon" />
      <span>
        product successfuly uploaded. <Link className='link' to="/productsList" >see the product</Link>
      </span>
    </div>
  );
};

export default SuccessMessage