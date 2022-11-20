const nodemailer = require ("nodemailer")

const sendEmail = async option => {
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "ebe918963a9bc8",
          pass: "e9415b059c326f"
        }
      });
      const mensaje = {
        from: "JR-Dev-Team <noreply@jrdevteam.com>",
        to: options.Email,
        subject: options.subject,
        text: options.mensaje
      }

      await transport.sendMail(mensaje)
}

module.exports = sendEmail;
