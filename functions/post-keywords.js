import fetch from 'node-fetch';

const API_ENDPOINT = 'https://api.openai.com/v1/completions';

exports.handler = async function (event, context) {
	const data = JSON.parse(event.body);
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
		},
		body: JSON.stringify({
			model: 'text-davinci-003',
			prompt: 'Extract keywords from this text. Make the first letter of each word uppercase and separate with commas\n\n' + data.text + '',
			temperature: 0.5,
			max_tokens: 60,
			frequency_penalty: 0.8
		})
	};
	try {
		const response = await fetch(API_ENDPOINT, options);
		const data = await response.json();
		return { statusCode: 200, body: JSON.stringify({ data }) };
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: 'Failed fetching data' })
		};
	}
};
