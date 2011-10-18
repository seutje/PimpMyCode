/**
 * Module dependencies.
 */

var express = require('express')
  , form = require('connect-form')
  , app = module.exports = express.createServer(form({ keepExtensions: true }))
  , uglify = require('uglify-js')
  , jsp = uglify.parser
  , pro = uglify.uglify
  , fs = require('fs');

app.get('/upload', function(req, res) {
  res.send('<form method="post" enctype="multipart/form-data">'
      + '<p>File: <input type="file" name="file" /></p>'
      + '<p><input type="submit" value="Upload" /></p>'
      + '</form>');
});

app.post('/upload', function(req, res, next) {

  // connect-form adds the req.form object
  // we can (optionally) define onComplete, passing
  // the exception (if any) fields parsed, and files parsed
  req.form.complete(function(err, fields, files) {
    if (err) {
      next(err);
    } else {
      console.log('\nuploaded %s to %s', files.file.filename, files.file.path);

      var orig_code = fs.readFileSync(files.file.path, 'utf-8');

      var ast = jsp.parse(orig_code); // parse code and get the initial AST
      ast = pro.ast_mangle(ast); // get a new AST with mangled names
      ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
      var final_code = pro.gen_code(ast); // compressed code here

      /*
       * other options in https://github.com/mishoo/UglifyJS
       */
      res.charset = 'utf-8';
      res.contentType(files.file.path);
      res.send(final_code); // now this sends the final code to screen
    }
  });

  // We can add listeners for several form
  // events such as "progress"
  req.form.on('progress', function(bytesReceived, bytesExpected) {
    var percent = (bytesReceived / bytesExpected * 100) | 0;
    process.stdout.write('Uploading: %' + percent + '\r');
  });
});


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
