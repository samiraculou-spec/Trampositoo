import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import 'dotenv/config';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route to send email
  app.post("/api/send-email", async (req, res) => {
    try {
      const { text, recipient } = req.body;
      
      const gmailUser = process.env.GMAIL_USER;
      const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

      if (!gmailUser || !gmailAppPassword) {
        // Return a mock success if credentials aren't set up yet,
        // but log it so the user knows they need to set them up.
        console.warn("Missing GMAIL_USER or GMAIL_APP_PASSWORD. Simulating success.");
        return res.json({ success: true, simulated: true });
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailAppPassword,
        },
      });

      const mailOptions = {
        from: gmailUser,
        to: recipient || gmailUser,
        subject: "Mensaje especial del Espejo",
        text: text,
      };

      await transporter.sendMail(mailOptions);

      res.json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
