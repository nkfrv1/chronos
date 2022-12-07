const nodemailer = require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASS
            }
        });
    }

    async sendResetLink(email, token) {
        await this.transporter.sendMail({
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: 'Chronos Password Reset',
            html:
                `
                    <div>
                        <h1>Follow the link below and specify your new password</h1>
                        <h3>
                            <a href="${process.env.CLIENT_URL}/password-reset/${token}">${process.env.CLIENT_URL}/password-reset/${token}</a>
                        </h3>    
                        <p><em>Don't reply to this message</em></p>
                    </div>
                `
        });
    }
}

module.exports = new MailService();