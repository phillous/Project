require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const cookieParser = require('cookie-parser')


const mainRouter = require('./router/main')



const app = express();
app.use('/public',express.static(__dirname + '/public'))
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(cookieParser());

const port = process.env.PORT || 5100;


app.use('/', mainRouter);

const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI)
        console.log('DataBase connected')
        app.listen(port, ()=> console.log(`Server listening to port ${port}`))
    }catch(err){
        return err
    }    
}

start();


