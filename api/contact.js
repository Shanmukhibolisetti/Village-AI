import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  const { name, phone, school, role, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "dharmatej@villageaiedu.in",
      subject: "New Village AI Enquiry",
      html: `
        <h2>New Form Submission</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>School:</strong> ${school}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    return res.status(200).json({
      success: true
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}