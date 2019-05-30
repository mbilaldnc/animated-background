var express = require('express'),
	app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
	// res.send('GİRİŞ SAYFASI');
	res.sendFile(__dirname + '/views/index.html');
});

let port = process.env.PORT;
if (port == null || port == '') {
	port = 3000;
}
app.listen(port, () => {
	console.log('Server started on ' + port);
});
