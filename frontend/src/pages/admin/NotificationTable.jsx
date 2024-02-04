import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  deleteNotification,
} from "../../redux/apiCalls/notificationApiCall";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import swal from "sweetalert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AdminDashboard from "./AdminDashboard";
import AdminSidebar from "./AdminSidebar";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

const NotificationTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { notifications } = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleUpdate = (notificationId) => {
    navigate(`/notifications-table/update-notification/${notificationId}`);
  };

  const handleCreateNotification = () => {
    navigate("/notifications-table/create-notification");
  };

  const handleDelete = (notificationId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this notification!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteNotification(notificationId));
        swal("Poof! The notification has been deleted!", {
          icon: "success",
        });
      } else {
        swal("The notification is safe!");
      }
    });
  };

  const columns = [

    {
      name: "Text",
      selector: (row) => row.text,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => formatDate(row.createdAt),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <IconButton
            variant="outlined"
            color="success"
            size="small"
            onClick={() => handleUpdate(row._id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(row._id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

   

  return (
    <section className="table-container">
    <AdminSidebar />
    <div className="table-wrapper">
        <DataTable
          className="table-color"
          title="Notification Table"
          columns={columns}
          data={notifications}
          pagination
          subHeader
          subHeaderComponent={
            <div className="subheader-content">
              <TextField
                fullWidth
                placeholder="Search by User, Text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                style={{ marginRight: "16px" }}
              />
              <Button variant="outlined" onClick={handleCreateNotification}>
                Create New Notification
              </Button>
            </div>
          }
        />
      </div>
    </section>
  );
};

export default NotificationTable;
