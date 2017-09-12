'use strict';

const helper = require('sendgrid').mail,
      pug = require('pug'),
      path = require('path'),
      sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
      
module.exports = {
    photoShare : photoShare,
    welcome : welcome
};      

function photoShare(data, senderName){

  const from_email = new helper.Email("periscopeapp@gmail.com"),
        to_email = new helper.Email(data.destinationEmail),
        subject = senderName + " t'envoie une photo." ,
        content = new helper.Content('text/html', pug.renderFile(path.join(__dirname, './views/sharePhoto.pug'), {
          destinationName: data.destinationName,
          senderName: senderName,
          imageUrl: data.imageUrl,
          downloadUrl: data.downloadUrl,
          message: data.message
        })),
        mail = new helper.Mail(from_email, subject, to_email, content);

  const sendMail = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });

  sg.API(sendMail);

}

function welcome(destinationEmail, name){

  const from_email = new helper.Email("periscopeapp@gmail.com"),
        to_email = new helper.Email(destinationEmail),
        subject = "Bienvenue sur Periscope !" ,
        content = new helper.Content('text/html', pug.renderFile(path.join(__dirname, './views/welcome.pug'), {
          name : name
        })),
        mail = new helper.Mail(from_email, subject, to_email, content);

  const sendMail = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });

  sg.API(sendMail);

}