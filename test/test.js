var boxSizing = require('../index');
var expect = require('chai').expect;

describe('X,Y,W,H positioning', function() {

	it('should position with direct co-ords (copy operation)', function() {
		var coords = boxSizing({
			left: 20,
			top: 30,
			width: 40,
			height: 50,
		});

		expect(coords).to.be.ok;

		expect(coords).to.have.property('left', 20);
		expect(coords).to.have.property('top', 30);
		expect(coords).to.have.property('width', 40);
		expect(coords).to.have.property('height', 50);

		expect(coords.left).to.be.a.number;
		expect(coords.top).to.be.a.number;
		expect(coords.width).to.be.a.number;
		expect(coords.height).to.be.a.number;
	});

	it('should return undefined if one property is undefined', function() {
		expect(boxSizing({
			left: 20,
			// top: 30,
			width: 40,
			height: 50,
		})).to.be.undefined;
	});

});

describe('right/bottom positioning', function() {

	it('should position with right co-ords', function() {
		var coords = boxSizing({
			left: -20,
			top: "20",
			width: 20,
			height: 20,
		}, {
			maxWidth: 100,
			maxHeight: 100,
		});

		expect(coords).to.be.ok;

		expect(coords).to.have.property('left', 60);
		expect(coords).to.have.property('top', 20);
		expect(coords).to.have.property('width', 20);
		expect(coords).to.have.property('height', 20);

		expect(coords.left).to.be.a.number;
		expect(coords.top).to.be.a.number;
		expect(coords.width).to.be.a.number;
		expect(coords.height).to.be.a.number;
	});


	it('should return undefined if asked to align right but maxWidth is undefined', function() {
		expect(boxSizing({
			left: -20,
			top: "20",
			width: 20,
			height: 20,
		})).to.be.undefined;
	});


	it('should position with bottom co-ords', function() {
		var coords = boxSizing({
			left: 20,
			top: -120,
			width: "20",
			height: 20,
		}, {
			maxWidth: 100,
			maxHeight: 200,
		});

		expect(coords).to.be.ok;

		expect(coords).to.have.property('left', 20);
		expect(coords).to.have.property('top', 60);
		expect(coords).to.have.property('width', 20);
		expect(coords).to.have.property('height', 20);

		expect(coords.left).to.be.a.number;
		expect(coords.top).to.be.a.number;
		expect(coords.width).to.be.a.number;
		expect(coords.height).to.be.a.number;
	});

	it('should return undefined if asked to align bottom but maxHeight is undefined', function() {
		expect(boxSizing({
			left: 20,
			top: -120,
			width: "20",
			height: 20,
		})).to.be.undefined;
	});
});

describe('percentage positioning', function() {

	it('should position with percentage based left', function() {
		var coords = boxSizing({
			left: '20%',
			top: 20,
			width: 20,
			height: 20,
		}, {
			maxWidth: 100,
			maxHeight: 100,
		});

		expect(coords).to.be.ok;

		expect(coords).to.have.property('left', 20);
		expect(coords).to.have.property('top', 20);
		expect(coords).to.have.property('width', 20);
		expect(coords).to.have.property('height', 20);

		expect(coords.left).to.be.a.number;
		expect(coords.top).to.be.a.number;
		expect(coords.width).to.be.a.number;
		expect(coords.height).to.be.a.number;
	});

	it('should position with percentage based top', function() {
		var coords = boxSizing({
			left: 20,
			top: '33%',
			width: 20,
			height: 20,
		}, {
			maxWidth: 100,
			maxHeight: 100,
		});

		expect(coords).to.be.ok;

		expect(coords).to.have.property('left', 20);
		expect(coords).to.have.property('top', 33);
		expect(coords).to.have.property('width', 20);
		expect(coords).to.have.property('height', 20);

		expect(coords.left).to.be.a.number;
		expect(coords.top).to.be.a.number;
		expect(coords.width).to.be.a.number;
		expect(coords.height).to.be.a.number;
	});

	it('width should be accepted as a percentage', function() {
		var coords = boxSizing({
			left: 0,
			top: 0,
			width: '50%',
			height: 20,
		}, {
			maxWidth: 100,
			maxHeight: 100,
		});

		expect(coords).to.be.ok;

		expect(coords).to.have.property('left', 0);
		expect(coords).to.have.property('top', 0);
		expect(coords).to.have.property('width', 50);
		expect(coords).to.have.property('height', 20);

		expect(coords.left).to.be.a.number;
		expect(coords.top).to.be.a.number;
		expect(coords.width).to.be.a.number;
		expect(coords.height).to.be.a.number;
	});

	it('height should be accepted as a percentage', function() {
		var coords = boxSizing({
			left: 0,
			top: 0,
			width: 10,
			height: '100%',
		}, {
			maxWidth: 100,
			maxHeight: 200,
		});

		expect(coords).to.be.ok;

		expect(coords).to.have.property('left', 0);
		expect(coords).to.have.property('top', 0);
		expect(coords).to.have.property('width', 10);
		expect(coords).to.have.property('height', 200);

		expect(coords.left).to.be.a.number;
		expect(coords.top).to.be.a.number;
		expect(coords.width).to.be.a.number;
		expect(coords.height).to.be.a.number;
	});
});


describe('centered positioning', function() {

	it('should center X positioning', function() {
		var coords = boxSizing({
			left: 'middle',
			top: 20,
			width: 20,
			height: 20,
		}, {
			maxWidth: 100,
			maxHeight: 100,
		});

		expect(coords).to.be.ok;

		expect(coords).to.have.property('left', 40);
		expect(coords).to.have.property('top', 20);
		expect(coords).to.have.property('width', 20);
		expect(coords).to.have.property('height', 20);

		expect(coords.left).to.be.a.number;
		expect(coords.top).to.be.a.number;
		expect(coords.width).to.be.a.number;
		expect(coords.height).to.be.a.number;
	});


	it('should center Y positioning', function() {
		var coords = boxSizing({
			left: 20,
			top: 'middle',
			width: 20,
			height: 20,
		}, {
			maxWidth: 100,
			maxHeight: 200,
		});

		expect(coords).to.be.ok;

		expect(coords).to.have.property('left', 20);
		expect(coords).to.have.property('top', 90);
		expect(coords).to.have.property('width', 20);
		expect(coords).to.have.property('height', 20);

		expect(coords.left).to.be.a.number;
		expect(coords.top).to.be.a.number;
		expect(coords.width).to.be.a.number;
		expect(coords.height).to.be.a.number;
	});

});
