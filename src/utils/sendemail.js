import nodemailer from "nodemailer"

export const sendEmail = async ({ to, subject, html }) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  return await transporter.sendMail({
    from: `"App Name" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  })
}
