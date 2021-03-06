'use strict';

const helper = require('sendgrid').mail,
      pug = require('pug'),
      path = require('path'),
      sg = require('sendgrid')(process.env.SENDGRID_API_KEY),
      premailer = require('premailer-api');
      
module.exports = {
    photoShare : photoShare,
    welcome : welcome,
    invite : invite
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
        }));

  premailer.prepare({html: content.value }, function(err, email) {
    if(err) console.log(err);
    
    const mail = new helper.Mail(from_email, subject, to_email, {type : 'text/html', value : email.html});
    
    const sendMail = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });
    
    sg.API(sendMail);
    
  });

}

function welcome(destinationEmail, name){

  const from_email = new helper.Email("periscopeapp@gmail.com"),
        to_email = new helper.Email(destinationEmail),
        subject = "Bienvenue sur Periscope !" ,
        content = new helper.Content('text/html', pug.renderFile(path.join(__dirname, './views/welcome.pug'), {
          name : name
        }));
        
  premailer.prepare({html: content.value }, function(err, email) {
    if(err) console.log(err);
    
    const mail = new helper.Mail(from_email, subject, to_email, {type : 'text/html', value : email.html});
    
    const sendMail = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });
    
    sg.API(sendMail);
    
  });
}

function invite(senderName, destinationName, destinationEmail, token){
  
  const from_email = new helper.Email("periscopeapp@gmail.com"),
        to_email = new helper.Email(destinationEmail),
        subject = senderName + " t'invite à rejoindre sa photothèque." ,
        content = new helper.Content('text/html', pug.renderFile(path.join(__dirname, './views/invite.pug'), {
          senderName : senderName,
          destinationName : destinationName,
          destinationLink : "https://periscope.herokuapp.com/signup/" + token + "/" + senderName + "/" + destinationName + "/" + destinationEmail
        }));

  premailer.prepare({html: content.value }, function(err, email) {
    if(err) console.log(err);
    
    const mail = new helper.Mail(from_email, subject, to_email, {type : 'text/html', value : email.html});
    
    const sendMail = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });
    
    sg.API(sendMail);
    
  });
  
}