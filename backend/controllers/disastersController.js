const asyncHandler = require("express-async-handler");
const { Disaster, validateCreateDisaster } = require("../models/Disaster");
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require("../utils/cloudinary");

/**-----------------------------------------------
 * @desc    Create New Disaster
 * @route   /api/Disasters
 * @method  POST
 * @access  private (only logged in user)
 ------------------------------------------------*/
module.exports.createDisasterCtrl = asyncHandler(async (req, res) => {
  // Validation for data
  const { error } = validateCreateDisaster(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Upload photo (assuming you have an image file in the request)
  if (!req.file) {
    return res.status(400).json({ message: "No image provided" });
  }

  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const imageResult = await cloudinaryUploadImage(imagePath);

  // Create new Disaster and save it to DB
  const newDisaster = await Disaster.create({
    type: req.body.type,
    reports: req.body.reports, // assuming you have a mechanism to link reports
    image: {
      url: imageResult.secure_url,
      publicId: imageResult.public_id,
    },
    video: req.body.video,
    description: req.body.description,
    status: req.body.status || 'ongoing',
    localisation: req.body.localisation,
  });

  // Send response to the client
  res.status(201).json(newDisaster);

  // Remove image from the server
  fs.unlinkSync(imagePath);
});
module.exports.createDisasterCtrl = asyncHandler(async (req, res) => {
  // Validation for data
  const { error } = validateCreateDisaster(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Upload photo (assuming you have an image file in the request)
  if (!req.file) {
    return res.status(400).json({ message: 'No image provided' });
  }

  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const imageResult = await cloudinaryUploadImage(imagePath);

  // Create new Disaster and save it to DB
  const newDisaster = await Disaster.create({
    type: req.body.type,
    reports: req.body.reports, // assuming you have a mechanism to link reports
    image: {
      url: imageResult.secure_url,
      publicId: imageResult.public_id,
    },
    video: req.body.video,
    description: req.body.description,
    status: req.body.status || 'ongoing',
    localisation: req.body.localisation,
  });

  // Send email to users with the same city as the disaster location using SMTP
  const usersInCity = await User.find({ city: req.body.localisation });

  if (usersInCity.length > 0) {
    const transporter = nodemailer.createTransport({
      host: 'your-smtp-host', // replace with your SMTP host
      port: 587, // replace with your SMTP port
      secure: false, // set to true for secure connections (e.g., with TLS/SSL)
      auth: {
        user: 'your-email@gmail.com', // replace with your email
        pass: 'your-password', // replace with your password
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: usersInCity.map((user) => user.email).join(','),
      subject: 'Disaster Alert',
      text: `A disaster has been reported in your city (${req.body.localisation}). Please stay safe.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }

  // Send response to the client
  res.status(201).json(newDisaster);

  // Remove image from the server
  fs.unlinkSync(imagePath);
});

/**-----------------------------------------------
 * @desc    Get All Disasters
 * @route   /api/Disasters
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getAllDisastersCtrl = asyncHandler(async (req, res) => {
  const disasters = await Disaster.find().populate("reports");
  res.status(200).json(disasters);
});

/**-----------------------------------------------
 * @desc    Get Single Disaster
 * @route   /api/Disasters/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getSingleDisasterCtrl = asyncHandler(async (req, res) => {
  const disaster = await Disaster.findById(req.params.id).populate("reports");
  if (!disaster) {
    return res.status(404).json({ message: "Disaster not found" });
  }

  res.status(200).json(disaster);
});

/**-----------------------------------------------
 * @desc    Delete Disaster
 * @route   /api/Disasters/:id
 * @method  DELETE
 * @access  private (only admin or owner of the Disaster)
 ------------------------------------------------*/
module.exports.deleteDisasterCtrl = asyncHandler(async (req, res) => {
  const disaster = await Disaster.findById(req.params.id);
  if (!disaster) {
    return res.status(404).json({ message: "Disaster not found" });
  }

  // Additional checks can be added based on your authorization logic

  await Disaster.findByIdAndDelete(req.params.id);
  await cloudinaryRemoveImage(disaster.image.publicId);

  res.status(200).json({ message: "Disaster has been deleted successfully" });
});

/**-----------------------------------------------
 * @desc    Update Disaster
 * @route   /api/Disasters/:id
 * @method  PUT
 * @access  private (only owner of the Disaster)
 ------------------------------------------------*/
module.exports.updateDisasterCtrl = asyncHandler(async (req, res) => {
  // Validation
  // You can add additional validation based on your requirements

  // Get the Disaster from DB and check if Disaster exists
  const disaster = await Disaster.findById(req.params.id);
  if (!disaster) {
    return res.status(404).json({ message: "Disaster not found" });
  }

  // Update Disaster
  const updatedDisaster = await Disaster.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        type: req.body.type,
        reports: req.body.reports,
        video: req.body.video,
        description: req.body.description,
        status: req.body.status,
        localisation: req.body.localisation,
      },
    },
    { new: true }
  ).populate("reports");

  // Send response to the client
  res.status(200).json(updatedDisaster);
});
