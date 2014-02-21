/* =============================================================

	Right Height v1.1
	Dynamically set content areas of different lengths to the same height, by Chris Ferdinandi.
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

window.rightHeight = (function (window, document, undefined) {

	'use strict';

	// Calculate distance to top of page
	// Private method
	// Returns integer
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

		// SELECTORS
		var contentFirst = contents.item(0);
		var contentSecond = contents.item(1);

		// EVENTS, LISTENERS, AND INITS
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
	var _resetHeight = function ( content ) {
		content.style.height = 'auto';
		content.style.minHeight = '0';
	};

	// Get the natural height of each content area
	// Record the tallest height to use for all other content
	// Private method
	// Returns integer.
	var _getHeight = function ( content, height ) {
		if ( content.offsetHeight > height ) {
			height = content.offsetHeight;
		}
		return height;
	};

	// Set the height of each content area
	// Private method
	var _setHeight = function ( content, height ) {
		content.style.height = height + 'px';
	};

	// Get all content ares within a group
	// Check if they're stacked, and set/reset their height
	// Private method
	var _adjustContainerHeight = function ( container ) {

		// SELECTORS
		var contents = container.querySelectorAll('[data-right-height-content]');
		var isStacked = _checkIfStacked(contents);
		var height = '0';

		// EVENTS, LISTENERS, AND INITS
		Array.prototype.forEach.call(contents, function (content, index) {
			_resetHeight( content );
		});

		if ( !isStacked ) {
			Array.prototype.forEach.call(contents, function (content, index) {
				height = _getHeight( content, height );
			});

			Array.prototype.forEach.call(contents, function (content, index) {
				_setHeight( content, height );
			});
		}

	};

	// For each group of content, adjust the content are heights
	// Private method
	var _runRightHeight = function ( containers ) {
		Array.prototype.forEach.call(containers, function (container, index) {
			_adjustContainerHeight( container );
		});
	};

	// On window resize, only run `_runRightHeight` at a rate of 15fps for better performance
	// Private method
	var _eventThrottler = function ( resizeTimeout, containers ) {
		if ( !resizeTimeout ) {
			resizeTimeout = setTimeout(function() {
				resizeTimeout = null;
				_runRightHeight( containers );
			}, 66);
		}
	};

	// Initialize Right Height
	// Public method
	var init = function () {

		// Feature test before initializing
		if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

			// Selectors and variables
			var containers = document.querySelectorAll('[data-right-height]'); // Groups of content
			var resizeTimeout; // Timer for resize event throttler

			// Run event throttler on window resize
			var _runEventThrottler = function () {
				_eventThrottler( resizeTimeout, containers );
			};

			// Events and listeners
			_runRightHeight( containers ); // Run Right Height on page load
			window.addEventListener( 'resize', _runEventThrottler, false); // Run Right Height on window resize

		}

	};

	// Return public methods
	return {
		init: init
	};

})(window, document);