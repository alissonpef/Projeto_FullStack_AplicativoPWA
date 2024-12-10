const webpush = require("web-push");
const dotenv = require("dotenv");
const User = require("./models/UserModel");
const QRCode = require("./models/QRCodeModel");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

webpush.setVapidDetails(
  "mailto:dppazlopez@gmail.com",
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

const sendNotification = async (qrCode, message) => {
  try {
    const qr = await QRCode.findOne({ code: qrCode }).populate("userID");
    if (!qr) {
      console.error(`QR code ${qrCode} not found`);
      process.exit(1);
    }
    const user = qr.userID;
    if (!user || !user.pushSubscription) {
      console.error(`User with QR code ${qrCode} does not have a push subscription`);
      process.exit(1);
    }
    await webpush.sendNotification(
      user.pushSubscription,
      JSON.stringify({
        title: "Nova mensagem:",
        body: message,
      })
    );
    console.log(`Notification sent to user ${user.name} (${user.email})`);
    process.exit(0);
  } catch (error) {
    console.error("Error sending notification:", error.message);
    process.exit(1);
  }
};

const [, , qrCode, message] = process.argv;

if (!qrCode || !message) {
  console.error("Usage: node manda_msg.js <qr_code> <message>");
  process.exit(1);
}

sendNotification(qrCode, message);
