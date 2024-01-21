const express=require('express')
const cors=require('cors')

const app=express()


const port= process.env.PORT || 5000;
app.use(cors())

app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://Bigfeetzy:molcwe4ng7CJNLk8@cluster0.ravtcpm.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(`Pinged your deployment. You successfully connected to MongoDB! on port ${port}`);

    const db=client.db("BigFeetzy");
    const productCollection=db.collection("Products");

    app.post("/products",async (req,res)=>{

    const body=req.body
    console.log(body)
    const result = await productCollection.insertOne(body)
    res.send();


    })

    app.get("/products",async (req,res)=>{

      const result=await productCollection.find({}).toArray()
      res.send(result)

    })

    app.delete("/products/:id",async (req,res)=>{

      const id=req.params.id
      const item={_id:new ObjectId(id)}

      const result= await productCollection.deleteOne(item)

      res.send()
      console.log(id)

    })







  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);
app.get('/',(req,res)=>{
  res.send("simple crud is running")
})
app.listen(port,()=>{
  console.log('server is running on port 5000')
})
