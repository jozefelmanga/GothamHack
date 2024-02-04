import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports, deleteReport } from "../../redux/apiCalls/reportApiCall";
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

const ReportTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { reports } = useSelector((state) => state.report);

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  const handleUpdate = (reportId) => {
    navigate(`/reports-table/update-report/${reportId}`);
  };

  const handleCreateReport = () => {
    navigate("/reports-table/create-report");
  };

  const handleDelete = (reportId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this report!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteReport(reportId));
        swal("Poof! The report has been deleted!", {
          icon: "success",
        });
      } else {
        swal("The report is safe!");
      }
    });
  };

  const columns = [
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "User",
      selector: (row) => row.userId,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
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
      name: "Date Created",
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

  const filteredReports =
    Array.isArray(reports) && reports.length > 0
      ? reports.filter(
          (report) =>
            report.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            report.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.localisation.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  return (
    <section className="table-container">
    <AdminSidebar />
    <div className="table-wrapper">
      
        <DataTable
          className="table-color"
          title="Report Table"
          columns={columns}
          data={filteredReports}
          pagination
          subHeader
          subHeaderComponent={
            <div className="subheader-content">
              <TextField
                fullWidth
                placeholder="Search by Description, User, Type, Status, Localisation"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                style={{ marginRight: "16px" }}
              />
              <Button variant="outlined" onClick={handleCreateReport}>
                Create New Report
              </Button>
            </div>
          }
        />
      </div>
    </section>
  );
};

export default ReportTable;
