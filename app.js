const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const ejs = require('ejs');

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/"))
);


app.get('/', (req, res) => {
    res.render('index.ejs')
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

