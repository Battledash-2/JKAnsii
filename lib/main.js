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

const modded = {
	...size,
	...prompt,
	...basic,
}

module.exports = {
	...modded,
	color,
}