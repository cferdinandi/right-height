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

		var containers = jQuery('[data-right-height]');


		// METHODS

		// TODO: Make Vanilla JS
		var resetHeight = function ( content ) {
			content.height('auto');
		};

		// TODO: Make Vanilla JS
		var getHeight = function ( content, height ) {
			if ( content.height() > height ) {
				height = content.height();
			}
			return height;
		};

		// TODO: Make Vanilla JS
		var setHeight = function ( content, height ) {
			content.height(height);
		};

		var runRightHeight = function ( container ) {

			// SELECTORS
			var contents = container.querySelectorAll('[data-right-height-content]');
			var height = 0;

			// EVENTS, LISTENERS, AND INITS
			Array.prototype.forEach.call(contents, function (content, index) {
				height = resetHeight( content );
			});

			Array.prototype.forEach.call(contents, function (content, index) {
				height = getHeight( content, height );
			});

			Array.prototype.forEach.call(contents, function (content, index) {
				setHeight( content, height );
			});

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