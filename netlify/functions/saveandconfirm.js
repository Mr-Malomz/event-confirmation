import fetch from 'node-fetch';

exports.handler = async function (event, context, callback) {
	let bodyRequest = JSON.parse(event.body);
	const body = {
		name: bodyRequest.name,
		email: bodyRequest.email,
	};

	// //save user on the database
	// await fetch(`${process.env.XATA_URL}:main/tables/confirmed/data`, {
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 		Authorization: `Bearer ${process.env.XATA_API_KEY}`,
	// 	},
	// 	body: JSON.stringify(body),
	// });

	//send confirmation email
	await fetch(`${process.env.URL}/.netlify/functions/emails/confirmed`, {
		headers: {
			'netlify-emails-secret': process.env.NETLIFY_EMAILS_SECRET,
		},
		method: 'POST',
		body: JSON.stringify({
			from: process.env.SEND_FROM_EMAIL,
			to: body.email,
			subject: "You've been confirmed!",
			parameters: {
				name: body.name,
			},
		}),
	});

	return {
		statusCode: 200,
		body: JSON.stringify({ data: 'Email confirmation sent successfully!' }),
	};
};
