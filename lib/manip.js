/**
 * CIOManip
 * 
 * MIT License
 * Copyright (C) 2022 Battledash-2
 */

const modes = {};

let enumV = 0;
const nv = ()=>enumV++;

// Types
modes.PLAIN = nv();
modes.HEX = nv();
modes.BIN = nv();

// Other
modes.CENTER = nv();

const __polyfill = {}; // in the case that stdout.write does not exist
if (!process || !process.stdout || !process.stdout.write) {
	__polyfill._to = setTimeout(()=>{}, 0);
	__polyfill._da = '';
	process = process ?? {};
	process.stdout = {
		write: (msg='')=>{
			__polyfill._da += msg;
			clearTimeout(__polyfill._to);
			__polyfill._to = setTimeout(()=>{ console.log(__polyfill._da); __polyfill._da = ''; }, 15);
			return msg;
		}
	};
}

const std = {};
const dir = {}; // direct ex. (direct.hex(int))
const base = process.stdout;

const state = {
	width: 0,
	fill: '',
	mode: modes.PLAIN,
};

let raw = '';
std.__assignments = {
	data: {
		get() { return raw; },
		set(value) {
			value = parse(value);
			raw += value;
			base.write(value);
			return true;
		}
	},
	raw: {
		get() { return raw; },
		set(value) {
			raw += value;
			base.write(value);
			return true;
		}
	},
	state: {
		get() { return state; },
		set() { return false; }
	}
};

std.reset    = () => { state.fill = ''; state.mode = modes.PLAIN; state.width = 0; return ''; };

std.hex      = () => { state.mode = modes.HEX; return ''; };
dir.hex      = (number=0) => '0x' + (parseInt(number).toString(16)).toUpperCase();

std.plain    = () => { state.mode = modes.PLAIN; return ''; };

std.bin      = () => { state.mode = modes.BIN; return ''; };
dir.bin      = (number=0) => /*'0b' +*/ (parseInt(number).toString(2));

std.setwidth = (width=0) => { state.width = width > 0 ? width : 0; return ''; };
std.setfill  = (string='') => { state.fill = string; return ''; };
std.fill     = () => { base.write(state.fill.toString().repeat(state.width)); return ''; };

std.center   = (surround='-') => { state.mode = modes.CENTER; state.fill = surround; return ''; }


const parse = (string='', cWidth=true) => {
	let result = string;
	cWidth = cWidth ?? true;

	switch (state.mode) {
		case modes.HEX:
			if (!isNaN(parseInt(result))) result = dir.hex(result);
			break;
		case modes.BIN:
			if (!isNaN(parseInt(result))) result = dir.bin(result);
			break;
		case modes.CENTER:
			// var l = state.fill.repeat(Math.floor(((state.width / 2) - (result.length-2))));
			var l = state.fill.repeat(Math.ceil((state.width - (result.length))/2)-1);
			result = l + ' ' + result + ' ' + l + '\n';
			state.mode = modes.PLAIN;
			state.fill = '';
			cWidth = false;
			break;
	}

	if (state.width > 0 && state.fill.length > 0 && cWidth) result = append(result.toString(), state.fill.toString() ?? ' ', state.width);

	return typeof result === 'undefined' ? '' : result.toString();
}
const append = (main='', second='', width=state.width) => second.repeat(width - main.length) + main;

std.write = (message) => {
	const msg = parse(message);
	raw += msg;
	base.write(msg);
	return '';
}
std.writes = (message) => { std.write(message); base.write('\n'); return ''; };
std.fillWith = (table=[[],[],[]]) => {
	for (let row of table) {
		row = row.map(c=>parse(c, false));
		const spaces = ' '.repeat(Math.floor(((state.width-row.flat().join('').length)/(row.length-1))+1));
		for (let c = 0; c<row.length; c++) {
			let column = row[c];
			base.write(column);
			if (c < row.length-1) base.write(spaces);
		}
		base.write('\n');
	}
}
const makeSizeMatch = (main, length, char=' ') => {
	if (main.length < length && isFinite(length)) main = main + char.repeat(length - main.length);
	return main;
}
std.writeTable = (table=[[],[],[]], mode=1) => {
	let largest = 0;
	table = table.map(row=>{
		row = row.map(b=>parse(b));
		if (Math.floor(((state.width-row.flat().join('').length)/(row.length-1))+1) > largest) largest = Math.floor(((state.width-row.flat().join('').length)/(row.length-1))+1);
		return row;
	});
	// let overall = table.flat().join('').length;
	for (let row of table) {
		let lastSpace;
		for (let c = 0; c<row.length; c++) {
			let column = row[c];
			if (c < row.length-1 || !mode) {
				lastSpace = makeSizeMatch(column, largest, ' ');
				base.write(lastSpace);
				lastSpace = lastSpace.length;
			} else {
				base.write(' '.repeat((lastSpace / 2 - column.length)+2)+column);
			}
		}
		base.write('\n');
	}
}
std.formatTable = (table=[[],[],[]]) => {
	for (let i = 0; i<table.length; i++) {
		let row = table[i];
		for (let b = 0; b<row.length; b++) {
			if (b < row.length-1) {
				row[b] = '| ' + row[b];
			} else {
				row[b] = '| ' + row[b] + ' |';
			}
		}
	}
	return std.writeTable(table, 0);
}
std.leftRightTable = (left=['1', '2'], right=['1', '2'], padding=1) => {
	left = left.map(c=>parse(c, false));
	right = right.map(c=>parse(c, false));
	for (let item of left) {
		if (item === '') continue;
		base.write(item);
		base.write(' '.repeat(padding));
	}
	const rightLength = right.map(c=>c.length).reduce((c,n)=>c+n) - 1;
	const leftLength = left.map(c=>c.length).reduce((c,n)=>c+n) - 1;
	const spaces = state.width - (left.length + 1) - (right.length) - leftLength - rightLength;
	base.write(' '.repeat(spaces));
	for (let item of right) {
		base.write(item);
		base.write(' '.repeat(padding));
	}
	base.write('\n');
}

std.alignLeft = std.write;
std.alignRight = (string='') => {
	let n = state.width - (string.length-1);
	base.write(' '.repeat(n < 0 ? '' : n) + parse(string));
	return '';
}

std.line  = () => { base.write('\n'); return ''; }
std.log   = (message) => base.write(message + '\n');

std.dir = dir;
module.exports = std;