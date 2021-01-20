const express = require ("express");
const bodyParser = require ("body-parser");
const ejs = require ("ejs");
const mongoose = require ("mongoose");
// const { urlencoded } = require("body-parser");

const app= express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/restapiDB", {useNewUrlParser: true});

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

///////////////////////////////////WORKING ON ALL THE ARTICLES////////////////////////////////

// //-----------------------------------------------------------------
// //GET ALL THE ARTICLES
// app.get("/articles", (req,res)=>{
//     //Article.find({conditions},function(err, foundArticles){})
//     Article.find(function(err, foundArticles){
//         if(!err){
//         res.send(foundArticles);
//         }
//         else{
//             res.send(err);
//         }
//     });
// });
// //-----------------------------------------------------------------
// //POST ONE NEW ARTICLES 
// app.post("/articles",(req,res)=>{
//     // console.log(req.body.title); 
//     // console.log(req.body.content);

//     const newArticle = new Article({
//         title: req.body.title,
//         content: req.body.content
//     });
//     newArticle.save(function(err){
//         if(!err){
//             res.send("Successfully send a new article");
//         }
//         else{
//             res.send(err);
//         }
//     });
// });
// //-----------------------------------------------------------------
// //DELETE ALL THE ARTICLES
// app.delete("/articles",(req,res)=>{
//         //Article.deleteMany({condiions}, function(err){ });
//         Article.deleteMany(function(err){
//             if(!err){
//                 res.send("successfully deleted");
//             }
//             else{
//                 res.send(err);
//             }
//         });
//     });
// //-----------------------------------------------------------------
//GET,POST,DELETE by using route

app.route("/articles")

.get((req,res)=>{
    //Article.find({conditions},function(err, foundArticles){})
    Article.find(function(err, foundArticles){
        if(!err){
        res.send(foundArticles);
        }
        else{
            res.send(err);
        }
    });
})

.post((req,res)=>{
    // console.log(req.body.title); 
    // console.log(req.body.content);

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save(function(err){
        if(!err){
            res.send("Successfully send a new article");
        }
        else{
            res.send(err);
        }
    });
})

.delete((req,res)=>{
    //Article.deleteMany({condiions}, function(err){ });
    Article.deleteMany(function(err){
        if(!err){
            res.send("successfully deleted");
        }
        else{
            res.send(err);
        }
    });
});
//-----------------------------------------------------------------

///////////////////////////////////WORKING ON SPECIFIC ARTICLES////////////////////////////////
//GET SPECIFIC
app.route("/articles/:articleTitle")

.get((req,res)=>{
    Article.findOne({title: req.params.articleTitle},    
    function(err, foundArticle){ 
        if(foundArticle){
            res.send(foundArticle);
        }
        else{
            res.send(err);
        }
    });   
});
//-----------------------------------------------------------------

//PUT SPECIFIC
// ModelName.update({conditions},{updates},{overwrite: true}, functions(err,results));
app.route("/articles/:articleTitle")
.put((req,res)=>{
    Article.update( 
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        {overwrite: true},
        function(err){
            if(!err){
               res.send("Successfully updated"); 
            }
        }
        );
});


//----------Listening ports--------------
app.listen(3000, function(){
    console.log("Server started on port 3000");
});