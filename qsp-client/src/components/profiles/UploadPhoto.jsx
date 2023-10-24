import React, { useContext, useState } from "react";
import { uploadPhotoService } from "../../services/authServices";
import { AuthContext } from "./../../apis/AuthContext";

const UploadPhoto = () => {
  let { getMe } = useContext(AuthContext);
  let users = getMe?.data;

  let token = window.localStorage.getItem("user");
  let user = JSON.parse(token);
  console.log(user);

  let [photo, setPhoto] = useState([]);

  let handlePhoto = e => {
    console.log(e.target.files[0]);
    setPhoto([e.target.files[0].name]);
  };

  let handleSubmit = e => {
    e.preventDefault();
    try {
      console.log(photo);
      let formData = new FormData();
      formData.append("photo", photo);
      console.log(formData.getAll("photo"));
      console.log(formData);

      uploadPhotoService(
        `/auth/uploaduserphoto/${user?._id}`,
        formData,
        `Bearer ${user?.token}`
      )
        .then(_ => console.log("success"))
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    } finally {
      setPhoto([]);
    }
  };
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Upload Photo</label>
          <input type="file" onChange={handlePhoto} />
        </div>
        <div>
          <button>Upload</button>
        </div>
      </form>
    </section>
  );
};

export default UploadPhoto;
