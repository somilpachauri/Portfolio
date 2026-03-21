import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO, 
      replyTo: email,
      subject: `🌌 Universe Portfolio: Incoming Transmission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: white; padding: 20px; border-radius: 10px; border: 1px solid #fca311;">
          <h2 style="color: #fca311; text-align: center; border-bottom: 1px solid #ffffff1a; padding-bottom: 10px;">Incoming Transmission</h2>
          <p style="margin-bottom: 10px;"><strong>Explorer:</strong> ${name}</p>
          <p style="margin-bottom: 20px;"><strong>Frequency (Email):</strong> ${email}</p>
          <div style="background-color: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #888; font-size: 12px; margin-top: 30px; text-align: center; border-top: 1px solid #ffffff1a; padding-top: 10px;">Somil Pachauri's Universe Portfolio - Transmission Log</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Message received successfully!" }, { status: 200 });

  } catch (error) {
    console.error("Email API Error:", error);
    return NextResponse.json({ error: "Failed to send Message. Please try again later." }, { status: 500 });
  }
}