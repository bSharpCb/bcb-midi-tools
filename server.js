const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
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

app.listen(8080)