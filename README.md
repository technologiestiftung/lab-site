
# Website of the Ideation & Prototyping Lab @technologiestiftung Berlin

[![Build Status](https://travis-ci.org/technologiestiftung/lab-site.svg?branch=master)](https://travis-ci.org/technologiestiftung/lab-site)

## Table Of Contents

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Website of the Ideation & Prototyping Lab @technologiestiftung Berlin](#website-of-the-ideation--prototyping-lab-technologiestiftung-berlin)
  - [Table Of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Setup Jekyll & Run Jekyll](#setup-jekyll--run-jekyll)
  - [How To](#how-to)
    - [Create a New Project](#create-a-new-project)
    - [Editing Content](#editing-content)
      - [Capture](#capture)
      - [Assign](#assign)
      - [Include](#include)
      - [Variables](#variables)
      - [HTML in [M↓]](#html-in-m%E2%86%93)
      - [Example Projects for Reference](#example-projects-for-reference)
    - [Project Assets](#project-assets)
      - [Images](#images)
      - [JS & CSS](#js--css)
  - [YAML Frontmatter](#yaml-frontmatter)
  - [Project Generator](#project-generator)
  - [Still Todos](#still-todos)
  - [Tools](#tools)
    - [VSCode](#vscode)
  - [License](#license)

<!-- /code_chunk_output -->


## Prerequisites

- Node.js (install it using [nodenv →](https://github.com/nodenv/nodenv))
- Jekyll
  - Non admin computers you need to change the ruby `.gem` folder location `echo "export GEM_HOME=${HOME}.gem" >> .bash_profile`
  - Admin computers can install [Ruby Version Manager (rvm) →](https://rvm.io)
    - needs `gpg` in `$PATH`: `brew install gpg`

## Setup Jekyll & Run Jekyll

**!Note:** This assumes you have Node.js installed with `nodenv` and node version 10.15.0 is installed (`nodenv install 10.15.0`).

```bash
cd /path/to/lab-site/
# only needed once
npm install && cd project-generator && npm install
cd ..
bundle install
# whenever you want to run Jekyll
bundle exec jekyll server --livereload
# or use
npm run jekyll
```

## How To

### Create a New Project

To just create a new article/project you can either,

- copy one of the existing folders
- give it a new name (no whitespace and special characters please 🙏)
- adjust all the variables in the frontmatter of the files
  - `source/projects/<YOUR NEW PROJECT>/de/index.[html|md]`
  - `source/projects/<YOUR NEW PROJECT>/en/index.[html|md]`
- make sure your Markup is right
- push it to the remote repo (the build will be done automagically)

Or you can use the project generate. (See infos in section **Project Generator**).

### Editing Content

When writing simple markdown all the text will be

- in one single column
- images will have no caption
- images will span the column

If you want a specialized layout you can use the macros included in `source/_includes`

- macro-blockqoute-section.html
- macro-code-snippet.html
- macro-image-column.html
- macro-image-section-markdown.html
- macro-image-section.html
- macro-image.html
- macro-link.html
- macro-navigation-item.html
- macro-text-column.html
- macro-text.html


The most common one will be the `macro-image-section-markdown.html` (if you write [M↓]). The usage would look like this.

```html
{% include macro-image-section-markdown.html src="../images/cat.png" caption="Here is a picture of a cat" %}
```

If you locate your images in the `images` folder you can use relativ urls.

**!Hint:** The images used in the frontmatter should have absolut paths with the folder `source` as the root project folder. They are used on other pages as well.

---

Below is a table of all the parameters you can give to them.

| name                              | parm1 | parm2   | parm3  | param4   |
| :-------------------------------- | :---- | :------ | :----- | :------- |
| macro-text.html                   | text  | --      | --     | --       |
| macro-text-column.html            | title | text    | --     | --       |
| macro-image-section-markdown.html | src   | caption | --     | --       |
| macro-image-section.html          | src   | caption | --     | --       |
| macro-blockqoute-section.html     | text  | info    | --     | --       |
| macro-blockqoute-section-markdown.html     | text  | info    | --     | --       |
| macro-code-snippet.html           | code  | --      | --     | --       |
| macro-image-column.html\*         | title | text    | images | reversed |
| macro-image.html                  | src   | alt     | --     | --       |
| macro-link.html                   | href  | text    | type   | --       |

\* the image column accepts html markup as the `images` content. Should be used in conjunction with macro-image.html

For some of these macros you will need to use the Jekyll templating syntax called liquid. See the shopifys wiki [Liquid for Designers](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers) for a in depth reference.

In our macros you will use three different syntax constructs. capture, assign and include.

#### Capture

TO capture some content for later use you insert this syntax.

```plain
{%  capture variable  %}code{%  endcapture  %}
```

In use it is like this:

```html
{% capture myvaribale %}
This is some captured content. It will be stored in the variable "myvaribale".
{% endcapture %}
<!-- now use this later on -->
{% include macro-text.html text=myvaribale -%}

```

#### Assign

Assign also creates a variable. The difference is that you assign it directly to the variable and don't capture longer blocks.

```html
{% assign myvariable = "This is the content of myvariable" %}
<!-- later on you can use this variable -->
This is some random text with a inserted variable --> {{myvariable}}
<!-- or you use the variable on an include -->
{% include macro-text.html text=myvaribale -%}

```

#### Include

The include looks in the folder `source/_include` for the file that should be included and expands its content during site generation.

```html
{% include snippet.extension param1="foo" param2="bah" %}
```

#### Variables

Additionally all values in the frontmatter are available as `page.variables`.

You can use them like this:

```html
This is the title {{page.title}} this is the language {{page.lang}}
```

Of course you can add your own variables.



#### HTML in [M↓]

You can mix [M↓] with HTML, just make sure you don't mix block level markup. E.g. This wont work!

```html
Dies ist ein Typoblindtext.<div>someHTML</div>
```

This will work:

```html
Dies ist ein Typoblindtext.

<div>someHTML</div>
```

#### Example Projects for Reference

To see how all if this is used to to the example projects source `source/projects/example-html-project/en/index.html`.

If your Jekyll development server is running you can go to these URLs

- **HTML EN:** [http://localhost:4000/projects/example-html-project/en/](http://localhost:4000/projects/example-html-project/en/)
- **HTML DE:** [http://localhost:4000/projects/example-html-project/de/](http://localhost:4000/projects/example-html-project/de/)
- **[M↓] EN:** [http://localhost:4000/projects/example-md-project/en/](http://localhost:4000/projects/example-md-project/en/)
- **[M↓] DE:** [http://localhost:4000/projects/example-md-project/de/](http://localhost:4000/projects/example-md-project/de/)

### Project Assets

#### Images

Within your project folder you can add all your projects assets. There are some files that are required.

| Description    | width in PX | height in PX | comment |
| :------------- | :---------- | :----------- | :------ |
| Hero image     | 2400          | 1400           | --      |
| Thumbnail      | 600         | 600          | --      |
| Featured image | --          | --           | --      |

#### JS & CSS

You can have additional JS and CSS files for your project. Add them to the frontmatter in the `assets` section and they will be included in the head of your project.

**!Hint:** To make sure your JS executes when the full document is loaded execute it in this event listener.

```js
document.addEventListener('DOMContentLoaded',function() {
// your code goes in here
});
```

## YAML Frontmatter

All variables for your project are located in the YAML frontmatter. You can see the current template for the frontmatter (with comments) [here →](project-generator/src/frontmatter.yml).

- A quick guide on yaml can be found [here →](https://learnxinyminutes.com/docs/yaml/)
- The whole specification for YAML is [here →](https://yaml.org/spec/1.2/spec.html)

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



## Still Todos

Write guides for:

- [x] setup Node.js (including `nodenv` without `sudo`)
- [x] setup Jekyll (including `rvm` without `sudo`)
- [x] build site locally
- [x] add and write article/project
- [x] minimal needed frontmatter for article/project
- [x] list of available includes/macros
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

## Tools

### VSCode

When using VSCode for writing you should install these extensions for a better writing experience.

****Name: Markdown Preview Enhanced****
****Id:**** shd101wyy.markdown-preview-enhanced
**Description:** Markdown Preview Enhanced ported to vscode
[VS Marketplace Link:](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced)

---

**Name: Markdown All in One**
**Id:** yzhang.markdown-all-in-one
**Description:** All you need to write Markdown (keyboard shortcuts, table of contents, auto preview and more)
[VS Marketplace Link:](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)

---

**Name: markdownlint**
**Id:** davidanson.vscode-markdownlint
**Description:** Markdown linting and style checking for Visual Studio Codevid Anson
[VS Marketplace Link:](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)


---

**Name: Jekyll Snippets**
**Id:** ginfuru.vscode-jekyll-snippets
**Description:** Jekyll snippets for Visual Studio Code
[VS Marketplace Link:](https://marketplace.visualstudio.com/items?itemName=ginfuru.vscode-jekyll-snippets)

---

**Name: Jekyll Syntax Support**
**Id:** ginfuru.ginfuru-vscode-jekyll-syntax
**Description:** Jekyll Syntax Highlighting for Visual Studio Code
[VS Marketplace Link:](https://marketplace.visualstudio.com/items?itemName=ginfuru.ginfuru-vscode-jekyll-syntax)

---

**Name: Spell Right**
**Id:** ban.spellright
**Description:** Multilingual, Offline and Lightweight Spellchecker
[VS Marketplace Link:](https://marketplace.visualstudio.com/items?itemName=ban.spellright)
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
