const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const {
  createDisasterCtrl,
  getAllDisastersCtrl,
  getSingleDisasterCtrl,
  deleteDisasterCtrl,
  updateDisasterCtrl,
} = require("../controllers/disastersController");
const { verifyToken, verifyAdmin } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");

// /api/disasters
router
  .route("/")
  .post(verifyToken, createDisasterCtrl)
  .get(getAllDisastersCtrl);

// /api/disasters/:id
router
  .route("/:id")
  .get(validateObjectId, getSingleDisasterCtrl)
  .delete(verifyToken, deleteDisasterCtrl)
  .put(verifyToken, updateDisasterCtrl);

module.exports = router;
