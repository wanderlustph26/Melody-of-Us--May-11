import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;
  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

  app.use(express.json());

  // API routes
  app.post('/api/complete-order', async (req, res) => {
    const { orderId, payerEmail, orderData } = req.body;
    const { personalDetails, musicDetails, addons, totalPrice } = orderData;

    console.log(`Processing completed order: ${orderId} from ${payerEmail}`);

    if (resend) {
      try {
        // Send email to the service
        await resend.emails.send({
          from: 'Melody Of Us <onboarding@resend.dev>',
          to: 'melodyofus.song@gmail.com',
          subject: `PAID: New Music Request - ${orderId}`,
          html: `
            <h1>Order ${orderId} Confirmed</h1>
            <p><strong>Total Paid:</strong> $${totalPrice.toFixed(2)} USD</p>
            <p><strong>Payer Email:</strong> ${payerEmail}</p>

            <h2>Personal Details</h2>
            <p><strong>Name:</strong> ${personalDetails.fullName}</p>
            <p><strong>Client Email:</strong> ${personalDetails.email}</p>
            <p><strong>Social:</strong> ${personalDetails.socialHandle || 'N/A'}</p>
            
            <h2>Music Details</h2>
            <p><strong>Genre:</strong> ${musicDetails.genre}</p>
            <p><strong>Mood:</strong> ${musicDetails.mood}</p>
            <p><strong>Occasion:</strong> ${musicDetails.occasion}</p>
            <p><strong>Tempo:</strong> ${musicDetails.tempo}</p>
            <p><strong>Deadline:</strong> ${musicDetails.deadline}</p>
            <p><strong>Description:</strong> ${musicDetails.description}</p>
            
            <h2>Add-ons</h2>
            <p>Expedited: ${addons.expedited ? 'YES' : 'NO'}</p>
            <p>Extra Verse: ${addons.extraVerse ? 'YES' : 'NO'}</p>
          `,
        });

        // Send confirmation to customer
        await resend.emails.send({
          from: 'Melody Of Us <onboarding@resend.dev>',
          to: personalDetails.email,
          subject: 'Payment Successful - Sonic Genesis Initialized',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #121212; color: #FFFFFF; padding: 40px; border-radius: 20px;">
              <h1 style="color: #FF4FA3; font-size: 32px;">Payment Successful.</h1>
              <p style="font-size: 16px; line-height: 1.6; color: #B3B3B3;">Hello ${personalDetails.fullName},</p>
              <p style="font-size: 16px; line-height: 1.6; color: #B3B3B3;">Your custom music request has been received and payment is confirmed. Transaction ID: <strong>${orderId}</strong>.</p>
              <div style="background-color: #1E1E1E; padding: 20px; border-radius: 12px; margin: 30px 0;">
                <p style="margin: 0; font-size: 14px; text-transform: uppercase; color: #FF4FA3; letter-spacing: 2px;">Order Summary</p>
                <ul style="list-style: none; padding: 0; margin: 10px 0 0 0;">
                  <li style="margin-bottom: 5px;">Occasion: ${musicDetails.occasion}</li>
                  <li style="margin-bottom: 5px;">Total Investment: $${totalPrice.toFixed(2)} USD</li>
                  <li>Draft Expectation: ${addons.expedited ? '24-48 Hours' : '3-5 Business Days'}</li>
                </ul>
              </div>
              <p style="font-size: 14px; color: #B3B3B3;">Our composers are now diving into your story. Stay tuned to the frequency.</p>
              <hr style="border: 0; border-top: 1px solid #333; margin: 40px 0;" />
              <p style="font-size: 12px; text-align: center; color: #666;">© 2024 Melody Of Us. All Rights Reserved.</p>
            </div>
          `,
        });
      } catch (error) {
        console.error('Email error during completion:', error);
      }
    }

    res.status(200).json({ success: true, message: "Payment successful. Your custom music request has been received." });
  });

  app.post('/api/submit-order', async (req, res) => {
    // Keep this as a placeholder or remove if fully switched to PayPal
    res.status(200).json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
