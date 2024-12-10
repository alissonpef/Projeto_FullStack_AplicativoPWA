const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const QRCode = require("./QRCodeModel");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
  },
  qrCodes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QRCode",
    },
  ],
  sessionToken: {
    type: String,
    default: null,
  },
  pushSubscription: {
    type: Object,
    default: null,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await QRCode.deleteMany({ userID: doc._id });
  }
});

module.exports = mongoose.model("User", UserSchema);
