

var sender = 'smtps://warkop30005%40gmail.com'   // The email to be use in sending the email
//(Change the @ symbol to %40 or do a url encoding )
var password = 'Warkop26?'  // password of the email to use

var nodeMailer = require("nodemailer");
var Email = require('email-templates');

var transporter = nodeMailer.createTransport(sender + ':' + password + '@smtp.gmail.com');

// create template based sender function
// assumes text.{ext} and html.{ext} in template/directory

const sendReminderEmail = new Email({
    views: { root: './emails/reminder' }
});

exports.sendReminder = function (email, username, name) {
    // transporter.template
    sendReminderEmail({
        to: email,
        subject: 'Password Reset - YourDomain.com'
    }, {
        name: name,
        username: username,
    }, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('Reminder sent\n'+ JSON.stringify(info));
        }
    });
};