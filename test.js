const lib = require('./');
process.stdout.write('hi');

lib.write(lib.toColumn(0));
lib.write(lib.clearLine());

// output should be nothing

lib.setfill('0');
lib.setwidth(5);

lib.write(Math.floor(Math.random() * 99));

// output should be 000<INT>