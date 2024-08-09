import nodemailer from "nodemailer"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"


export const sendEmail = async({email,emailType,userId}:any) => {
    try {
    const hashedToken = await bcryptjs.hash(userId.toString(),10);

    const htmlValue = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?taken=${hashedToken}">here</a> to ${emailType==="VERIFY"?"verify your email":"reset your password"} or copy and paste the below link in your browser </br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
    </p>`

        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId,{
              $set:{
                verifyToken:hashedToken,verifyTokenExpiry:Date.now() + 3600000}
        })
        }
        else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{$set:{forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now()+3600000}
        })
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user:process.env.NODEMAILERID ,
              pass:process.env.NODEMAILERPASS 
            }
          });

          const mailOptions = {
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', 
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? "Verify your email":"Reset your password",
            html: htmlValue, // html body
          };

          const mailResponse = await transporter.sendMail(mailOptions);
          return mailResponse;

    } catch (error:any) {
         throw new Error(error.message);
         
    }
}