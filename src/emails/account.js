const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'jjdmolano@gmail.com',
		subject: 'Welcome to the Task Manager app!',
		text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
	});
};

const sendCancellationEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'jjdmolano@gmail.com',
		subject: 'We\'re sad to see you go.',
		text: `Goodbye, ${name}. We'd love to know your reasons for cancelling your account. We hope to see you back!`
	});
};

module.exports = {
	sendWelcomeEmail,
    sendCancellationEmail
};
