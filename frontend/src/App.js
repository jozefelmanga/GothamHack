import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/forms/Login";
import { useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import { ToastContainer } from "react-toastify";
import NotFound from "./pages/not-found/NotFound";
import { useSelector } from "react-redux";
import UsersTable from "./pages/admin/UsersTable";
import ReportsTable from "./pages/admin/ReportTable";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserInterface from "./pages/user/UserInterface";

import AddUserPage from "./pages/admin/adduser/Add-user";

import UpdateProfileModal from "./pages/profile/UpdateProfileModal";
import { authActions } from "./redux/slices/authSlice";
import { useDispatch  } from "react-redux";

import Unauthorized from "./pages/not authorized/Not authorized";
import DisasterTable from "./pages/admin/DisasterTable";
import EditReportPage from "./pages/admin/editRaport/EditRaport";
import NotificationTable from "./pages/admin/NotificationTable";
import Register from "./pages/forms/Register";
import MakeReport from "./pages/user/MakeReport";
import UserReports from "./pages/user/UserReports";
function App() {

  const { user } = useSelector((state) => state.auth);



  return (
    <BrowserRouter>
      <ToastContainer theme="colored" position="top-center" />
     
      
      <Routes>
        <Route
          path="/"
          element={  <Login/>}
        />
     
     <Route
          path="register"
          element={  <Register />}
        />
     <Route
          path="login"
          element={  <Login />}
        />
<Route
          path="dashboard"
          element={  <AdminDashboard />}
        />

<Route
          path="estighatha"
          element={  < UserInterface/>}
        />

       
    
   
        <Route
            path="users-table">
        <Route
        index
            element={ <UsersTable/> }
          />
           <Route
            path="add-user"
            element={ <AddUserPage /> }
            
          />
      </Route>
          <Route 
            path="my-reports">
            <Route 
            index
            element={ <UserReports /> }
          />
                  <Route
          path="update-report/:reportId"
          element={ <EditReportPage /> }
        />
            
          </Route>
          
       

         
        
       
          <Route path="notifications-table">
          <Route
           index
            element={ <NotificationTable/> }
          />
          

          
          </Route>
          
      
      <Route  path="disasters-table">
            <Route
            index
            element={ <DisasterTable />}
          />
         

            </Route>



            {/* user */}
            <Route  path="make-report">
            <Route
            index
            element={ <MakeReport />}
          />
         

            </Route>



        
        <Route path="*" element={<NotFound />} />
        <Route path="unauthorized-page" element={<Unauthorized/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;


