import React, { useContext, useEffect, useState } from 'react'
import { updateService } from '../../services/authServices'
import { AuthContext } from '../../apis/AuthContext';

const UpdateProfile = () => {
    let { getMe } = useContext(AuthContext);
  let user = getMe?.data;
  let [email,setEmail]=useState("")
  useEffect(() => {
    updateService(`auth/update/${user._id}`, {
      
    });
  })
  return (
    <div>
      <form>
        <div>
          <input type="email" name="email" id="email" va/>
        </div>
        <div>
          <button>Update Email</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfile