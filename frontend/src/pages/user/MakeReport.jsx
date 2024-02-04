import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReport } from "../../redux/apiCalls/reportApiCall";
import { toast } from "react-toastify";
import swal from "sweetalert";
import './makereport.scss';

const MakeReport = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [newReport, setNewReport] = useState({
    type: "",
    description: "",
    localisation: "",
    image: null,
    video: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setNewReport({
        ...newReport,
        [name]: files[0],
      });
    } else {
      setNewReport({
        ...newReport,
        [name]: value,
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!newReport.type || !newReport.description || !newReport.localisation) {
      toast.error("Type, description, and localisation are required fields");
      return;
    }

    const reportWithUser = {
      ...newReport,
      user: user._id,
    };

    dispatch(createReport(reportWithUser));

    swal({
      title: "Report created successfully",
      icon: "success",
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="type">Type:</label>
        <select
          id="type"
          name="type"
          value={newReport.type}
          onChange={handleInputChange}
        >
          <option value="">Select a Type</option>
          <option value="Earthquake">Earthquake</option>
          <option value="Flood">Flood</option>
          <option value="Fire">Fire</option>
          <option value="Tornado">Tornado</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={newReport.description}
          onChange={handleInputChange}
          placeholder="Enter report description"
        />
      </div>

      <div>
        <label htmlFor="localisation">Localisation:</label>
        <input
          type="text"
          id="localisation"
          name="localisation"
          value={newReport.localisation}
          onChange={handleInputChange}
          placeholder="Enter report localisation"
        />
      </div>

      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleInputChange}
          accept="image/*"
        />
      </div>

      <div>
        <label htmlFor="video">Video:</label>
        <input
          type="file"
          id="video"
          name="video"
          onChange={handleInputChange}
          accept="video/*"
        />
      </div>

      {/* Add other form fields here based on your requirements */}
      
      <button type="submit">Submit Report</button>
    </form>
  );
};

export default MakeReport;
