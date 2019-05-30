var express = require('express'),
	app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	// res.send('GİRİŞ SAYFASI');
	res.render('index');
});

let port = process.env.PORT;
if (port == null || port == '') {
	port = 3000;
}
app.listen(port, () => {
	console.log('Server started on ' + port);
});
