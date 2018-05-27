const nodemailer = require('nodemailer');

module.exports.sendMail = function(client){
    let content = "";
    content += "Hi " + client.firstName + ' ' + client.lastName + '\n';
    content += "Don't forget to check our website for the latest news near you!\n";
    content += "https://tranquil-headland-98719.herokuapp.com";

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'warkop30005@gmail.com',
            pass: 'Warkop26?'
        }
    });

    const mailOptions = {
        from: 'youremail@gmail.com',
        to: client.email,
        subject: 'Sending Email using Node.js',
        text: content
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};