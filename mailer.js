const mailer = require('nodemailer') 

class Mailer {

    // private parameters
    #userName
    #password
    #host
    #port
    #secure
    #mailInfo = null
    #blindCopy = null
    #sender = null
    
    constructor(userName, host, password = '', port = 587, secure = false) {
        this.#userName = null
        this.#host = null
        if (typeof userName !== 'undefined' && typeof host !== 'undefined') {
            if (userName.length > 0 && host.length > 0) {
                this.#userName = userName
                this.#host = host
            }
        }
        this.#password = password
        this.#port = port
        this.#secure = secure
    }

    async sendMail(to, subject, html, text = '') {
        
        let rtn = false

        if (typeof to !== 'undefined' && typeof subject !== 'undefined' && typeof html !== 'undefined') {
            if (to.length > 0 && subject.length > 0 && html.length > 0) {
                if (this.#userName != null && this.#host != null) {

                    let sender = this.#userName
                    if (this.#sender != null) {
                        sender = this.#sender
                    }
                    
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
                        from: sender, // sender address
                        to: to, // list of receivers (comma separated)
                        subject: subject, // Subject line
                        text: text, // plain text body
                        html: html, // html body
                        bcc: this.#blindCopy
                    });
                    
                    this.#mailInfo = info
                    rtn = true
                
                }
            }
        }
        
        return rtn
        
    }

    setBlindCopy(blindCopy) {
        let rtn = false
        if (typeof blindCopy !== 'undefined') {
            if (blindCopy.length > 0) {
                this.#blindCopy = blindCopy
                rtn = true
            }
        }
        return rtn
    }

    setSender(sender) {
        let rtn = false
        if (typeof sender !== 'undefined') {
            if (sender.length > 0) {
                this.#sender = sender
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
