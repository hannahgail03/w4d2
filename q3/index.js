const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "view"));

app.use(session({secret: 'test secret!#'}));
app.use(express.json());
app.use('/js', express.static(path.join(__dirname, 'view', 'js')));

// Simulated DB
let productsDB = {
    0: {
        name: 'product 1',
        price: 1
    },
    1: {
        name: 'product 2',
        price: 2
    },
    2: {
        name: 'product 3',
        price: 3
    }
};

app.get('/', (req, res) => {
    res.redirect(303, '/cart');
});

app.get('/cart', (req, res) => {
    const products = req.session.cart ? req.session.cart : {};
    res.render('shoppingcart', { products: products });
});

app.post('/addToCart', (req, res) => {
    const cart = req.session.cart ? req.session.cart : {};
    let pid = parseInt(req.body.id);
    let name = req.body.name;
    let price = parseInt(req.body.price);
    let quantity = parseInt(req.body.qty);
    let prodNum=pid+1;

    if (!cart[pid]) {
        cart[pid] = {
            quantity: 0
        };
    }

    cart[pid].name = name;
    cart[pid].price = price;
    cart[pid].quantity += quantity;
    req.session.cart = cart;
    req.session.prodNum=prodNum;
    res.end();
});

app.get('/product', (req, res) => {
    if (!(req.query.pid in productsDB)) {
        // TODO: Proper error page
        res.send('Error: product not in store. <a href=\'/\'>Back to cart</a>');
    }
    const product = productsDB[req.query.pid];
    res.render('product', {
        id: req.query.pid,
        name: product.name,
        price: product.price
    });
});

app.get('/productsNo', (req, res) => {
    let count = 0;
    if (req.session.cart) {
        for (let pid in req.session.cart) {
            count += req.session.cart[pid].quantity;
        }
    }
    res.send('' + count);
});

app.listen(3000);
