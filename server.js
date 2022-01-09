const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/transcribe', (req, res) => {
    res.render('transcribe')
})

app.get('/chords', (req, res) => {
    res.render('chords')
})

app.get('/lesson1', (req, res) => {
    res.render('lesson1')
})

app.get('/flashnotes', (req, res) => {
    res.render('flashnotes')
})

app.get('/blog', (req, res) => {
    res.render('blog')
})

app.listen(PORT, () => console.log(`Server listening in port ${PORT}`))