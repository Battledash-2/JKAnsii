const lib = require('./');
process.stdout.write('hi');

lib.write(lib.toColumn(0));
lib.write(lib.clearLine());

// output should be nothing

lib.setfill('0');
lib.setwidth(5);

lib.write(Math.floor(Math.random() * 99));

lib.line();

// output should be 000<INT>

lib.setwidth(lib.size().width-50);
lib.fillWith([
	[
		'hello',
		'poo',
		'pee',
		'ejeodok',
		'dude',
		'idk',
		'random text',
		'btw'
	]
]);

lib.setwidth(0);
lib.write(lib.getLines('hellohdsiadjhos\n\naidhsiaodhsoaidhoisadhellohdsiadjhos\n\naidhsiaodhsoaidhoisadhellohdsiadjhos\n\naidhsiaodhsoaidhoisadhellohdsiadjhos\n\naidhsiaodhsoaidhoihellohdsiadjhos\n\naidhsiaodhsoaidhoisadhellohdsiadjhos\n\naidhsiaodhsoaidhoisadsad'));

// output should be 12 (13 newlines)