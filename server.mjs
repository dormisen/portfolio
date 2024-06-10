import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const app = express();
const router = express.Router();
const OAuth2 = google.auth.OAuth2;

app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(5000, () => console.log("Server Running on port 5000"));

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID, // Client ID
  process.env.CLIENT_SECRET, // Client Secret
  'https://developers.google.com/oauthplayground' // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
});

async function createTransporter() {
  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });

  transporter.verify((error, success) => {
    if (error) {
      console.error("Error configuring email transporter:", error);
    } else {
      console.log("Email transporter configured and ready to send messages");
    }
  });

  return transporter;
}

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ status: "ERROR", message: "All fields are required" });
  }

  const mailOptions = {
    from: email, // Sender's email
    to: process.env.EMAIL_USER,
    subject: "Contact Form Message",
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
  };

  try {
    const transporter = await createTransporter();
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ status: "ERROR", message: "Failed to send message" });
      }
      res.status(200).json({ status: "Message Sent", info });
    });
  } catch (error) {
    console.error("Error creating transporter:", error);
    res.status(500).json({ status: "ERROR", message: "Failed to create email transporter" });
  }
});

