var _ = require('lodash');

module.exports = function(position, options) {
	var settings = {};
	var settings = _.defaults({}, options, {
		left: undefined,
		top: undefined,
		width: undefined,
		height: undefined,
		maxWidth: undefined,
		maxHeight: undefined,
	});

	var res = {};

	['width', 'height'].forEach(function(f) {
		if (_.isUndefined(position, f)) return;
		var value = position[f];
		var parsed = _.parseInt(value);
		if (_.isNumber(value) && value >= 0) {
			res[f] = value;
		} else if (isFinite(value) && value >= 0) {
			res[f] = parsed;
		} else if (f == 'width' && _.isString(value) && _.endsWith(value, '%')) {
			if (!settings.maxWidth) return;
			res[f] = Math.floor(settings.maxWidth * parsed / 100);
		} else if (f == 'height' && _.isString(value) && _.endsWith(value, '%')) {
			if (!settings.maxHeight) return;
			res[f] = Math.floor(settings.maxHeight * parsed / 100);
		} else {
			return false;
		}
	});

	['left', 'top'].forEach(function(f) {
		if (_.isUndefined(position, f)) return;

		var value = position[f];
		var parsed = _.parseInt(value);
		if (_.isNumber(value) && value >= 0) {
			res[f] = value;
		} else if (isFinite(value) && value >= 0) {
			res[f] = parsed;
		} else if (f == 'left' && isFinite(value) && value < 0) {
			if (!settings.maxWidth) return;
			res[f] = settings.maxWidth - (res.width || 0) + parsed;
		} else if (f == 'top' && isFinite(value) && value < 0) {
			if (!settings.maxHeight) return;
			res[f] = settings.maxHeight - (res.height || 0) + parsed;
		} else if (f == 'left' && _.isString(value) && _.endsWith(value, '%') && parsed >= 0) {
			if (!settings.maxWidth) return;
			res[f] = Math.floor(settings.maxWidth * parsed / 100);
		} else if (f == 'top' && _.isString(value) && _.endsWith(value, '%') && parsed >= 0) {
			if (!settings.maxHeight) return;
			res[f] = Math.floor(settings.maxHeight * parsed / 100);
		} else if (f == 'left' && (value === 'center' || value === 'middle')) {
			if (!settings.maxWidth) return;
			res[f] = Math.floor((settings.maxWidth - res.width) / 2);
		} else if (f == 'top' && (value === 'center' || value === 'middle')) {
			if (!settings.maxHeight) return;
			res[f] = Math.floor((settings.maxHeight - res.height) / 2);
		} else {
			return;
		}
	});

	if ( // Check to see we got everything (unless defaultPosition has overriden something)
		_.isUndefined(res.left) ||
		_.isUndefined(res.top) ||
		_.isUndefined(res.width) ||
		_.isUndefined(res.height)
	) return;

	return res;
};
