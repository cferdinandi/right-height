(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define('rightHeight', factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.rightHeight = factory(root);
	}
})(this, function (root) {

	'use strict';

	//
	// Variables
	//

	var exports = {}; // Object for public APIs
	var supports = !!document.querySelector && !!root.addEventListener; // Feature test
	var settings;

	// Default settings
	var defaults = {
		callbackBefore: function () {},
		callbackAfter: function () {}
	};


	//
	// Methods
	//

	/**
	 * A simple forEach() implementation for Arrays, Objects and NodeLists
	 * @private
	 * @param {Array|Object|NodeList} collection Collection of items to iterate
	 * @param {Function} callback Callback function for each iteration
	 * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
	 */
	var forEach = function (collection, callback, scope) {
		if (Object.prototype.toString.call(collection) === '[object Object]') {
			for (var prop in collection) {
				if (Object.prototype.hasOwnProperty.call(collection, prop)) {
					callback.call(scope, collection[prop], prop, collection);
				}
			}
		} else {
			for (var i = 0, len = collection.length; i < len; i++) {
				callback.call(scope, collection[i], i, collection);
			}
		}
	};

	/**
	 * Merge defaults with user options
	 * @private
	 * @param {Object} defaults Default settings
	 * @param {Object} options User options
	 * @returns {Object} Merged values of defaults and options
	 */
	var extend = function ( defaults, options ) {
		var extended = {};
		forEach(defaults, function (value, prop) {
			extended[prop] = defaults[prop];
		});
		forEach(options, function (value, prop) {
			extended[prop] = options[prop];
		});
		return extended;
	};

	/**
	 * Calculate distance to top of page
	 * @private
	 * @param  {Element} content The content area to get the distance for
	 * @return {Number} Distance to the top of the document
	 */
	var getDistanceToTop = function ( content ) {
		var distance = 0;
		if (content.offsetParent) {
			do {
				distance += content.offsetTop;
				content = content.offsetParent;
			} while (content);
		}
		return distance;
	};

	/**
	 * Check if a group of content areas are stacked
	 * @private
	 * @param  {NodeList} contents A collection of content areas to compare
	 * @return {Boolean} Returns true if elements are stacked
	 */
	var checkIfStacked = function ( contents ) {

		// Selectors and variables
		var contentFirst = contents.item(0);
		var contentSecond = contents.item(1);

		// Determine if content containers are stacked
		if ( contentFirst && contentSecond ) {
			if ( getDistanceToTop(contentFirst) - getDistanceToTop(contentSecond) === 0 ) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}

	};

	/**
	 * Reset the content height to 'auto'
	 * @private
	 * @param  {Element} content The content area to set to height: auto
	 */
	var resetHeight = function ( content ) {
		content.style.height = 'auto';
		content.style.minHeight = '0';
	};

	/**
	 * Get the natural height of each content area, and
	 * record the tallest height to set for all other elements.
	 * @private
	 * @param  {Element} content A content area
	 * @param  {Number} height The current tallest height
	 * @return {Number} The updated tallest height
	 */
	var getHeight = function ( content, height ) {
		if ( content.offsetHeight > height ) {
			height = content.offsetHeight;
		}
		return height;
	};

	/**
	 * Set the height of each content area
	 * @private
	 * @param {Element} content The content area to set a height for
	 * @param {Number} height The height of the tallest content area
	 */
	var setHeight = function ( content, height ) {
		content.style.height = height + 'px';
	};

	/**
	 * Get all content areas within a group
	 * @public
	 * @param  {Element} container The wrapper that contains a set of content areas
	 * @param  {Object} options
	 */
	exports.adjustContainerHeight = function ( container, options ) {

		// Selectors and variables
		var settings = extend( settings || defaults, options || {} );  // Merge user options with defaults
		var contents = container.querySelectorAll('[data-right-height-content]');
		var isStacked = checkIfStacked(contents);
		var height = '0';

		settings.callbackBefore( container ); // Run callbacks before adjusting content

		// Reset each content area to its natural height
		forEach(contents, function (content) {
			resetHeight( content );
		});

		// If content areas are not stacked, give them equal heights
		if ( !isStacked ) {
			forEach(contents, function (content) {
				height = getHeight( content, height );
			});
			forEach(contents, function (content) {
				setHeight( content, height );
			});
		}

		settings.callbackAfter( container ); // Run callbacks after adjust content

	};

	/**
	 * For each group of content, adjust the content area heights
	 * @private
	 * @param  {NodeList} containers A collection of content wrappers
	 * @param  {Object} settings
	 */
	var runRightHeight = function ( containers, settings ) {
		forEach(containers, function (container) {
			exports.adjustContainerHeight( container, settings );
		});
	};

	/**
	 * On window resize, only run 'runRightHeight' at a rate of 15fps for better performance
	 * @private
	 * @param  {Function} eventTimeout Timeout function
	 * @param  {NodeList} containers A collection of content wrappers
	 * @param  {Object} settings
	 */
	var eventThrottler = function ( eventTimeout, containers, settings ) {
		if ( !eventTimeout ) {
			eventTimeout = setTimeout(function() {
				eventTimeout = null;
				runRightHeight( containers, settings );
			}, 66);
		}
	};

	/**
	 * Initialize Right Height
	 * @public
	 * @param {Object} options User settings
	 */
	exports.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Selectors and variables
		settings = extend( defaults, options || {} ); // Merge user options with defaults
		var containers = document.querySelectorAll('[data-right-height]'); // Groups of content
		var eventTimeout; // Timer for resize event throttler

		// Events and listeners
		window.addEventListener('load', function() {
			runRightHeight( containers, options ); // Run Right Height when DOM content fully loaded
		});
		window.addEventListener( 'resize', eventThrottler.bind( null, eventTimeout, containers, options ), false); // Run Right Height on window resize

	};


	//
	// Public APIs
	//

	return exports;

});