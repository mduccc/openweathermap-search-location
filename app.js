const express = require('express')
const app = express()
const fs = require('fs')
const port = 2100

app.listen(port, ()=> {
    console.log('API running on port ' + port)
})

app.use('/', (req, res, next) => {
    next()
})

app.use('/location', (req, res, next) => {
    next()
})

app.get('/', (req, res) => {
    res.write('Hello')
    res.end()
})

app.get('/location', async (req, res) => {
    let key_word_raw = req.query.key_word
    let key_word_trim = ''

    let result = []
    let code = 404

    if (typeof key_word_raw == 'undefined' || key_word_raw.trim().length == 0) {
        res.json({
            code: code,
            key_word: key_word_trim,
            result: result
        })
        res.end()
        return 1
    }

    key_word_raw = key_word_raw.trim()

    // trim space between two word
    let count_space = 0
    for (let i = 0; i < key_word_raw.length; i++) {
        if (key_word_raw[i] == ' ')
            count_space++
        else
            count_space = 0

        if (count_space < 2)
            key_word_trim += key_word_raw[i]
    }

    console.log('Trim keyword: ', key_word_trim)

    await fs.readFile('./city/city.list.json', (err, json) => {
        let obj = JSON.parse(json)

        for (let i=0; i<obj.length; i++) {
            if (obj[i].name.toLowerCase().search(key_word_trim.toLowerCase()) > -1) 
                result.push(obj[i])
        }

        if (result.length != 0) 
            code = 200

        res.json({
            code: code,
            key_word: key_word_trim,
            result: result
        })
        res.end
    })
    
})