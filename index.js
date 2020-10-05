const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const { ObjectId } = require('mongodb')
const dotenv = require('dotenv').config() 

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4ft4b.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const itemCollection = client.db(process.env.DB_NAME).collection("items");
  const selectCollection = client.db(process.env.DB_NAME).collection("selections");

  app.post('/add',(req,res)=>{
    const data = req.body
    itemCollection.insertMany(data)
    .then(result =>{
      res.send(result.insertedCount)
    })
  })

  app.post('/addEvent',(req,res)=>{
    const data = req.body
    itemCollection.insertOne(data)
    .then(result =>{
      res.send(result.insertedCount>0)
    })
  })

  app.get('/allItems',(req, res)=>{
    itemCollection.find({})
    .toArray((err, document)=>{
      res.send(document)
    })    
  })

  app.post('/userDatas',(req, res)=>{
    const userData = req.body;    
    selectCollection.insertOne(userData)
    .then(result => {
      res.send(result)
    })   
  })

  app.get('/choiceCollection/:email',(req, res)=>{
    const {email} = req.params;
    selectCollection.find({email : email})
    .toArray((err, documents)=>{
      res.send(documents)
    })
  })

  app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    selectCollection.deleteOne({_id : ObjectId(id)})
    .then(result => {
      res.send(result.deletedCount > 0)
    })
  })

  app.get('/allVolunteerList',(req, res)=>{
    selectCollection.find()
    .toArray((err, document)=>{
      res.send(document)
    }) 
  })

  console.log("Database Connected Successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})