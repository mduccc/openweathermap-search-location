require('dotenv')
require('express')
const express = require('express')
const app = express()
const port = 3200
const fs = require('fs')

app.listen(port, () => {
    console.log('API running on port ' + port)
})

let datas = []
let rows = fs.readFileSync('./dataset.txt', 'utf8').split('\n')
rows.forEach(value => {
    let column = value.split(',')
    datas.push(column)
})

let dataConverted = []
let maxCollum = 0
datas.forEach(row => {
    if (maxCollum < row.length)
        maxCollum = row.length
})

datas.forEach(row => {
    let temp = []
    for (let i = 0; i < maxCollum; i++) {
        if (row[i] === undefined)
            temp.push('?')
        else
            temp.push(row[i])
    }
    dataConverted.push(temp)
})
console.log(dataConverted)

let content = ''

dataConverted.forEach(row => {
    let temp = ''
    row.forEach(column => {
        temp += column + ','
    })
    temp = temp.substring(0, temp.length - 1)
    content += temp + '\n'
})

console.log(content)

fs.writeFileSync('./dataset_converted.csv', 'col-1, col-2, col-3, col-4, col-5, col-6, col-7, col-8, col-9, col-10\n' + content)