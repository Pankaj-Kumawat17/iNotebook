const {connectToMongo} = require('./db');
const express = require('express')
connectToMongo();

const app = express();
const port = 5000;
var cors = require('cors');
app.use(cors());
app.use(express.json());

//Available routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/notes', require('./routes/notes.js'));

app.get('/', (req, res) => {
  res.send('Hello Rashi!')
})



app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})