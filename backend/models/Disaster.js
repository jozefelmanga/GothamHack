const mongoose = require("mongoose");
const Joi = require("joi");

// Disaster Schema
const DisasterSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        trim: true,
    },
    reports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
      }],
    image: {
    type: Object,
    default: {
        url: "",
        publicId: null,
    },
    },
    video: {
    type: Object,
    default: {
        url: "",
        publicId: null,
    },
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
      },
      status:{
        type:String,enum:['refused','approved','ongoing','resolved'],
        default:'ongoing'
      },
      localisation:{
        type:String,
        required:true,
      },

}, {
    timestamps: true,
});

// Disaster Model
const Disaster = mongoose.model("Disaster", DisasterSchema);

// Validate Create Disaster
function validateCreateDisaster(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().required().label("Title"),
    });
    return schema.validate(obj);
}


module.exports = {
    Disaster,
    validateCreateDisaster
}