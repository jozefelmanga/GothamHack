import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { fetchDisasters, deleteDisaster } from "../../redux/apiCalls/disasterApiCall";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import swal from "sweetalert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AdminSidebar from "./AdminSidebar";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

const DisasterTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { disasters } = useSelector((state) => state.disaster);

  useEffect(() => {
    dispatch(fetchDisasters());
  }, [dispatch]);

  const handleUpdate = (disasterId) => {
    navigate(`/disasters-table/update-disaster/${disasterId}`);
  };

  const handleCreateDisaster = () => {
    navigate("/disasters-table/create-disaster");
  };

  const handleDelete = (disasterId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this disaster!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteDisaster(disasterId));
        swal("Poof! The disaster has been deleted!", {
          icon: "success",
        });
      } else {
        swal("The disaster is safe!");
      }
    });
  };

  const columns = [
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Localisation",
      selector: (row) => row.localisation,
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

  const filteredDisasters =
    Array.isArray(disasters) && disasters.length > 0
      ? disasters.filter((disaster) =>
          disaster.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          disaster.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          disaster.localisation.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  return (
    <section className="table-container">
      <AdminSidebar/>
      <div className="table-wrapper">
        <DataTable
          className="table-color"
          title="Disaster Table"
          columns={columns}
          data={filteredDisasters}
          pagination
          subHeader
          subHeaderComponent={
            <div className="subheader-content">
              <TextField
                fullWidth
                placeholder="Search by Type, Description, Localisation"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                style={{ marginRight: "16px" }}
              />
              <Button variant="outlined" onClick={handleCreateDisaster}>
                Create New Disaster
              </Button>
            </div>
          }
        />
      </div>
    </section>
  );
};

export default DisasterTable;
