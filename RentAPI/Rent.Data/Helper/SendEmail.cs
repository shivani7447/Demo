using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Rent.Data.Helper
{
   public static class SendEmail
    {
        public static bool SendForgotPasswordMail(string name, string email, string password)
        {
            bool result = true;
            try
            {
                MailMessage mailmsg = new MailMessage();
                mailmsg.From = new MailAddress("abc@gmail.com");
                mailmsg.Subject = "Password Detail:- Rent Management";
                mailmsg.IsBodyHtml = true;
                mailmsg.Body = "Dear " + name + ",";
                mailmsg.Body += "<br />";
                mailmsg.Body += "<br />On your request, the password of your account has been mentioned below:";
                mailmsg.Body += "<br />";
                mailmsg.Body += "<br />*********************************<br />";
                mailmsg.Body += "Email-Id : " + email + "<br />";
                mailmsg.Body += "<br />";
                mailmsg.Body += "Password: " + password + "<br />";
                mailmsg.Body += "<br />*********************************<br />";
                mailmsg.Body += "<br /><br />";
                mailmsg.Body += "Thanks & Regards,";
                mailmsg.Body += "<br />";
                mailmsg.Body += "System Administrator Rent Management";
                mailmsg.Body += "<br />";

                string mailTo = email;
                MailAddress addressTo = new MailAddress(mailTo);
                if (mailTo.Length > 0)
                {
                    mailmsg.To.Add(addressTo.ToString());
                    var smtpHost = "smtp.gmail.com";
                    var smtpPort = "587";
                    SmtpClient SmtpServer = new SmtpClient(smtpHost);
                    SmtpServer.UseDefaultCredentials = true;
                    SmtpServer.EnableSsl = true;
                    SmtpServer.Port = !string.IsNullOrEmpty(smtpPort) ? Convert.ToInt32(smtpPort) : 0;
                    //Please enter here user password
                    SmtpServer.Credentials = new NetworkCredential(mailmsg.From.Address, "abcPassword");
                    SmtpServer.Send(mailmsg);
                }
                return result;
            }
            catch (Exception ex)
            {
                return result = false;
            }
        }

        public static string GenerateRandomPassword()
        {
            int lengthOfPassword = 5;
            string valid = "abcdefghijklmnozABCDEFGHIJKLMNOZ1234567890";
            StringBuilder strB = new StringBuilder(100);
            Random random = new Random();
            while (0 < lengthOfPassword--)
            {
                strB.Append(valid[random.Next(valid.Length)]);
            }
            return strB.ToString();

        }
    }
}
