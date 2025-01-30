const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on("uncaughtException",(err)=>{
    console.log("UncaughtException. Shutting Down...");
    console.log(err)
    process.exit(1);
    
})

dotenv.config({
    path:'./config.env'
})

const app = require('./app');
mongoose.connect(process.env.DATABASE_LOCAL,{
    useNewUrlParser:true
}).then(con=>{
    console.log('DB Connection success');
}).catch(e=>{
    console.log(e);
});

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server started on port ${process.env.PORT}`)
})
process.on("unhandledRejection",err=>{
    console.log("Unhandled rejection. Shutting Down...");
    console.log(err)
    server.close(()=>{
        process.exit(1);
    });
})

