const express = require('express')
const app = express()
const port = 5000

//const pass = "arabian121"

app.get('/', (req, res) => {
  res.send('Hello World!')
})


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://arabian:arabian121@cluster0.4ft4b.mongodb.net/bruj-al-arab?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("bruj-al-arab").collection("booking");
//   console.log("Database Connection Succesfull");
//   //client.close();
// });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})