const asyncHandler = require("express-async-handler");
const {
  Notification,
  validateCreateNotification,
  validateUpdateNotification,
} = require("../models/Notification");
const { User } = require("../models/User");

/**-----------------------------------------------
 * @desc    Create New Notification
 * @route   /api/Notifications
 * @method  POST
 * @access  private (only logged in user)
 ------------------------------------------------*/
module.exports.createNotificationCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateNotification(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const profile = await User.findById(req.user.id);

  const newNotification = await Notification.create({
    text: req.body.text,
    user: req.user.id,
    username: profile.username,
  });

  res.status(201).json(newNotification);
});

/**-----------------------------------------------
 * @desc    Get All Notifications
 * @route   /api/Notifications
 * @method  GET
 * @access  private (only admin)
 ------------------------------------------------*/
module.exports.getAllNotificationsCtrl = asyncHandler(async (req, res) => {
  const notifications = await Notification.find().populate("user");
  res.status(200).json(notifications);
});

/**-----------------------------------------------
 * @desc    Delete Notification
 * @route   /api/Notifications/:id
 * @method  DELETE
 * @access  private (only admin or owner of the Notification)
 ------------------------------------------------*/
module.exports.deleteNotificationCtrl = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) {
    return res.status(404).json({ message: "Notification not found" });
  }

  if (req.user.isAdmin || req.user.id === notification.user.toString()) {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Notification has been deleted" });
  } else {
    res.status(403).json({ message: "Access denied, not allowed" });
  }
});

/**-----------------------------------------------
 * @desc    Update Notification
 * @route   /api/Notifications/:id
 * @method  PUT
 * @access  private (only owner of the Notification)
 ------------------------------------------------*/
 module.exports.updateNotificationCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateNotification(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const notification = await Notification.findById(req.params.id);
  if (!notification) {
    return res.status(404).json({ message: "Notification not found" });
  }
  
  if (req.user.id !== notification.user.toString()) {
    return res.status(403)
      .json({ message: "Access denied, only user himself can edit his Notification" });
  }

  const updatedNotification = await Notification.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        text: req.body.text,
      }
    },
    { new: true }
  );
  
  res.status(200).json(updatedNotification);
});
