import sirv from 'sirv';
import compression from 'compression';
import * as sapper from '@sapper/server';
const bodyparser = require('body-parser');
const express = require('express');

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

express() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		bodyparser.json(),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
