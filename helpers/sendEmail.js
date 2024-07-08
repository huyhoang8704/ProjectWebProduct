const nodemailer = require("nodemailer");


module.exports.sendEmail = async (email, subject, html) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'aye10diemtoan0@gmail.com',
          pass: 'yourpassword'   // mật khẩu ở xác minh 2 bước
        }
      });
      
      var mailOptions = {
        from: 'aye10diemtoan0@gmail.com',
        to: email,
        subject: subject,
        html: html
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}