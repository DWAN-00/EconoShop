var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static("views"));
app.use(express.static('static'));

// use res.render to load up an ejs view file
app.use(express.json())
// index page
/* router.get('/register',function(req,res,next) {
  var isOwner = authIsOwner(req,res);
  if(!isOwner){
    res.render('/login');
  }else{
    res.redirect('/');
  }
});  */

app.post('/register', function(req,res) {
  console.log(req.body);
  const { content } = req.body
  comments.push(content)
  console.log(comments);
  res.redirect('/')
});

// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});

app.listen(3000);
console.log('Server is listening on port 3000');