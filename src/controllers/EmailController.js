const nodemailer = require('nodemailer');
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = 'quadrosul';
require('dotenv/config');


function decrypt(data) {
    var decipher = crypto.createDecipher(algorithm, key);
    var decrypted = decipher.update(data, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

module.exports = {

    async sendMail(request, response) {

        var $user = process.env.EMAIL;
        var $authorization = process.env.PASSWORD;

        const { from, subject, message, to } = request.body;

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: $user,
                pass: $authorization
            }
        });


        var mailOptions = {
            from: from,
            to: to,
            subject: subject,
            text: message
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return response.json({ "responseCode": error.responseCode,
                                        "message": error.response  });
            } else {
                console.log('Email enviado: ' + info.response);
                return response.json({ "responseCode": 200,
                                        "message": "Email enviado com sucesso" });
            }
        });
        


    }
}