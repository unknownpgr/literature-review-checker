const express = require('express')
const path = require('path')
const d3 = require('d3')
const fs = require('fs')

let csvFile = fs.readFileSync(path.join(__dirname, 'converted.csv'), { encoding: 'utf-8' })
let csv = d3.csvParse(csvFile);
let len = csv.length;

let app = express()

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')) })
app.get('/meta', (req, res) => res.send({ len }))
app.get('/data/:row', (req, res) => {
  console.log(req.params)
  res.send(csv[req.params.row])
})

app.listen(8090, () => console.log('started'))