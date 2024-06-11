// Import necessary modules
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import { config } from 'dotenv';

// Load environment variables
config();

// Create an instance of Express
const app = express();
const router = express.Router();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use("/api", router);

// Initialize Resend with your API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// POST endpoint to handle contact form submissions
router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Validate form data
  if (!name || !email || !message) {
    return res.status(400).json({ status: "ERROR", message: "All fields are required" });
  }

  try {
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['r.aitiquen@gmail.com'], // Replace with your email address for notifications
      subject: 'Contact Form Message',
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    });

    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ status: "ERROR", message: "Failed to send message" });
    } else {
      console.log('Email sent successfully:', data);
      return res.status(200).json({ status: "Message Sent" });
    }
  } catch (error) {
    console.error('Error in Resend:', error);
    return res.status(500).json({ status: "ERROR", message: "Failed to send message" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
