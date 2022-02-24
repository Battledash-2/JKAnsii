/**
 * JkAnsii
 * Easy to use ANSI terminal codes with tons of features
 * 
 * MIT License
 * Copyright (c) 2022 Battledash-2
 */
// -- Variables --
const mod = {};
const esc = '\u001b[';
const l_esc = '\u001b';

const s = (s)=>s.toString();

// -- Main --
// Up / Down
mod.cursorUp = (amount=1) => esc+s(amount)+'A';
mod.cursorDown = (amount=1) => esc+s(amount)+'B';
// Left / Right
mod.cursorLeft = (amount=1) => esc+s(amount)+'D';
mod.cursorRight = (amount=1) => esc+s(amount)+'C';
// To Line
mod.relLineDown = (amount=1) => esc+s(amount)+'E';
mod.relLineUp = (amount=1) => esc+s(amount)+'F';
// To column
mod.toColumn = (col=1) => esc+s(col)+'G';
// To position
mod.toPosition = (col=1, row=1) => esc+s(row)+';'+s(col)+'H';
// Clear
mod.clear = (amount='') => esc+s(amount)+'J';
mod.clearLine = (amount='') => esc+s(amount)+'K';
// Scroll
mod.scrollUp = (amount=1) => esc+s(amount)+'S';
mod.scrollDown = (amount=1) => esc+s(amount)+'T';
// Report position
mod.reportCursor = () => esc+'6n';

// Save / Restore cursor
mod.saveCursor = () => l_esc+'7';
mod.restoreCursor = () => l_esc+'8';

// Show / Hide cursor
mod.showCursor = () => esc+'?25h';
mod.hideCursor = () => esc+'?25l';

// Reset
mod.resetTerminal = () => esc+'c';

// Remove ANSI
mod.removeAnsi = (string='') => string.replace(/\u001b\[.*?m/g, '');

// Clear Screen From Cursor / Clear From Cursor To ...
mod.clearInDisplay = (amount=0) => esc+s(amount)+'J';
mod.clearFromCursor = () => esc+'0J';

mod.clearFromCursorBack = () => esc+'1J';
mod.clearScreen = () => esc+'2J';

mod.clearRowToCursor = () => esc+'1K';

mod.clearLine = () => esc+'2K';

// Goto home position
mod.goHome = () => esc+'H'

// Up line with scroll
mod.upWithScroll = () => l_esc + 'M';

// esc
mod.esc = l_esc;

// Codes
mod.codes = {
	ctrl: esc,

};

// Write
mod.write = (w='') => process.stdout.write(w);

// -- Export --
module.exports = mod;