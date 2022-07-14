import smtplib
import mimetypes
from email.mime.multipart import MIMEMultipart
from email import encoders
from email.message import Message
from email.mime.audio import MIMEAudio
from email.mime.base import MIMEBase
from email.mime.image import MIMEImage
from email.mime.text import MIMEText




host = "10.70.12.101:25"
server = smtplib.SMTP(host)
FROM = "saswarningmessage@sas.com"
TO = "samuellin@dawningtech.com.tw"

fileToSend = "123.csv"

text="From sas warning message!"
msg = MIMEMultipart()
msg["From"] = FROM
msg["To"] = TO
msg["Subject"] = "SAS Message"
msg.preamble = "SAS Message"
msg.attach(MIMEText(text, 'plain'))


ctype, encoding = mimetypes.guess_type(fileToSend)
if ctype is None or encoding is not None:
    ctype = "application/octet-stream"

maintype, subtype = ctype.split("/", 1)

if maintype == "text":
    fp = open(fileToSend)
    # Note: we should handle calculating the charset
    attachment = MIMEText(fp.read(), _subtype=subtype)
    fp.close()
elif maintype == "image":
    fp = open(fileToSend, "rb")
    attachment = MIMEImage(fp.read(), _subtype=subtype)
    fp.close()
elif maintype == "audio":
    fp = open(fileToSend, "rb")
    attachment = MIMEAudio(fp.read(), _subtype=subtype)
    fp.close()
else:
    fp = open(fileToSend, "rb")
    attachment = MIMEBase(maintype, subtype)
    attachment.set_payload(fp.read())
    fp.close()
    encoders.encode_base64(attachment)
attachment.add_header("Content-Disposition", "attachment", filename=fileToSend)
msg.attach(attachment)




server = smtplib.SMTP(host)


server.sendmail(FROM, TO, msg.as_string())
server.quit()


print ("Email Send")