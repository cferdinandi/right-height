# Getting Started

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code.

<hr>

## Quick Start

### 1. Include Right Height on your site.

```markup
<script src="dist/js/right-height.js"></script>
```

### 2. Add the markup to your HTML.

```html
<div class="row" data-right-height>
	<div class="grid-third" data-right-height-content>
		Content 1
	</div>
	<div class="grid-third" data-right-height-content>
		Content 2
	</div>
	<div class="grid-third" data-right-height-content>
		Content 3
	</div>
</div>
```

Add the `[data-right-height]` data attribute to the wrapper div for your content areas. This let's Right Height adjust heights for different sections of content independently from each other.

Give each content area that you want Right Height to adjust a `[data-right-height-content]` data attribute.

*You can style your content areas (and their wrappers) however you see fit. The `.row` and `.grid-third` classes are used for demonstration purposes only.*

### 3. Initialize Right Height.

In the footer of your page, after the content, initialize Right Height. And that's it, you're done. Nice work!

```markup
<script>
	rightHeight.init();
</script>
```

<hr>


## Using a Package Manager or Module Bundler

Install Right Height with your favorite package manager or module bundler directly from NPM.

```bash
npm install right-height
```

<hr>


## Working with the Source Files

If you would prefer, you can work with the development code in the `src` directory using the included [Gulp build system](http://gulpjs.com/). This compiles, lints, and minifies code.

### Dependencies
Make sure these are installed first.

* [Node.js](http://nodejs.org)
* [Gulp](http://gulpjs.com) `sudo npm install -g gulp`

### Using Gulp

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install` to install required files.
3. When it's done installing, run one of the task runners to get going:
	* `gulp` manually compiles files.
	* `gulp watch` automatically compiles files when changes are made and applies changes using [LiveReload](http://livereload.com/).

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code.