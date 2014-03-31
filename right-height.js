/* =============================================================

	Right Height v2.3
	Dynamically set content areas of different lengths to the same height, by Chris Ferdinandi.
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

window.rightHeight = (function (window, document, undefined) {

	'use strict';

	// Default settings
	// Private {object} variable
	var _defaults = {
		callbackBefore: function () {},
		callbackAfter: function () {}
	};

	// Merge default settings with user options
	// Private method
	// Returns an {object}
	var _mergeObjects = function ( original, updates ) {
		for (var key in updates) {
			original[key] = updates[key];
		}
		return original;
	};

	// Calculate distance to top of page
	// Private method
	// Returns an integer
	var _getDistanceToTop = function ( content ) {
		var distance = 0;
		if (content.offsetParent) {
			do {
				distance += content.offsetTop;
				content = content.offsetParent;
			} while (content);
		}
		return distance;
	};

	// Check if a group of content areas are stacked
	// Private method
	// Boolean: Returns true if elements are stacked
	var _checkIfStacked = function ( contents ) {

		// Selectors and variables
		var contentFirst = contents.item(0);
		var contentSecond = contents.item(1);

		// Determine if content containers are stacked
		if ( contentFirst !== null && contentSecond !== null ) {
			if ( _getDistanceToTop(contentFirst) - _getDistanceToTop(contentSecond) === 0 ) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}

	};

	// Reset the content height to `auto`
	// Private method
	// Runs functions
	var _resetHeight = function ( content ) {
		content.style.height = 'auto';
		content.style.minHeight = '0';
	};

	// Get the natural height of each content area
	// Record the tallest height to use for all other content
	// Private method
	// Returns an integer
	var _getHeight = function ( content, height ) {
		if ( content.offsetHeight > height ) {
			height = content.offsetHeight;
		}
		return height;
	};

	// Set the height of each content area
	// Private method
	// Runs functions
	var _setHeight = function ( content, height ) {
		content.style.height = height + 'px';
	};

	// Get all content ares within a group
	// Check if they're stacked, and set/reset their height
	// Public method
	// Runs functions
	var adjustContainerHeight = function ( container, options ) {

		// Selectors and variables
		options = _mergeObjects( _defaults, options || {} ); // Merge user options with defaults
		var contents = container.querySelectorAll('[data-right-height-content]');
		var isStacked = _checkIfStacked(contents);
		var height = '0';

		options.callbackBefore( container ); // Run callbacks before adjusting content

		// Reset each content area to its natural height
		Array.prototype.forEach.call(contents, function (content, index) {
			_resetHeight( content );
		});

		// If content areas are not stacked, give them equal heights
		if ( !isStacked ) {
			Array.prototype.forEach.call(contents, function (content, index) {
				height = _getHeight( content, height );
			});

			Array.prototype.forEach.call(contents, function (content, index) {
				_setHeight( content, height );
			});
		}

		options.callbackAfter( container ); // Run callbacks after adjust content

	};

	// For each group of content, adjust the content are heights
	// Private method
	// Runs functions
	var _runRightHeight = function ( containers, options ) {
		Array.prototype.forEach.call(containers, function (container, index) {
			adjustContainerHeight( container, options );
		});
	};

	// On window resize, only run `_runRightHeight` at a rate of 15fps for better performance
	// Private method
	// Runs functions
	var _eventThrottler = function ( eventTimeout, containers, options ) {
		if ( !eventTimeout ) {
			eventTimeout = setTimeout(function() {
				eventTimeout = null;
				_runRightHeight( containers, options );
			}, 66);
		}
	};

	// Initialize Right Height
	// Public method
	// Runs functions
	var init = function ( options ) {

		// Feature test before initializing
		if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

			// Selectors and variables
			options = _mergeObjects( _defaults, options || {} ); // Merge user options with defaults
			var containers = document.querySelectorAll('[data-right-height]'); // Groups of content
			var eventTimeout; // Timer for resize event throttler

			// Events and listeners
			document.addEventListener('load', function() {
				_runRightHeight( containers, options ); // Run Right Height when DOM content fully loaded
			});
			window.addEventListener( 'resize', _eventThrottler.bind( null, eventTimeout, containers, options ), false); // Run Right Height on window resize

		}

	};

	// Return public methods
	return {
		init: init,
		adjustContainerHeight: adjustContainerHeight
	};

})(window, document);