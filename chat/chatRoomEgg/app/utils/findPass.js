// async..await is not allowed in global scope, must use a wrapper

const nodemailer=require("nodemailer")

module.exports.sendEmail=async (username, email, url)=>{
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
    console.log(testAccount,username, email, url);
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.sina.com',
        //service: 'qq',
        // port: 465,
        //secure: false, // true for 465, false for other ports
        secureConnection: true, // 使用了 SSL
        auth: {
            user: 'qiangchen1996@sina.com', // generated ethereal user
            pass: 'cq1715584439' // generated ethereal password
        }
    })

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '<qiangchen1996@sina.com>', // sender address
        to: email, // list of receivers
        subject: "重新设置密码", // Subject line
        html: `<b>${username}您好！您可以点击下面的链接设置新的密码,<span style="color:red">幽默的小强为您奉上</span></b>
    <a href=${url}>${url}</a>,<h2>测试功能，打扰之处抱歉</h2>` // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}