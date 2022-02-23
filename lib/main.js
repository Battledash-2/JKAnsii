/**
 * JkAnsii
 * Easy to use ANSI terminal codes with tons of features
 * 
 * MIT License
 * Copyright (c) 2022 Battledash-2
 */
const color = require('./colors');
const basic = require('./basic');

const size = require('./size');
const prompt = require('./prompt');

const manip = require('./manip');
Object.defineProperties(manip, manip.__assignments);
delete manip.__assignments;

const modded = {
	...size,
	...prompt,
	...basic,
	...manip,
}

module.exports = {
	...modded,
	color,
}