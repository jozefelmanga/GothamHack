import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

const HeaderRight = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [dropdown, setDropdown] = useState(false);

  // Logout Handler
  const logoutHandler = () => {
    setDropdown(false);
    dispatch(logoutUser());
  }

  return (
    <div className="header-right">
      {user ? (
        <>
          <div className="header-right-user-info">
            <span
              onClick={() => setDropdown((prev) => !prev)}
              className="header-right-username"
            >
              {user?.username}
            </span>
            <img
              src={user?.profilePhoto.url}
              alt="user photo"
              className="header-right-user-photo"
            />
            {dropdown && (
              <div className="header-right-dropdown">
                <Link
                  to={`/profile/${user?._id}`}
                  className="header-dropdown-item"
                  onClick={() => setDropdown(false)}
                >
                  <i className="bi bi-file-person"></i>
                  <span>Profile</span>
                </Link>
                <div onClick={logoutHandler} className="header-dropdown-item">
                <Link to="/" className="header-right-link">
                <i className="bi bi-box-arrow-in-left"></i>
                  <span>Logout</span>
          </Link>
                  
                </div>
              </div>
            )}
          </div>
        </>
      ):null}
    </div>
  );
};

export default HeaderRight;
