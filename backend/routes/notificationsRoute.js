const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const {
  createNotificationCtrl,
  getAllNotificationsCtrl,
  deleteNotificationCtrl,
  updateNotificationCtrl,
} = require("../controllers/notificationsController");
const { verifyToken, verifyAdmin } = require("../middlewares/verifyToken");

// /api/notifications
router
  .route("/")
  .post(verifyToken, createNotificationCtrl)
  .get( getAllNotificationsCtrl);

// /api/notifications/:id
router
  .route("/:id")
  .delete(verifyToken, deleteNotificationCtrl)
  .put(verifyToken, updateNotificationCtrl);

module.exports = router;

