const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 5555;

app.use(
  cors({
    methods: "POST",
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.status(400).send("Access Denied");
});

app.post("/", (req, res) => {
  const { name, email, subject, message } = req.body;
  //   console.log(message);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    ignoreTLS: false,
    auth: {
      user: process.env.Nodemailer_USER,
      pass: process.env.Nodemailer_PASS,
    },
  });

  const mailData = {
    to: `${name} <${email}>`,
    from: process.env.Nodemailer_USER,
    subject: `${subject}`,
    html: `${message}`,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) return console.log(err);

    return res.send("Email sent");
  });
});

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});
