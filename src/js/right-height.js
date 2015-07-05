(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define([], factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.rightHeight = factory(root);
	}
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {

	'use strict';

	//
	// Variables
	//

	var rightHeight = {}; // Object for public APIs
	var supports = !!document.querySelector && !!root.addEventListener; // Feature test
	var settings, containers, eventTimeout;

	// Default settings
	var defaults = {
		callback: function () {}
	};


	//
	// Methods
	//

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
			if ( buoy.getOffsetTop(contentFirst) - buoy.getOffsetTop(contentSecond) === 0 ) {
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
		content.style.height = '';
		content.style.minHeight = '';
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
	rightHeight.adjustContainerHeight = function ( container, options ) {

		// Selectors and variables
		var settings = buoy.extend( settings || defaults, options || {} );  // Merge user options with defaults
		var contents = container.querySelectorAll('[data-right-height-content]');
		var isStacked = checkIfStacked(contents);
		var height = '0';

		// Reset each content area to its natural height
		buoy.forEach(contents, function (content) {
			resetHeight( content );
		});

		// If content areas are not stacked, give them equal heights
		if ( !isStacked ) {
			buoy.forEach(contents, function (content) {
				height = getHeight( content, height );
			});
			buoy.forEach(contents, function (content) {
				setHeight( content, height );
			});
		}

		settings.callback( container ); // Run callbacks after adjust content

	};

	/**
	 * For each group of content, adjust the content area heights
	 * @private
	 * @param  {NodeList} containers A collection of content wrappers
	 * @param  {Object} settings
	 */
	var runRightHeight = function () {
		buoy.forEach(containers, function (container) {
			rightHeight.adjustContainerHeight( container, settings );
		});
	};

	/**
	 * On window resize, only run 'runRightHeight' at a rate of 15fps for better performance
	 * @private
	 * @param  {Function} eventTimeout Timeout function
	 * @param  {NodeList} containers A collection of content wrappers
	 * @param  {Object} settings
	 */
	var eventThrottler = function () {
		if ( !eventTimeout ) {
			eventTimeout = setTimeout(function() {
				eventTimeout = null;
				runRightHeight( containers, settings );
			}, 66);
		}
	};

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	rightHeight.destroy = function () {

		if (!settings) return;

		// Reset content and remove event listeners
		buoy.forEach(containers, function (container) {
			var contents = container.querySelectorAll('[data-right-height-content]');
			buoy.forEach(contents, function (content) {
				resetHeight( content );
			});
		});
		root.removeEventListener('resize', eventThrottler, false);

		// Reset variables
		settings = null;
		containers = null;
		eventTimeout = null;

	};

	/**
	 * Initialize Right Height
	 * @public
	 * @param {Object} options User settings
	 */
	rightHeight.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Destroy any existing initializations
		rightHeight.destroy();

		// Selectors and variables
		settings = buoy.extend( defaults, options || {} ); // Merge user options with defaults
		containers = document.querySelectorAll('[data-right-height]'); // Groups of content

		// Events and listeners
		runRightHeight( containers, options ); // Run Right Height on load
		root.addEventListener('load', runRightHeight, false);
		root.addEventListener('resize', eventThrottler, false); // Run Right Height on window resize

	};


	//
	// Public APIs
	//

	return rightHeight;

});