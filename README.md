#PimpMyCode is a [UglifyJS](https://github.com/mishoo/UglifyJS "UglifyJS Github Page") parser.

##Options

Options are simple:

- **beautify** expands the code, instead of uglyfying it.
- **unsafe** turns on some compressions that would occasionaly break the code
- **lift vars** merge and move var declarations to the scop of the scope
- **inline_script** escapes </script> parts in the code

##What is unsafe:

```Javascript
obj.toString() // => obj+""
new Array(1, 2, 3, 4) // => [1,2,3,4]
```

##What should I do?

You can serve your own node service (check the nodeServices folder) and the page is up to you

## PLEASE!

Don't abuse my webservice, I pay too low on my VPS that I can't handle a heavy use of this *experiment*.

## License is WTFPL

### Restricted to UglifyJS's license