/* =============================================================

	Right Height v1.0
	Dynamically set content containers to the same height, by Chris Ferdinandi.
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

window.rightHeight = (function (window, document, undefined) {

	'use strict';

	// Feature Test
	if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

		// SELECTORS

		var containers = document.querySelectorAll('[data-right-height]');


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

		var resetHeight = function ( content ) {
			content.style.height = 'auto';
		};

		var getHeight = function ( content, height ) {
			if ( content.offsetHeight > height ) {
				height = content.offsetHeight;
			}
			return height;
		};

		var setHeight = function ( content, height ) {
			content.style.height = height + 'px';
		};

		var runRightHeight = function ( container ) {

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


		// EVENTS, LISTENERS, AND INITS

		Array.prototype.forEach.call(containers, function (container, index) {
			runRightHeight( container );
		});

		// TODO: Add resize event
		// May require making above `forEach loop part of a function
		// (runs on load, and on resize).

	}

})(window, document);