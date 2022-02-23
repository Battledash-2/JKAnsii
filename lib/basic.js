/**
 * JkAnsii
 * Easy to use ANSI terminal codes with tons of features
 * 
 * MIT License
 * Copyright (c) 2022 Battledash-2
 */
// -- Variables --
const mod = {};
const nul = '\u001b[';

const s = (s)=>s.toString();

// -- Main --
// Up / Down
mod.cursorUp = (amount=1) => nul+s(amount)+'A';
mod.cursorDown = (amount=1) => nul+s(amount)+'B';
// Left / Right
mod.cursorLeft = (amount=1) => nul+s(amount)+'D';
mod.cursorRight = (amount=1) => nul+s(amount)+'C';
// To Line
mod.relLineDown = (amount=1) => nul+s(amount)+'E';
mod.relLineUp = (amount=1) => nul+s(amount)+'F';
// To column
mod.toColumn = (col=1) => nul+s(col)+'G';
// To position
mod.toPosition = (col=1, row=1) => nul+s(row)+';'+s(col)+'H';
// Clear
mod.clear = (amount='') => nul+s(amount)+'J';
mod.clearLine = (amount='') => nul+s(amount)+'K';
// Scroll
mod.scrollUp = (amount=1) => nul+s(amount)+'S';
mod.scrollDown = (amount=1) => nul+s(amount)+'T';
// Report position
mod.reportCursor = () => nul+'6n';

// Save / Restore cursor
mod.saveCursor = () => nul+'s';
mod.restoreCursor = () => nul+'u';

// Show / Hide cursor
mod.showCursor = () => nul+'?25h';
mod.hideCursor = () => nul+'?25l';

// Reset
mod.resetTerminal = () => nul+'c';

// Remove ANSI
mod.removeAnsi = (string='') => string.replace(/\u001b\[.*?m/g, '');

// Nul
mod.nul = nul;

// Write
mod.write = (w='') => process.stdout.write(w);

// -- Export --
module.exports = mod;