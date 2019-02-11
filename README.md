
# Website of the Ideation & Prototyping Lab @technologiestiftung Berlin

[![Build Status](https://travis-ci.org/technologiestiftung/lab-site.svg?branch=master)](https://travis-ci.org/technologiestiftung/lab-site)

## Prerequisites

- node
- Jekyll

## How To

tbd soon-ish…

## Project Generator

Run `npm run new-project` To get this help.
To pass arguments to it use the dash dash whitspace `npm run new-project -- ` and then your arguments.


```plain
> ./project-generator/bin/run --help

Generate a new project for @technologiestiftung

USAGE
  $ project-generator [TITLE]

ARGUMENTS
  TITLE  The folder for the new project. (Whitspace will be replaced uppercase as well)

OPTIONS
  -f, --force         💀 force the overwrite of existing files.
  -h, --help          show CLI help

  -p, --prompt        Use the interactive prompt to fill the yaml frontmatter
                      (if not used a default will be inserted)

  -t, --type=md|html  [default: md] the type of project possible "md" or "html"

  -v, --version       show CLI version

DESCRIPTION
  When you run this from a npm-scripts in our project
  you have to add `--` to execute the commands. E.g.

       Call the help:
       $ npm run new-project -- --help

       Or generate a new project with HTML files under
       /source/projects/my-cool-project/…
       with the default frontmatter:
       $ npm run new-project -- "my cool project" -t html

       Or start the interactive prompt for generating your yaml frontmatter
       $ npm run new-project -- -p
       ________________________________
                < wooohoo o/ >
       --------------------------------
```

## Todos

Write guides for:

- [ ] setup Node.js (including `nodenv` without `sudo`)
- [ ] setup Jekyll (including `rvm` without `sudo`)
- [ ] build site locally
- [ ] add and write article/project
- [ ] minimal needed frontmatter for article/project
- [ ] list of available includes/macros
- [x] minimal tool for scaffolding a new project/article


Still to implement:

- [x] projects feed (same as the feed on the landing page but all of them)
- [x] make feed an _include
- [ ] fix language switcher
- [x] image macro/slider
- [x] Dataset pages is located somewhere else
- [x] compare project detail markup
- [x] check project frontmatter key values pairs
- [x] review website.json which data we need available
- [ ] make timeline a separate js file only included in landing page and project feed
- [ ] review if parcel is the right thing for use
- [ ] review if we need auto-prefixer


## License

Copyright (c) 2019 Technologiestiftung Berlin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
