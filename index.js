const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.listen(3000, () => console.log('Example app listening on port 3000'));

app.get('/blog', function(req, res) {
    res.render('blog');
});