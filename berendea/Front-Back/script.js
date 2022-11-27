import app from "./server.js";
import mongodb from "mongodb";
import ReviewsDAO from "./dao/reviewsDAO.js";

const MongoClient=mongodb.MongoClient;
const mongo_username=process.env['MONGO_USERNAME'];
const mongo_password=process.env['MONGO_PASSWORD'];
const uri=`mongodb+srv://adrian:haidesteaua23@cluster0.z2wt6ml.mongodb.net/test`;

const port=8000;

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
)

.catch(err=>{
    console.error(err.stack);
    process.exit(1);
})

.then(async client=>{
    ReviewsDAO.injectDB(client).then(()=>{
        app.listen(port, ()=>{
            console.log(`listening on port ${port}`);
        });
    })
})