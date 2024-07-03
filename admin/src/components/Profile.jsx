
import { AiOutlineDown } from "react-icons/ai";

import admin_profile from "../assets/admin_product.jpg"


const Profile = () => {
  return (
    <div className="profile">
      <img src={admin_profile} alt="profile" />
      <AiOutlineDown className='icon' />
    </div>
  );
}

export default Profile