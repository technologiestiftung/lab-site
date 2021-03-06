# Website of the Ideation & Prototyping Lab @technologiestiftung Berlin

[![Build Status](https://travis-ci.org/technologiestiftung/lab-site.svg?branch=master)](https://travis-ci.org/technologiestiftung/lab-site) [![Netlify Status](https://api.netlify.com/api/v1/badges/d95d4572-9a48-4a6b-a4c3-5ed33451d030/deploy-status)](https://app.netlify.com/sites/tsb-labsite/deploys)

## Table Of Contents

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Website of the Ideation & Prototyping Lab @technologiestiftung Berlin](#website-of-the-ideation--prototyping-lab-technologiestiftung-berlin)
  - [Table Of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Setup & Develop](#setup--develop)
  - [How To](#how-to)
    - [Create a New Project](#create-a-new-project)
    - [Editing Content](#editing-content)
      - [Capture](#capture)
      - [Assign](#assign)
      - [Include](#include)
      - [Variables](#variables)
      - [HTML in [M⬇︎]](#html-in-m︎)
      - [Example Projects for Reference](#example-projects-for-reference)
    - [Project Assets](#project-assets)
      - [Images](#images)
      - [JS & CSS](#js--css)
  - [YAML Frontmatter](#yaml-frontmatter)
  - [RSS Feed](#rss-feed)
  - [Project Generator](#project-generator)
  - [Tools](#tools)
    - [VSCode](#vscode)
  - [License](#license)
  - [Support](#support)

<!-- /code_chunk_output -->

## Prerequisites

- Node.js (install it using [nvm](https://github.com/nvm-sh/nvm))
- Ruby (install it using [rbenv](https://github.com/rbenv/rbenv))

Make sure to add the needed code snippets for nvm and rbenv to your `.bash_profile` or `.zshrc`. You will also have to install [ruby-build](https://github.com/rbenv/ruby-build#readme) as a rbenv plugin.

<!-- Non admin computers you need to change the ruby `.gem` folder location

With bash, run:

```bash
echo "export GEM_HOME=${HOME}/.gem" >> "${HOME}/.bash_profile" &&\
echo "export PATH=${HOME}/.gem/bin:"'$PATH' >> "${HOME}/.bash_profile" &&\
source ~/.bash_profile
```


if you are using  zsh as shell use, run:

```bash
echo "export GEM_HOME=${HOME}/.gem" >> "${HOME}/.zshrc" &&\
echo "export PATH=${HOME}/.gem/bin:"'$PATH' >> "${HOME}/.zshrc" &&\
source ~/.zshrc
```

## Managing Ruby Versions

Admin computers can install [Ruby Version Manager (rvm) →](https://rvm.io). If you are not admin on your machine you can use [rbenv](https://github.com/rbenv/rbenv) with [ruby-build](https://github.com/rbenv/ruby-build).


- rvm needs `gpg` in `$PATH`: `brew install gpg`
- `rbenv` only needs git

### Ruby issues

If you are running into problems with ruby versions you can use rbenv to manage your ruby.

First of all you need to remove `rvm` if it installed.

Check if it is installed `rvm -v`. If get an output uninstall it.

```bash
rvm impolde
```

And don’t forget to remove the script calls in the following files:

- `~/.bashrc`
- `~/.bash_profile`
- `~/.profile`
- `~/.zshrc`

Taken [from here](https://stackoverflow.com/a/4747195).

Then install `rbenv` using the [Basic Git checkout](https://github.com/rbenv/rbenv/blob/master/README.md#basic-github-checkout).

1. clone it
2. add it to your `$PATH`
3. initialize it for your shell

Next you need to [install `ruby-build` as `rbenv` plugin](https://github.com/rbenv/ruby-build#installation)

```bash
mkdir -p "$(rbenv root)"/plugins
git clone https://github.com/rbenv/ruby-build.git "$(rbenv root)"/plugins/ruby-build
```

Now install the desired ruby version. E.g. v2.6.3 and set it as your global version.

```bash
rbenv install 2.6.3
rbenv global 2.6.3
```

Now you should have 2.6.3 as your default. Open a new terminal session and test it: `ruby -v`.



-->

## Setup & Develop

**!Note:** This assumes you have Node.js installed with `nvm` and Node.js lts (currently at 12.16.0) installed (`nvm install --lts`). To set a default run `nvm alias default v12.16.0`

```bash
cd /path/to/lab-site/
# only needed once
# install the ruby bundler tool
gem install bundler
# sometimes a specific version is required
# gem install bundler -v 1.17.2
# install all needed node.js dependencies
npm install && cd project-generator && npm install
# go back into the root
cd ..
# install all ruby gems for jekyll
bundle install


# now for each session
# whenever you want to run Jekyll
# run
bundle exec jekyll serve --livereload
# or even simpler
npm run jekyll
# to generate a new project run in a new session
npm run new
# now follow the prompt…

# if you want to develop in js and css use
npm run dev
# and in another session
npm run jekyll
```

If you run into problems with the eventmachine (incompatible library version) this might help, or not:

```
gem uninstall eventmachine
gem install eventmachine --platform ruby
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

Or even better you can use the project generate. (See infos in section **Project Generator**).

**!Hint:** When you already have existing HTML on the old site you can grap the source from the GitHub repo and convert it to **[M⬇︎]** using for example these online tools:

- [Turndown Demo Page](https://domchristie.github.io/turndown/)
- [Pandoc Demo Page](https://pandoc.org/try/?text=&from=html&to=markdown_strict)

There might be some leftovers within the **[M⬇︎]** that you need to remove manually.

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

The most common one will be the `macro-image-section-markdown.html` (if you write **[M⬇︎]**). The usage would look like this.

```html
{% include macro-image-section-markdown.html src="../images/cat.png"
caption="Here is a picture of a cat" %}
```

If you locate your images in the `images` folder you can use relativ urls.

**!Hint:** The images used in the frontmatter should have absolut paths with the folder `source` as the root project folder. They are used on other pages as well.

---

Below is a table of all the parameters you can give to them.

| name                                   | parm1 | parm2   | parm3  | param4   |
| :------------------------------------- | :---- | :------ | :----- | :------- |
| macro-text.html                        | text  | --      | --     | --       |
| macro-text-column.html                 | title | text    | --     | --       |
| macro-image-section-markdown.html      | src   | caption | --     | --       |
| macro-image-section.html               | src   | caption | --     | --       |
| macro-blockqoute-section.html          | text  | info    | --     | --       |
| macro-blockqoute-section-markdown.html | text  | info    | --     | --       |
| macro-code-snippet.html                | code  | --      | --     | --       |
| macro-image-column.html\*              | title | text    | images | reversed |
| macro-image.html                       | src   | alt     | --     | --       |
| macro-link.html                        | href  | text    | type   | --       |

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
{% capture myvaribale %} This is some captured content. It will be stored in the
variable "myvaribale". {% endcapture %}
<!-- now use this later on -->
{% include macro-text-column.html title="My Title" text=myvaribale -%}
```

#### Assign

Assign also creates a variable. The difference is that you assign it directly to the variable and don't capture longer blocks.

```html
{% assign myvariable = "This is the content of myvariable" %}
<!-- later on you can use this variable -->
This is some random text with a inserted variable --> {{myvariable}}
<!-- or you use the variable on an include -->
{% include macro-text-column.html title="My title" text=myvaribale -%}
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

#### HTML in [M⬇︎]

You can mix **[M⬇︎]** with HTML, just make sure you don't mix block level markup. E.g. This wont work!

```html
Dies ist ein Typoblindtext.
<div>someHTML</div>
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
- \***\*[M⬇︎]** EN:\*\* [http://localhost:4000/projects/example-md-project/en/](http://localhost:4000/projects/example-md-project/en/)
- \***\*[M⬇︎]** DE:\*\* [http://localhost:4000/projects/example-md-project/de/](http://localhost:4000/projects/example-md-project/de/)

### Project Assets

#### Images

Within your project folder you can add all your projects assets. There are some files that are required.

| Description    | width in PX | height in PX | comment                |
| :------------- | :---------- | :----------- | :--------------------- |
| Hero image     | 2400        | 1400         | --                     |
| Thumbnail      | 600         | 600          | --                     |
| Featured image | 2400        | 1800         | needs an alpha channel |

#### JS & CSS

You can have additional JS and CSS files for your project. Add them to the frontmatter in the `assets` section and they will be included in the head of your project.

**!Hint:** To make sure your JS executes when the [full document is loaded](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded) execute it in this event listener.

```js
document.addEventListener("DOMContentLoaded", function () {
  // your code goes in here
});
```

If you want to be super sure that everything is loaded you should use the [load event](https://developer.mozilla.org/en-US/docs/Web/Events/load):

```js
window.addEventListener("load", function (event) {
  // Your code here
});
```

## YAML Frontmatter

All variables for your project are located in the YAML frontmatter. You can see the current template for the frontmatter (with comments) [here →](project-generator/src/frontmatter.yml).

- A quick guide on yaml can be found [here →](https://learnxinyminutes.com/docs/yaml/)
- The whole specification for YAML is [here →](https://yaml.org/spec/1.2/spec.html)

## RSS Feed

There is an RSS Feed included for DE and EN content. If you want to add an excerpt to your post you can by adding a `<!--more-->` HTML comment to your text. If not the content of your text will we truncated at 50 words and is followed by an `…`

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

## Tools

### VSCode

When using VSCode for writing you should install these extensions for a better writing experience.

\***\*Name: Markdown Preview Enhanced\*\*** \***\*Id:\*\*** shd101wyy.markdown-preview-enhanced
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

## Support

We are part of BrowserStack's non-profit program, helping us deliver an even better user experience.

<a href="https://www.browserstack.com/">
  <img src="https://p14.zdusercontent.com/attachment/1015988/Hjnr3apa9OCplUi1GbaLiCVa7?token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..QA4hJSE7NQfMjFDK1w6tog.0-YOVfCRjxpeHUf5tjKutEEoQn-U5peEUgQ6ZxBZugOJrShlKGm0lCgAURhV9T8Y-dIiFS9xTpdJ0UVPzSL1k4ka4emU3lzjerjHwhHt3Yl65Fs3S4JUWOhHvmiiG9-C0DvY7PJAEpwtGMNf-auRy84MUiYSMIriQzwkTTBJ7rdm7laryRnCGntFYfhs_GgGK38QEk8ZUhmx6M45yPoGTYrwjFPN85D3YmUA1zsEYEYKpIYOE2zdWT38wtQ6yyNWFTi6GyVQZ-p8nXAGbE5ZQR8XlKU2CquvZurSDtFeWhM.BIRFSvq27MoywSgtua3tYw" height="100">
</a>

<!-- should have github and maybe netlify as well -->
