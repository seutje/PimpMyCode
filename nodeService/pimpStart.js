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

app.get('*', function(req, res) {
  console.log('* get');
  Error('not valid');
  res.status(400);
  res.send('error');
  return;
});

app.post('/', function(req, res, next) {
  console.log('* post');
  // connect-form adds the req.form object
  // we can (optionally) define onComplete, passing
  // the exception (if any) fields parsed, and files parsed
  req.form.complete(function(err, fields, files) {
    if (err) {
      next(err);
    } else {
      var orig_code = fields.toPimp || '';
      fields.uglifyopts = fields.uglifyopts || [];

      var options = {
        ast: false,
        mangle: true,
        mangle_toplevel: false,
        squeeze: true,
        make_seqs: true,
        dead_code: true,
        verbose: false,
        show_copyright: true,
        out_same_file: false,
        max_line_length: 32 * 1024,
        unsafe: false,
        reserved_names: null,
        defines: { },
        lift_vars: false,
        codegen_options: {
          ascii_only: false,
          beautify: false,
          indent_level: 4,
          indent_start: 0,
          quote_keys: false,
          space_colon: false,
          inline_script: false
        },
        make: false,
        output: true // stdout
      };

      options.codegen_options.beautify = (fields.uglifyopts.indexOf('beautify') >= 0);
      options.codegen_options.inline_script = (fields.uglifyopts.indexOf('inline') >= 0);
      options.lift_vars = (fields.uglifyopts.indexOf('lift') >= 0);
      options.unsafe = (fields.uglifyopts.indexOf('unsafe') >= 0);

      try {
        // parse code and get the initial AST
        var ast = jsp.parse(orig_code);
        
        // get a new AST with mangled names
        ast = pro.ast_mangle(ast);

        // get an AST with compression optimizations
        ast = pro.ast_squeeze(ast);

        // almost unsafe compress
        if (!options.codegen_options.beautify && options.unsafe) {
          ast = pro.ast_squeeze_more(ast);
        }

        // merge and move var declarations to the scop of the scope
        if (options.lift_vars) {
          ast = pro.ast_lift_variables(ast);
        }
        // compressed code here
        var final_code = pro.gen_code(ast, options.codegen_options);
      } catch (e) {
        Error('not valid');
        res.status(400);
        res.send('error: ' + e.message);
        return;
      }
      /*
       * other options in https://github.com/mishoo/UglifyJS
       */
      res.charset = 'utf-8';
      res.header('Content-Type', 'application/javascript');
      // now this sends the final code to screen
      res.send(final_code);
    }
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);