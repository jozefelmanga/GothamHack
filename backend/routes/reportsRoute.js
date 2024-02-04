const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const {
  createReportCtrl,
  getAllReportsCtrl,
  getSingleReportCtrl,
  getReportCountCtrl,
  deleteReportCtrl,
  updateReportCtrl,
  updateReportImageCtrl,
  getUserReportsCtrl
} = require("../controllers/reportsController");
const photoUpload = require('../middlewares/photoUpload');

const { verifyToken, verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");

// /api/reports
router
  .route("/")
  .post(verifyToken,photoUpload.single('image'), createReportCtrl)
  .get(getAllReportsCtrl);

// /api/reports/user/:id
router
  .route("/user/:id")
  .get(getUserReportsCtrl);

// /api/reports/:id
router
  .route("/:id")
  .get(getSingleReportCtrl)
  .delete(validateObjectId, verifyToken, deleteReportCtrl)
  .put(updateReportCtrl);

// /api/reports/upload-image/:id
router
  .route("/upload-image/:id")
  .put(validateObjectId, verifyToken, updateReportImageCtrl);

// /api/reports/count
router.get("/count", getReportCountCtrl);

module.exports = router;
