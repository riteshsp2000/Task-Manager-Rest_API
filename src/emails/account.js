const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
sgMail.send({
  to: email,
  from: 'ritesh@gmail.com',
  subject: 'Welcome to the task-manager app',
  text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
})
}

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'ritesh@gmail.com',
    subject: 'Sorry to see you go.',
    text: `Goodbye, ${name}. I hope to see you back sometime soon.`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail
}