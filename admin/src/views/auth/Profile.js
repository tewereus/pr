import React from "react";
import { BsImages } from "react-icons/bs";
import { FadeLoader } from "react-spinners";
import { uploadProfile } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const add_image = (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);

      // Log FormData contents
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      // console.log("authState: ", user);
      dispatch(uploadProfile(formData));
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center py-3">
        {user?.image ? (
          <label
            htmlFor="img"
            className="h-[210px] w-[300px] relative p-3 cursor-pointer overflow-hidden"
          >
            <img className="w-full h-full" src={user.image} alt="" />
            {isLoading && (
              <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                <span>
                  <FadeLoader />
                </span>
              </div>
            )}
          </label>
        ) : (
          <label
            className="flex justify-center items-center flex-col h-[210px] w-[300px] cursor-pointer border border-dashed hover:border-indigo-500 border-[#d0d2d6] relative"
            htmlFor="img"
          >
            <span>
              <BsImages />
            </span>
            <span>Select Image</span>
            {isLoading && (
              <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                <span>
                  <FadeLoader />
                </span>
              </div>
            )}
          </label>
        )}
        <input onChange={add_image} type="file" className="hidden" id="img" />
      </div>
    </div>
  );
};

export default Profile;
