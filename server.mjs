import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ status: "ERROR", message: "All fields are required" });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      subject: 'Contact Form Message',
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    });

    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ status: "ERROR", message: "Failed to send message" });
    } else {
      console.log('Email sent successfully:', data);
      res.status(200).json({ status: "Message Sent" });
    }
  } catch (error) {
    console.error('Error in Resend:', error);
    res.status(500).json({ status: "ERROR", message: "Failed to send message" });
  }
});

app.use('/', router);

const PORT = process.env.PORT || 2465;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
