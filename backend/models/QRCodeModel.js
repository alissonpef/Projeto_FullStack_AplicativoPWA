const mongoose = require("mongoose");

const QRCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[A-Za-z0-9]+$/.test(value);
      },
      message: "QR code must be alphanumeric",
    },
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

QRCodeSchema.pre("save", function (next) {
  this.code = this.code.trim().toUpperCase();
  next();
});

QRCodeSchema.statics.findByUser = async function (userID) {
  return this.find({ userID });
};

module.exports = mongoose.model("QRCode", QRCodeSchema);
