const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const { Report, validateCreateReport, validateUpdateReport } = require("../models/Report");
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require("../utils/cloudinary");
const { Notification } = require("../models/Notification");
const { Disaster } = require("../models/Disaster");

/**-----------------------------------------------
 * @desc    Create New Report
 * @route   /api/Reports
 * @method  Report
 * @access  private (only logged in user)
 ------------------------------------------------*/
module.exports.createReportCtrl = asyncHandler(async (req, res) => {
  // 1. Validation for image


  // 2. Validation for data
$

  // 3. Upload photo
  // const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  // const result = await cloudinaryUploadImage(imagePath);

  // 4. Create new Report and save it to DB
  const report = await Report.create({
    description: req.body.description,
    user: req.user.id,
    type: req.body.type,
    video: req.body.video,
    status: req.body.status || 'ongoing',
    localisation: req.body.localisation,
  });

  // 5. Send response to the client
  res.status(201).json(report);

  // 6. Remove image from the server
  fs.unlinkSync(imagePath);
});

/**-----------------------------------------------
 * @desc    Get All Reports
 * @route   /api/Reports
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getAllReportsCtrl = asyncHandler(async (req, res) => {


  const reports = await Report.find();
  res.status(200).json(reports);
});


module.exports.getUserReportsCtrl = asyncHandler(async (req, res) => {
  const reports = await Report.find({ userId:req.id });
  
  res.status(200).json(reports);
});


/**-----------------------------------------------
 * @desc    Get Single Report
 * @route   /api/Reports/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getSingleReportCtrl = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id)

  if (!report) {
    return res.status(404).json({ message: "Report not found" });
  }

  res.status(200).json(report);
});
async function createDisasterFromReport(report) {
  try {
    const disasterData = {
      type: report.type,
      reports: [report._id],
      image: report.image,
      video: report.video,
      description: report.description,
      status: 'ongoing', // You can set the initial status for the disaster
      localisation: report.localisation,
    };

    // Create new Disaster and save it to DB
    const newDisaster = await Disaster.create(disasterData);

    // You may want to update the report to include the disaster ID
    await Report.findByIdAndUpdate(
      report._id,
      { $push: { disasters: newDisaster._id } },
      { new: true }
    );

    return newDisaster;
  } catch (error) {
    console.error("Error creating disaster from report:", error);
    throw error;
  }
}

/**-----------------------------------------------
 * @desc    Get Reports Count
 * @route   /api/Reports/count
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getReportCountCtrl = asyncHandler(async (req, res) => {
  const count = await Report.count();
  res.status(200).json(count);
});

/**-----------------------------------------------
 * @desc    Delete Report
 * @route   /api/Reports/:id
 * @method  DELETE
 * @access  private (only admin or owner of the Report)
 ------------------------------------------------*/
module.exports.deleteReportCtrl = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);
  if (!report) {
    return res.status(404).json({ message: "Report not found" });
  }

  if (req.user.isAdmin || req.user.id === report.userId.toString()) {
    await Report.findByIdAndDelete(req.params.id);
    await cloudinaryRemoveImage(report.image.publicId);

    // Delete all Notifications that belong to this Report
    await Notification.deleteMany({ ReportId: report._id });

    res.status(200).json({
      message: "Report has been deleted successfully",
      ReportId: report._id,
    });
  } else {
    res.status(403).json({ message: "access denied, forbidden" });
  }
});

/**-----------------------------------------------
 * @desc    Update Report
 * @route   /api/Reports/:id
 * @method  PUT
 * @access  private (only owner of the Report)
 ------------------------------------------------*/
 module.exports.updateReportCtrl = asyncHandler(async (req, res) => {
  // 1. Validation


  // 2. Get the Report from DB and check if Report exists
  const report = await Report.findById(req.params.id);
  if (!report) {
    return res.status(404).json({ message: "Report not found" });
  }

  // 3. Check if this Report belongs to the logged-in user


  // 4. Update Report status
  const updatedReport = await Report.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        description: req.body.description,
        type: req.body.type,
        video: req.body.video,
        status: req.body.status,
        localisation: req.body.localisation,
      },
    },
    { new: true }
  );

  // 5. If the status is changed to 'approved', create a disaster
  if (updatedReport.status === 'approved') {
    await createDisasterFromReport(updatedReport);
  }

  // 6. Send response to the client
  res.status(200).json(updatedReport);
});

/**-----------------------------------------------
 * @desc    Update Report Image
 * @route   /api/Reports/upload-image/:id
 * @method  PUT
 * @access  private (only owner of the Report)
 ------------------------------------------------*/
module.exports.updateReportImageCtrl = asyncHandler(async (req, res) => {
  // 1. Validation
  if (!req.file) {
    return res.status(400).json({ message: "no image provided" });
  }

  // 2. Get the Report from DB and check if Report exists
  const report = await Report.findById(req.params.id);
  if (!report) {
    return res.status(404).json({ message: "Report not found" });
  }

  // 3. Check if this Report belongs to the logged-in user
  if (req.user.id !== report.userId.toString()) {
    return res.status(403).json({ message: "access denied, you are not allowed" });
  }

  // 4. Delete the old image
  await cloudinaryRemoveImage(report.image.publicId);

  // 5. Upload new photo
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);

  // 6. Update the image field in the db
  const updatedReport = await Report.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        image: {
          url: result.secure_url,
          publicId: result.public_id,
        },
      },
    },
    { new: true }
  );

  // 7. Send response to the client
  res.status(200).json(updatedReport);

  // 8. Remove image from the server
  fs.unlinkSync(imagePath);
});



