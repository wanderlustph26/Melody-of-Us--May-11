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

  // PayPal Helpers
  const PAYPAL_API = 'https://api-m.sandbox.paypal.com';

  const getPayPalAccessToken = async () => {
    const clientId = process.env.VITE_PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('PayPal credentials missing in environment variables. Ensure VITE_PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET are set.');
    }

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('PayPal Auth Error Response:', errorText);
      throw new Error(`PayPal Token Error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return data.access_token;
  };

  // API routes
  app.post('/api/paypal/create-order', async (req, res) => {
    try {
      const { totalPrice, description } = req.body;
      const accessToken = await getPayPalAccessToken();
      const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
       body: JSON.stringify({
  intent: 'CAPTURE',
  purchase_units: [
    {
      amount: {
        currency_code: 'USD',
        value: Number(totalPrice || 0).toFixed(2),
      },
    },
  ],
  application_context: {
    shipping_preference: 'NO_SHIPPING',
    user_action: 'PAY_NOW',
  },
})
      });

      const order = await response.json();
      res.json(order);
    } catch (error) {
      console.error('PayPal Create Order Error:', error);
      res.status(500).json({ error: 'Failed to create PayPal order' });
    }
  });

  app.post('/api/paypal/capture-order', async (req, res) => {
    try {
      const { orderID, orderData } = req.body;
      const accessToken = await getPayPalAccessToken();
      const response = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const captureData = await response.json();

      if (captureData.status === 'COMPLETED') {
        // Business logic: send emails
        const { personalDetails, musicDetails, addons, totalPrice } = orderData;
        const payerEmail = captureData.payer.email_address;

        if (resend) {
          try {
            // Send email to the service
            await resend.emails.send({
              from: 'Melody Of Us <onboarding@resend.dev>',
              to: 'melodyofus.song@gmail.com',
              subject: `PAID: New Music Request - ${orderID}`,
              html: `
                <h1>Order ${orderID} Confirmed</h1>
                <p><strong>Total Paid:</strong> $${totalPrice.toFixed(2)} USD</p>
                <p><strong>Payer Email:</strong> ${payerEmail}</p>
                <p><strong>Payment Status:</strong> COMPLETED</p>

                <h2>Personal Details</h2>
                <p><strong>Name:</strong> ${personalDetails.fullName}</p>
                <p><strong>Client Email:</strong> ${personalDetails.email}</p>
                
                <h2>Music Details</h2>
                <p><strong>Genre:</strong> ${musicDetails.genre}</p>
                <p><strong>Mood:</strong> ${musicDetails.mood}</p>
                <p><strong>Occasion:</strong> ${musicDetails.occasion}</p>
                
                <h2>Add-ons</h2>
                <p>Expedited: ${addons.expedited ? 'YES' : 'NO'}</p>
                <p>Extra Verse: ${addons.extraVerse ? 'YES' : 'NO'}</p>
              `,
            });

            // Confirmation to customer
            await resend.emails.send({
              from: 'Melody Of Us <onboarding@resend.dev>',
              to: personalDetails.email,
              subject: 'Payment Successful - Sonic Genesis Initialized',
              html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #121212; color: #FFFFFF; padding: 40px; border-radius: 20px;">
                  <h1 style="color: #FF4FA3; font-size: 32px;">Payment Successful.</h1>
                  <p style="font-size: 16px; line-height: 1.6; color: #B3B3B3;">Hello ${personalDetails.fullName},</p>
                  <p style="font-size: 16px; line-height: 1.6; color: #B3B3B3;">Your payment has been captured and your project is now active. Transaction ID: <strong>${orderID}</strong>.</p>
                  <div style="background-color: #1E1E1E; padding: 20px; border-radius: 12px; margin: 30px 0;">
                    <p style="margin: 0; font-size: 14px; text-transform: uppercase; color: #FF4FA3; letter-spacing: 2px;">Order Summary</p>
                    <ul style="list-style: none; padding: 0; margin: 10px 0 0 0;">
                      <li style="margin-bottom: 5px;">Occasion: ${musicDetails.occasion}</li>
                      <li>Total Paid: $${totalPrice.toFixed(2)} USD</li>
                    </ul>
                  </div>
                  <p style="font-size: 14px; color: #B3B3B3;">Our composers are now synchronized with your story.</p>
                </div>
              `,
            });
          } catch (e) {
            console.error('Email sending failed:', e);
          }
        }
      }

      res.json(captureData);
    } catch (error) {
      console.error('PayPal Capture Order Error:', error);
      res.status(500).json({ error: 'Failed to capture PayPal order' });
    }
  });

  app.post('/api/paypal/webhook', async (req, res) => {
    const event = req.body;
    console.log('--- PayPal Webhook Received ---');
    console.log('Event Type:', event.event_type);
    console.log('Resource ID:', event.resource?.id);
    
    // Webhook Signature Verification (simplified for sandbox)
    // In production, you must use PayPal SDK or verify headers against PayPal public keys
    const webhookId = process.env.PAYPAL_WEBHOOK_ID;
    if (!webhookId) {
      console.warn('PAYPAL_WEBHOOK_ID not set. Skipping full verification.');
    }

    if (event.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
      const orderId = event.resource.supplementary_data?.related_ids?.order_id || event.resource.id;
      console.log('✅ Payment Capture Completed for Order:', orderId);
      
      // Update your database state here
      // db.orders.update({ where: { paypalOrderId: orderId }, data: { status: 'PAID' } })
    }
    
    res.status(200).send('Webhook processed');
  });

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
