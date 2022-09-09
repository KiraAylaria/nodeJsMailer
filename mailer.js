const mailer = require('nodemailer') 

class Mailer {

    // private parameters
    #userName
    #password
    #host
    #port
    #secure
    #mailInfo = null
    
    constructor(userName, host, password = '', port = 587, secure = false) {
        if (userName.length > 0 && host.length > 0) {
            this.#userName = userName
            this.#host = host
        } else {
            this.#userName = null
            this.#host = null
        }
        this.#password = password
        this.#port = port
        this.#secure = secure
    }

    async sendMail(to, subject, html, text = '') {
        
        let rtn = false
        
        // TODO: Do not send mails if environment is production
        
        if (to.length > 0 && subject.length > 0 && html.length > 0) {
        
            if (this.#userName != null && this.#host != null) {
                
                // create reusable transporter object using the default SMTP transport
                let transporter = mailer.createTransport({
                    host: this.#host,
                    port: this.#port,
                    secure: this.#secure, // true for 465, false for other ports
                    auth: {
                        user: this.#userName,
                        pass: this.#password,
                    },
                });
                
                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: this.#userName, // sender address
                    to: to, // list of receivers (comma separated)
                    subject: subject, // Subject line
                    text: text, // plain text body
                    html: html, // html body
                });
                
                this.#mailInfo = info
                
                rtn = true
            
            }
        
        }
        
        return rtn
        
    }

    getInfo() {

        return this.#mailInfo

    }
    
}

module.exports = { Mailer }
