
import express from 'express';
import ActivityLog from '../models/ActivityLog';
import AuditRequest from '../models/AuditRequest';
import { sendAuditRequestEmail } from '../utils/email';

const router = express.Router();

router.post('/contact', async (req, res) => {
  try {
    const { name, email, service, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    console.log(`[Audit Request] ${name} (${email}): ${service || 'N/A'}`);
    
    // Save to AuditRequest collection
    const auditRequest = new AuditRequest({
      name,
      email,
      service: service || 'Not specified',
      message,
      status: 'pending'
    });
    await auditRequest.save();

    // Log to ActivityLog
    await new ActivityLog({
      projectId: 'system',
      type: 'message',
      content: `New Audit Request from ${name} (${email}) - Service: ${service || 'Not specified'}`
    }).save();

    // Send emails (admin notification + user confirmation)
    const emailResult = await sendAuditRequestEmail({
      name,
      email,
      service: service || 'Not specified',
      message
    });

    if (!emailResult.success) {
      console.warn('[Contact] Email sending failed, but request saved:', emailResult.message);
    }

    res.json({ 
      success: true, 
      message: 'Your audit request has been received. We will respond within 24 hours.' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Failed to process audit request' });
  }
});

router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    // Log subscription
    await new ActivityLog({
      projectId: 'system',
      type: 'message',
      content: `New strategy feed subscriber: ${email}`
    }).save();

    res.json({ success: true, message: 'Subscribed successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Subscription failed' });
  }
});

export default router;
