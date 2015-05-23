var express = require('express');
var app = express();
 
// Outputs: <p>I am using <strong>markdown</strong>.</p>
  
 // output = output.replace(/^\s*[\r\n]/gm, "");
app.use(express.static(__dirname));
app.listen(process.env.PORT || 3000);