const express      = require('express');
const app          = express();
const path         = require('path');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const nunjucks     = require('nunjucks');
const routes       = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

nunjucks.configure('views', {
	autoescape: true,
	express: app
});

app.set('views', './views');
app.use('/static', express.static(path.resolve('static')));
app.use(routes());
app.all('*', (req, res) => {
	return res.status(404).send({
		message: '404 page not found'
	});
});

(async () => {
	app.listen(80, '0.0.0.0', () => console.log('Listening on http://127.0.0.1/'));
})();