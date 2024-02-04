import "./sidebar.scss";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logoutUser } from "../../redux/apiCalls/authApiCall";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);


  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="top">
      <br></br>
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <span className="logo">Estighatha</span>
        </Link>
      </div>
      <hr />
      <br></br>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>

          <Link to="/dashboard" style={{ textDecoration: "none" }}> {/* Corrected typo in the URL */}
            <li>
              <DashboardIcon className="icon" />
              <span>Tableau De Bord</span>
            </li>
          </Link>
          <br></br>
          
          <p className="title">LISTS</p>
          {
          (
          <Link to="/users-table" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Utilisateurs</span>
            </li>
          </Link>
          )
        }
          {
          (
          <Link to="/reports-table" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Reports</span>
            </li>
          </Link>
          )
        }
        {
         (
          <Link to="/disasters-table" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span> Disaster</span>
            </li>
          </Link>
          )
        }
          <Link to="/notifications-table" style={{ textDecoration: "none" }}>
          <li>
            <CreditCardIcon className="icon" />
            <span> notification</span>
          </li>
          </Link>
          <br></br>

          <p className="title">USER</p>
          
           

          <li onClick={logoutHandler} className="header-dropdown-item">
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    
    </div>
  );
};

export default AdminSidebar;
