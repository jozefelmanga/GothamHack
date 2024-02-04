import "./navbar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
import { AddCircle, Bookmark } from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import Dashboard from "@mui/icons-material/Dashboard";

const UserNavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="top">
        <Link to="/estighatha" style={{ textDecoration: "none" }}>
          <span className="logo">إستغاثة</span>
        </Link>
      </div>
      <div className="center">
        <ul>
          <li>
            <Link to="/make-report" style={{ textDecoration: "none" }}>
              <AddCircle className="icon" />
              <span>make a report</span>
            </Link>
          </li>
          <li>
            <Link to="" style={{ textDecoration: "none" }}>
              <Bookmark className="icon" />
              <span>Recent Disasters</span>
            </Link>
          </li>
          <li>
            <Link to="/my-reports" style={{ textDecoration: "none" }}>
              <Dashboard className="icon" />
              <span>my reports</span>
            </Link>
          </li>
          <li>
            <Link to="" style={{ textDecoration: "none" }}>
              <CreditCardIcon className="icon" />
              <span> notification</span>
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="logout" onClick={logoutHandler}>
        <ExitToAppIcon className="icon" />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default UserNavBar;
