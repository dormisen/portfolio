import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use("/", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Endpoint to handle contact form submissions
router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ status: "ERROR", message: "All fields are required" });
  }

  // Use your own email address for testing
  const recipientEmail = process.env.NODE_ENV === 'production' ? 'realrecipient@example.com' : 'r.aitiquen@gmail.com';

  try {
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Adjust this as needed
      to: [recipientEmail],
      subject: 'Contact Form Message',
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    });

    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ status: "ERROR", message: "Failed to send message" });
    }

    console.log('Email sent successfully:', data);
    res.status(200).json({ status: "Message Sent" });
  } catch (error) {
    console.error('Error in Resend:', error);
    res.status(500).json({ status: "ERROR", message: "Failed to send message" });
  }
});
