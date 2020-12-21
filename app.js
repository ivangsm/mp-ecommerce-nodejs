var express = require('express');
var exphbs = require('express-handlebars');
const mercadopago = require('mercadopago');
var port = process.env.PORT || 3000;

var app = express();

mercadopago.configure({
    access_token:
        'APP_USR-1159009372558727-072921-8d0b9980c7494985a5abd19fbe921a3d-617633181',
});

let preference = {
    items: [
        {
            title: 'Mi producto',
            unit_price: 100,
            quantity: 1,
        },
    ],
};

mercadopago.preferences
    .create(preference)
    .then(function (response) {
        // Este valor reemplazará el string "<%= global.id %>" en tu HTML
        global.id = response.body.id;
    })
    .catch(function (error) {
        console.log(error);
    });

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));

app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.listen(port);
