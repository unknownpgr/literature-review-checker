const express = require('express')
const path = require('path')
const d3 = require('d3')
const fs = require('fs')
const bodyParser = require('body-parser');

let csvFile = fs.readFileSync(path.join(__dirname, 'check.csv'), { encoding: 'utf-8' })
let csv = d3.csvParse(csvFile);
let len = csv.length;
let idx = 0;

let app = express()
app.use(bodyParser.text());

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')) })
app.get('/meta', (req, res) => res.send({ len, idx }))
app.get('/row/:row', (req, res) => {
  idx = req.params.row
  if (!("Related" in csv[idx])) csv[idx]["Related"] = false;
  res.send(csv[idx])
})
app.post('/update/:row/:related', (req, res) => {
  let rowNum = +req.params.row
  let related = req.params.related == 'true'
  csv[rowNum]['Related'] = related
  res.send('ok')
  let str = d3.csvFormat(csv)
  fs.promises.writeFile(path.join(__dirname, 'check.csv'), str)
})

app.listen(8090, () => console.log('started'))