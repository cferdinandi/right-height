# Right Height
Dynamically set content areas of different lengths to the same height.

[Download Right Height 3](https://github.com/cferdinandi/right-height/archive/master.zip) / [View the demo](http://cferdinandi.github.io/right-height/).

**In This Documentation**

1. [Getting Started](#getting-started)
2. [Installing with Package Managers](#installing-with-package-managers)
3. [Options & Settings](#options-and-settings)
4. [Browser Compatibility](#browser-compatibility)
5. [How to Contribute](#how-to-contribute)
6. [License](#license)
7. [Changelog](#changelog)
8. [Older Docs](#older-docs)



## Getting Started

### 1. Include Right Height on your site.

```html
<script src="js/right-height.js"></script>
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

```html
<script>
	rightHeight.init();
</script>
```

In the footer of your page, after the content, initialize Right Height. And that's it, you're done. Nice work!



## Installing with Package Managers

You can install Right Height with your favorite package manager.

* **NPM:** `npm install cferdinandi/right-height`
* **Bower:** `bower install https://github.com/cferdinandi/right-height.git`
* **Component:** `component install cferdinandi/right-height`



## Options and Settings

Right Height includes smart defaults and works right out of the box. But if you want to customize things, it also has a robust API that provides multiple ways for you to adjust the default options and settings.

### Global Settings

You can pass options and callbacks into Right Height through the `init()` function:

```javascript
rightHeight.init({
	callbackBefore: function ( container ) {}, // Function that runs before content height is adjusted
	callbackAfter: function ( container ) {} // Function that runs after content height is adjusted
});
```

### Use Right Height events in your own scripts

You can also call the Right Height adjust height function in your own scripts:

```javascript
rightHeight.adjustContainerHeight(
	container, // Node that contains the content areas. ex. document.querySelector('#content-wrapper')
	options // Callbacks. Same options as those passed into the init() function.
);
```

**Example**

```javascript
var container = document.querySelector('#container');
rightHeight.adjustContainerHeight( container );
```



## Browser Compatibility

Right Height works in all modern browsers, and IE 9 and above.

Right Height is built with modern JavaScript APIs, and uses progressive enhancement. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, content areas will render at their default heights.



## How to Contribute

In lieu of a formal style guide, take care to maintain the existing coding style. Don't forget to update the version number, the changelog (in the `readme.md` file), and when applicable, the documentation.



## License
Right Height is licensed under the [MIT License](http://gomakethings.com/mit/).



## Changelog

* v2.4.1 - June 19, 2014
	* Fixed factory/root/UMD definition.
* v2.4.0 - June 9, 2014
	* Converted to UMD module.
	* Moved public APIs to exports variable.
	* Improved feature test.
	* Replaced `Array.prototype.forEach` hack with proper `forEach` function.
	* General code optimizations for better minification and performance.
	* Updated to JSDoc documentation.
	* Updated to three number versioning system.
	* Added package manager installation info.
* v2.3 - March 19, 2014
	* Passed arguments into callback functions.
* v2.2 - February 28, 2014
	* Set initial resize to run once DOM content fully loaded (fixes setting of content to 0px high bug).
* v2.1 - February 27, 2014
	* Converted `defaults` to a literal object
* v2.0 - February 24, 2014
	* Better public/private method namespacing.
	* Require `init()` call to run.
	* New API exposes additional methods for use in your own scripts.
	* Better documentation.
* v1.1 - February 16, 2014
	* Added `style.minHeight` setting to reset to get more accurate height measurement and allow for fallback height on non-supporting browsers.
* v1.0 - Feburary 16, 2014
	* Initial production-ready release.
* v0.2 - February 16, 2014
	* Added window resize listener
	* Work in Progress
* v0.1 - February 16, 2014
	* Initial release: Work in Progress



## Older Docs

* [Version 1](http://cferdinandi.github.io/right-height/archive/v1/)