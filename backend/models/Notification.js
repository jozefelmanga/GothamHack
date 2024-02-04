const mongoose = require("mongoose");
const Joi = require("joi");

// Notification Schema
const NotificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    date:{
        type:Date,
    }
   
}, {
    timestamps: true,
});

// Notification Model
const Notification = mongoose.model("Notification", NotificationSchema);

// Validate Create Notification
function validateCreateNotification(obj) {
    const schema = Joi.object({
        user: Joi.string().required().label("user"),
        text: Joi.string().trim().required().label("Text"),
    });
    return schema.validate(obj);
}

// Validate Update Notification
function validateUpdateNotification(obj) {
    const schema = Joi.object({
        text: Joi.string().trim().required(),
    });
    return schema.validate(obj);
}

module.exports = {
    Notification,
    validateCreateNotification,
    validateUpdateNotification,
}