const express = require('express')
const path = require('path');

const app = express();
const port = 3000;
app.use(
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/"))
);
app.use(express.static(__dirname, { // host the whole directory
    extensions: ["html", "htm", "gif", "png"],
}))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

