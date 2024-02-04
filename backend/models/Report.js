  const mongoose = require("mongoose");
  const Joi = require("joi");

  // Report Schema
  const ReportSchema = new mongoose.Schema(
    {
      description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
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
      status:{
        type:String,enum:['refused','approved','ongoing','resolved'],
        default:'ongoing'
      },

      localisation:{
        type:String,
        required:true,
      },
    },
    {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    }
  );



  // Report Model
  const Report = mongoose.model("Report", ReportSchema);

  function validateCreateReport(obj) {
    const schema = Joi.object({
      description: Joi.string().trim().min(10).required(),
      type: Joi.string().required(),
      image: Joi.object(),
      video: Joi.object(),
      status: Joi.string().valid('approved','refused', 'ongoing', 'resolved').default('ongoing'),
      localisation: Joi.string().required(),
    });
    return schema.validate(obj);
  }

  function validateUpdateReport(obj) {
    const schema = Joi.object({
      description: Joi.string().trim().min(10),
      type: Joi.string(),
      image: Joi.object(),
      video: Joi.object(),
      status: Joi.string().valid('refused', 'ongoing', 'resolved'),
      localisation: Joi.string(),
    });
    return schema.validate(obj);
  }


  module.exports = {
    Report,
    validateCreateReport,
    validateUpdateReport,
  };
