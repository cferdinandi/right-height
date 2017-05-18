# Options and Settings

Right Height includes smart defaults and works right out of the box. But if you want to customize things, it also has a robust API that provides multiple ways for you to adjust the default options and settings.

<hr>

## Global Settings

You can pass options and callbacks into Right Height through the `init()` function:

```javascript
rightHeight.init({
	// Selectors
	selector: '[data-right-height]', // The selector for content containers (must use a valid CSS selector)
	selectorContent: '[data-right-height-content]', // The selector for content (must use a valid CSS selector)

	// Calbacks
	before: function ( container ) {}, // Function that runs before content height is adjusted
	after: function ( container ) {} // Function that runs after content height is adjusted
});
```


## Use Right Height functions in your own scripts

You can also call the Right Height adjust height function in your own scripts.

### adjustContainerHeight()
Set all content areas in a container to the same height.

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

### destroy()
Destroy the current `rightHeight.init()`. This is called automatically during the init function to remove any existing initializations.

```javascript
rightHeight.destroy();
```