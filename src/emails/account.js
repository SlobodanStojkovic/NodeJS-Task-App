//also we need to npm install library for sending emails depending the service we choose and require it here
// replace email service with selected library and adjust code for it
/* 
const emailService = require("emailService");

emailsAPIKey.setApiKey(process.env.SEND_EMAILS_API_KEY);

const sendWelcomeEmail = (email, name) => {
  emailService.send({
    to: email,
    from: "ouremail@gmail.com",
    subject: "Welcome to our app",
    text: `Welcome ${name} to our app. Let us know how you get along with the app.`,
    //html: "we can also use html here for message"
  });
};

const sendCancelationEmail = (email, name) => {
  emailService.send({
    to: email,
    from: "ouremail@gmail.com",
    subject: "Sorry to see you go!",
    text: `Goodbye, ${name}. We hope to see you back sometime soon.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
 */