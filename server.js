// Setup
var express = require('express');
var app = express();

// Configuration
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
app.use(express.static(__dirname + '/'));

// Test routes
app.get('/', function(req, res){
  res.redirect('/index.html');
});
