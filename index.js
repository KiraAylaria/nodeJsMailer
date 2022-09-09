const {Mailer} = require('./mailer.js')

const mailer = new Mailer('username/mail', 'host', 'pass', 465, true)

mailTest()

async function mailTest() {
    let result = await mailer.sendMail('receiver', 'Nodemailer Test', '<p>Nodemailer Test!</p>', 'Nodemailer Test')
    console.log(mailer.getInfo())
    return result
}