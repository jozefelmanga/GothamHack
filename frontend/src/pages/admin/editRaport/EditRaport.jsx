import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateReport } from "../../../redux/apiCalls/reportApiCall";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const EditReportPage = () => {
  const { reportId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { reports } = useSelector((state) => state.report);

  const statusFromQuery = new URLSearchParams(location.search).get("status");
  const currentReport = reports.find((report) => report._id === reportId);

  const [updatedReport, setUpdatedReport] = useState({
    description: "",
    userId: "",
    type: "",
    image: {},
    video: {},
    status: "ongoing",
    localisation: "",
  });

  useEffect(() => {
    if (currentReport) {
      setUpdatedReport({
        description: currentReport.description,
        userId: currentReport.userId,
        type: currentReport.type,
        image: currentReport.image,
        video: currentReport.video,
        status: statusFromQuery || currentReport.status,
        localisation: currentReport.localisation,
      });
    }
  }, [currentReport, statusFromQuery]);

  const handleUpdate = () => {
  console.log(updatedReport);
    dispatch(updateReport(updatedReport, reportId));
    navigate("/reports-table");
  };

  return (
    <div className="admin-login-container">
            <div className="admin-login-form">
                <h1> edit report</h1>
                
    
      <h2>Edit Report</h2>
      <TextField
        label="Description"
        fullWidth
        value={updatedReport.description}
        onChange={(e) =>
          setUpdatedReport({ ...updatedReport, description: e.target.value })
        }
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="User ID"
        fullWidth
        value={updatedReport.userId}
        onChange={(e) =>
          setUpdatedReport({ ...updatedReport, userId: e.target.value })
        }
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="Type"
        fullWidth
        value={updatedReport.type}
        onChange={(e) =>
          setUpdatedReport({ ...updatedReport, type: e.target.value })
        }
        variant="outlined"
        margin="normal"
      />
      {/* Add similar input fields for image, video, and localisation */}

      <Select
        label="Status"
        value={updatedReport.status}
        onChange={(e) =>
          setUpdatedReport({ ...updatedReport, status: e.target.value })
        }
        fullWidth
        variant="outlined"
        margin="normal"
      >
        <MenuItem value="refused">Refused</MenuItem>
        <MenuItem value="approved">Approved</MenuItem>
        <MenuItem value="ongoing">Ongoing</MenuItem>
        <MenuItem value="resolved">Resolved</MenuItem>
      </Select>

      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update Report
      </Button>
    </div>
    </div>
  );
};

export default EditReportPage;
