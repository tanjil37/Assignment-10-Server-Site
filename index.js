const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World hi!')
})
app.get('/hello', (req, res) => {
  res.send('Hello are you?')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
