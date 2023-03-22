
const express=require('express')
const connectDB=require('./DB/connect')
const tasks=require('./routes/tasks')
const app=express()


require('dotenv').config()

//app.use
app.use(express.static('./public'))
app.use(express.json())
app.use('/api/v1/tasks',tasks)

port=3000
const start=async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`server is listening on port ${port}...`))

    } catch (error) {
        console.log(error);
    }
}

start()