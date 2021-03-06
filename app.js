var cons = require('consolidate');
var ejs = require('ejs')

var bodyParser = require('body-parser');          // todo: test POST
var methodOverride = require('method-override');  // todo: test PUT, DELETE
var multer = require('multer');                   // todo: test multipart POST
var cookieParser = require('cookie-parser');      // check req.cookies
var morgan = require('morgan');   
var favicon = require('serve-favicon');
var compression = require('compression');
var errorhandler = require('errorhandler');
var cors = require('cors');

var uploads = multer({ dest: 'public/uploads' }); // todo: test upload files
var express = require('express');

var app = express();

app.engine('ejs', cons.ejs);                              // match view engine to file extension

app.set('views', __dirname + '/views');                   // set views dir
app.set('view engine', 'ejs');                            // set template engine

app.use(cors());                                          // allow cross origin requests
app.use(favicon(__dirname + '/public/favicon.ico'));      // serve favicon
app.use(express.static(__dirname + '/public'));           // serve static assets
app.use(bodyParser.json());                               // body parser, for POST request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());                                // allow PUT and DELETE
app.use(cookieParser());                                  // populate req.cookies
app.use(morgan('dev'));                                   // log requests
app.use(compression());
app.use(errorhandler());

app.get('/', function(req, res){
  res.render('main', {
    ejs: ejs
  })
});

app.get('/components', function(req, res){
  res.render('components')
});

app.post('/post', function( req, res ){
  console.log( req.body );
  res.json({ result: true });
})

app.listen(3002, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});