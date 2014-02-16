/* =============================================================

	Right Height v1.0
	Dynamically set content areas of different lengths to the same height, by Chris Ferdinandi.
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

window.rightHeight = (function (window, document, undefined) {

	'use strict';

	// Feature Test
	if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

		// SELECTORS

		var containers = document.querySelectorAll('[data-right-height]'); // Groups of content
		var resizeTimeout; // Timer for resize event throttler


		// METHODS

		// Calculate distance to top of page
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

		// Check if a group of content areas are stacked
		var checkIfStacked = function ( contents ) {

			// SELECTORS
			var contentFirst = contents.item(0);
			var contentSecond = contents.item(1);

			// EVENTS, LISTENERS, AND INITS
			if ( contentFirst !== null && contentSecond !== null ) {
				if ( getDistanceToTop(contentFirst) - getDistanceToTop(contentSecond) === 0 ) {
					return false;
				} else {
					return true;
				}
			}

		};

		// Reset the content height to `auto`
		var resetHeight = function ( content ) {
			content.style.height = 'auto';
		};

		// Get the natural height of each content area.
		// Record the tallest height to use for all other content.
		var getHeight = function ( content, height ) {
			if ( content.offsetHeight > height ) {
				height = content.offsetHeight;
			}
			return height;
		};

		// Set the height of each content area.
		var setHeight = function ( content, height ) {
			content.style.height = height + 'px';
		};

		// Get all content ares within a group.
		// Check if they're stacked, and set/reset their height.
		var adjustContainerHeight = function ( container ) {

			// SELECTORS
			var contents = container.querySelectorAll('[data-right-height-content]');
			var isStacked = checkIfStacked(contents);
			var height = '0';

			// EVENTS, LISTENERS, AND INITS
			Array.prototype.forEach.call(contents, function (content, index) {
				resetHeight( content );
			});

			if ( !isStacked ) {
				Array.prototype.forEach.call(contents, function (content, index) {
					height = getHeight( content, height );
				});

				Array.prototype.forEach.call(contents, function (content, index) {
					setHeight( content, height );
				});
			}

		};

		// For each group of content, adjust the content are heights.
		var runRightHeight = function () {
			Array.prototype.forEach.call(containers, function (container, index) {
				adjustContainerHeight( container );
			});
		};

		// On window resize, only run `runRightHeight` at a rate of 15fps.
		// Better for performance.
		var resizeThrottler = function () {
			if ( !resizeTimeout ) {
				resizeTimeout = setTimeout(function() {
					resizeTimeout = null;
					runRightHeight();
				}, 66);
			}
		};


		// EVENTS, LISTENERS, AND INITS

		runRightHeight(); // Run Right Height on page load
		window.addEventListener( 'resize', resizeThrottler, false); // Run Right Height on window resize

	}

})(window, document);