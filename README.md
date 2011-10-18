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

### Restricted to UglifyJS BSD license

```
Copyright 2010 (c) Mihai Bazon <mihai.bazon@gmail.com>
Based on parse-js (http://marijn.haverbeke.nl/parse-js/).

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:

    * Redistributions of source code must retain the above
      copyright notice, this list of conditions and the following
      disclaimer.

    * Redistributions in binary form must reproduce the above
      copyright notice, this list of conditions and the following
      disclaimer in the documentation and/or other materials
      provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
SUCH DAMAGE.
```