const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

exports.handler = async (event, context) => {
  try {
    console.log("Received event:", JSON.stringify(event, null, 2));

    if (!event.body) {
      console.log("Event body is missing");
      throw new Error('Request body is missing');
    }

    const { email } = JSON.parse(event.body);

    if (!email) {
      console.log("Email is missing in the request body");
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Email is required' }),
      };
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '안전조치 협의서 파일 전송',
      text: '본 메일은 발신 전용입니다.첨부 양식을 확인해주시기 바랍니다.',
      attachments: [],
    };

    const relativePath = path.join(__dirname, 'sfy_form.docx');
    const absolutePath = path.resolve('/var/task/sfy_form.docx');

    try {
      mailOptions.attachments.push({ filename: 'sfy_form.docx', path: relativePath });
      console.log(`Attempting to attach file from relative path: ${relativePath}`);
      await transporter.sendMail(mailOptions);
    } catch (relativeError) {
      console.error(`Failed to attach file from relative path: ${relativeError.message}`);
      try {
        mailOptions.attachments = [{ filename: 'sfy_form.docx', path: absolutePath }];
        console.log(`Attempting to attach file from absolute path: ${absolutePath}`);
        await transporter.sendMail(mailOptions);
      } catch (absoluteError) {
        console.error(`Failed to attach file from absolute path: ${absoluteError.message}`);
        throw absoluteError;
      }
    }

    console.log("Email sent successfully");

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email', error: error.message }),
    };
  }
};
