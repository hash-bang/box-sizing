box-sizing
==========
Utility module to accept a variety of left, top, width, height combinations and output true left, top, width, height positions as valid numbers.

This module exposes a single function which is intended to be used as an assistant for positioning screen widgets such as Windows in a similar way to how CSS block elements work.


	var boxSizing = require('box-sizing');

	var coords = boxSizing({
		left: "20",
		top: -20,
		width: '50%',
		height: 50,
	}, {
		maxWidth: 100,
		maxHeight: 100,
	});

	// coords = {
	//	left: 20, // Straight forward copy (with type conversion to Number)
	// 	top: 40, // (i.e. negative values are bottom aligned)
	//	width: 50, // (i.e. 50% of maxWidth)
	//	height: 50, // Another straight copy
	// }



The boxSizing function can also take predefined default values:

	var coords = boxSizing({
		left: 20,
	}, {
		top: 30,
		height: 40,
		width: 50,
	});

	// coords = {
	//	left: 20,
	// 	top: 30,
	//	width: 40,
	//	height: 50,
	// }


Valid input formats
-------------------
The four main keys can be specified in the following format:

* **Number** - The value is used as is. E.g. '10' => '10px' offset
* **String + "%"** The value is used as a percentage of the whole. E.g. '10%' => '10%' of horizontal or vertical space (depending on context)
* **"middle" / "center"** - (only applicable for 'left' and 'top' positions) Tries to center the window based on 'width' and 'height' keys.
* **-Number** - Any negative value will be right or bottom aligned. E.g. -10 => 10 pixels from the right or bottom of the screen
