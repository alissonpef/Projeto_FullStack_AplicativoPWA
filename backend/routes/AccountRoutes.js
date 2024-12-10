const express = require("express");
const User = require("../models/UserModel");
const QRCode = require("../models/QRCodeModel");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

const validateQRCode = (code) => /^[A-Za-z0-9]+$/.test(code);

// Add a new QR code to the user account
router.post("/qrcodes/add", authenticate, async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ message: "QR code is required" });
    }
    if (!validateQRCode(code)) {
      return res.status(400).json({ message: "QR code must be alphanumeric" });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const existingQRCode = await QRCode.findOne({ code, userID: req.user.id });
    if (existingQRCode) {
      return res.status(400).json({ message: "QR code already exists" });
    }
    const qrCode = new QRCode({ code, userID: req.user.id });
    await qrCode.save();
    user.qrCodes.push(qrCode._id);
    await user.save();
    res.status(201).json({ message: "QR code added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding QR code", error: error.message });
  }
});

// List all QR codes of the user account
router.get("/qrcodes/list", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "qrCodes",
      select: "code",
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ qrCodes: user.qrCodes });
  } catch (error) {
    res.status(500).json({ message: "Error listing QR codes", error: error.message });
  }
});

// Register push subscription
router.post("/push/register", authenticate, async (req, res) => {
  try {
    const { subscription } = req.body;
    if (!subscription) {
      return res.status(400).json({ message: "Subscription is required" });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.pushSubscription = subscription;
    await user.save();
    res.status(200).json({ message: "Push subscription registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering push subscription", error: error.message });
  }
});

module.exports = router;

// Testing with curl:

// Add a new QR code
// curl -X POST http://localhost:3000/account/qrcodes/add -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTM2ZmNjMzg5YTNjZWEwMzNiMGYyZiIsImlhdCI6MTczMzUyMTM2MCwiZXhwIjoxNzMzNTI0OTYwfQ.GGZlQG7jpM7yNiGWAtHQN0KzMDvIwkmaFpkoyKCehTA" -H "Content-Type: application/json" -d '{"code": "A1"}'

// List all QR codes
// curl -X GET http://localhost:3000/account/qrcodes/list -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTM2ZmNjMzg5YTNjZWEwMzNiMGYyZiIsImlhdCI6MTczMzUyMTM2MCwiZXhwIjoxNzMzNTI0OTYwfQ.GGZlQG7jpM7yNiGWAtHQN0KzMDvIwkmaFpkoyKCehTA"

// Register push subscription
// curl -X POST http://localhost:3000/account/push/register -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTM2ZmNjMzg5YTNjZWEwMzNiMGYyZiIsImlhdCI6MTczMzUyMTM2MCwiZXhwIjoxNzMzNTI0OTYwfQ.GGZlQG7jpM7yNiGWAtHQN0KzMDvIwkmaFpkoyKCehTA" -H "Content-Type: application/json" -d '{"subscription": {"endpoint": "https://fcm.googleapis.com/fcm/send/dXuog9zjWDE:APA91bHKdJ11fDeyN6lBlGSMrAY_UcjUWXHD3wziLtMm-eCbjofXueKeeWwb19qFHLhhiV32f-CFgOFPatVCOJ744sNaOOqUT5xRiwCjFz7nnms8Sl-uOm95ynEHLGKQRMXevpCEzrts", "expirationTime": null, "keys": {"p256dh": "BLy3qtU9BUOD1aRzTdJhdx1H-TKqd0w6m24fjOQQsoSB23YEjifOV5jk2Rd2BjnMMsw3vjjgzPfVxJc49c856Lg", "auth": "4gmhK741sutk_lJXBfo6pg"}}}'
