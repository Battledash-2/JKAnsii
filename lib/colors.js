// From the terminalcolors.js module (also created by me)

const Construct = {
    /**
     * @param {(Int|String)} code Color code
     * @param {String} string String to append after color code
     */
    cons2b: (code, string)=>{
        return "\u001b["+code.toString()+"m"+string+"\u001b[0m";
    },

    /**
     * @param {(Int|String)} code ANSI Color code :1
     * @param {(Int|String)} code2 ANSI Color code :2
     * @param {String} string String to append after color code
     */
    cons3b: (code, code2, string)=>{
        return "\u001b["+code.toString()+";"+code2.toString()+"m"+string+"\u001b[0m";
    },

    /**
     * @param {(Int|String)} code ANSI Color code :1
     * @param {(Int|String)} code2 ANSI Color code :2
     * @param {(Int|String)} code3 ANSI Color code :3
     * @param {String} string String to append after color code
     */
    cons4b: (code, code2, code3, string)=>{
        return "\u001b["+code.toString()+";"+code2.toString()+";"+code3.toString()+"m"+string+"\u001b[0m";
    },

    /**
     * @param {(Int|String)} code ANSI Color code :1
     * @param {(Int|String)} code2 ANSI Color code :2
     * @param {(Int|String)} r ANSI Color code :3
     * @param {(Int|String)} g ANSI Color code :4
     * @param {(Int|String)} b ANSI Color code :5
     * @param {String} string String to append after color code
     */
    cons6b: (code, code2, r, g, b, string)=>{
        return "\u001b["+code.toString()+";"+code2.toString()+";"+r.toString()+";"+g.toString()+";"+b.toString()+"m"+string+"\u001b[0m";
    },

    // OTHER
    /**
     * 
     * @param {String} hex The hex
     * @returns {Array} [r, g, b]
     */
    hexToRGB: (hex)=>{
        hex = hex.startsWith("#") ? hex.slice(1) : hex;
        hex = hex.length == 3 ? hex[0].repeat(2) + hex[1].repeat(2) + hex[2].repeat(2) : hex;
        hex = hex.match(/\w{2}/g).map(c=>parseInt(c, 16));
        return hex;
    }
};
const Codes = {
    format: {
        noncolor: {
            other: {
                "swap": 7,
                fonts: {
                    "default": 10,
                    "font1": 11,
                    "font2": 12,
                    "font3": 13,
                    "font4": 14,
                    "font5": 15,
                    "font6": 16,
                    "font7": 17,
                    "font8": 18,
                    "font9": 19
                }
            },
            reset: {
                "reset": 0,
                "reset_intensity": 22,
                "reset_blai": 23,
                "reset_underline": 24,
                "reset_strike": 29,
            },
            "bold": 1,
            "dim": 2,
            "italic": 3,
            "underline": 4,
            "strike": 9,
        },
        color: {
            standard: {
                "black": 0,
                "red": 1,
                "green": 2,
                "yellow": 3,
                "blue": 4,
                "magenta": 5,
                "cyan": 6,
                "white": 7
            },
            high_intensity: {
                "dark_gray": 8,
                "bright_red": 9,
                "bright_green": 10,
                "bright_yellow": 11,
                "dark_blue": 12,
                "bright_magenta": 13,
                "bright_cyan": 14,
                "bright_white": 15
            }
        }
    }
};

// Basic formatting: bold, dim, italic, underline and strike
const basic = {
    bold: function(a) {
        return Construct.cons2b(Codes.format.noncolor.bold, a || this);
    },
    dim: function(a) {
        return Construct.cons2b(Codes.format.noncolor.dim, a || this);
    },
    italic: function(a) {
        return Construct.cons2b(Codes.format.noncolor.italic, a || this);
    },
    underline: function(a) {
        return Construct.cons2b(Codes.format.noncolor.underline, a || this);
    },
    strike: function(a) {
        return Construct.cons2b(Codes.format.noncolor.strike, a || this);
    }
}

// Fonts
const fonts = {
    reset: function(a) {
        return Construct.cons2b(Codes.format.noncolor.other.fonts.default, a || this);
    },
    font: function(number=1, a) {
        return Construct.cons2b(Codes.format.noncolor.other.fonts["font"+String(number)], a || this);
    },
    swap: function(a) {
        return Construct.cons2b(Codes.format.noncolor.other.swap, a || this)
    }
}

// Resets (reset intensity, blackletter and italic, underline and strike)
const reset = {
    all: function(a) {
        return Construct.cons2b(Codes.format.noncolor.reset.reset, a || this);
    },
    intensity: function(a) {
        return Construct.cons2b(Codes.format.noncolor.reset.reset_intensity, a || this);
    },
    blai: function(a) {
        return Construct.cons2b(Codes.format.noncolor.reset.reset_blai, a || this);
    },
    underline: function(a) {
        return Construct.cons2b(Codes.format.noncolor.reset.reset_underline, a || this);
    },
    strike: function(a) {
        return Construct.cons2b(Codes.format.noncolor.reset.reset_strike, a || this);
    },
    color: function(a) {
        return Construct.cons4b(39, 49, a || this);
    }
}

// 38 = foreground
// 48 = background

// foreground colors
const foreground = {
    rgb(r,g,b, str) {
        return Construct.cons6b(38, 2, r, g, b, str || this);
    },
    hex(hex, str) {
        const rgb = Construct.hexToRGB(hex);
        return Construct.cons6b(38, 2, rgb[0], rgb[1], rgb[2], str || this);
    },

    black: function(a) {
        return Construct.cons4b(38, 5, Codes.format.color.standard.black, a || this);
    },
    red: function(a) {
        return Construct.cons4b(38, 5, Codes.format.color.standard.red, a || this);
    },
    green: function(a) {
        return Construct.cons4b(38, 5, Codes.format.color.standard.green, a || this);
    },
    yellow: function(a) {
        return Construct.cons4b(38, 5, Codes.format.color.standard.yellow, a || this);
    },
    blue: function(a) {
        return Construct.cons4b(38, 5, Codes.format.color.standard.blue, a || this);
    },
    magenta: function(a) {
        return Construct.cons4b(38, 5, Codes.format.color.standard.magenta, a || this);
    },
    cyan: function(a) {
        return Construct.cons4b(38, 5, Codes.format.color.standard.cyan, a || this);
    },
    white: function(a) {
        return Construct.cons4b(38, 5, Codes.format.color.standard.white, a || this);
    },
}

const background = {
    rgb(r,g,b, str) {
        return Construct.cons6b(48, 2, r, g, b, str || this);
    },
    hex(hex, str) {
        const rgb = Construct.hexToRGB(hex);
        return Construct.cons6b(48, 2, rgb[0], rgb[1], rgb[2]);
    },

    black: function(a, b) {
        return Construct.cons4b(48, 5, Codes.format.color.standard.black, a || this);
    },
    red: function(a, b) {
        return Construct.cons4b(48, 5, Codes.format.color.standard.red, a || this);
    },
    green: function(a, b) {
        return Construct.cons4b(48, 5, Codes.format.color.standard.green, a || this);
    },
    yellow: function(a, b) {
        return Construct.cons4b(48, 5, Codes.format.color.standard.yellow, a || this);
    },
    blue: function(a, b) {
        return Construct.cons4b(48, 5, Codes.format.color.standard.blue, a || this);
    },
    magenta: function(a, b) {
        return Construct.cons4b(48, 5, Codes.format.color.standard.magenta, a || this);
    },
    cyan: function(a, b) {
        return Construct.cons4b(48, 5, Codes.format.color.standard.cyan, a || this);
    },
    white: function(a, b) {
        return Construct.cons4b(48, 5, Codes.format.color.standard.white, a || this);
    },
}

const foreground_high_intensity = {
    darkGray: function(a, b) {
        return Construct.cons4b(38, 5, Codes.format.color.high_intensity.dark_gray, a || this);
    },
    brightRed: function(a, b) {
        return Construct.cons4b(38, 5, Codes.format.color.high_intensity.bright_red, a || this);
    },
    brightGreen: function(a, b) {
        return Construct.cons4b(38, 5, Codes.format.color.high_intensity.bright_green, a || this);
    },
    brightYellow: function(a, b) {
        return Construct.cons4b(38, 5, Codes.format.color.high_intensity.bright_yellow, a || this);
    },
    darkBlue: function(a, b) {
        return Construct.cons4b(38, 5, Codes.format.color.high_intensity.dark_blue, a || this);
    },
    brightMagenta: function(a, b) {
        return Construct.cons4b(38, 5, Codes.format.color.high_intensity.bright_magenta, a || this);
    },
    brightCyan: function(a, b) {
        return Construct.cons4b(38, 5, Codes.format.color.high_intensity.bright_cyan, a || this);
    },
    brightWhite: function(a, b) {
        return Construct.cons4b(38, 5, Codes.format.color.high_intensity.bright_white, a || this);
    },
}

const background_high_intensity = {
    darkGray: function(a, b) {
        return Construct.cons4b(48, 5, Codes.format.color.high_intensity.dark_gray, a || this);
    },
    brightRed: function(a, b) {
        return Construct.cons4b(48, 5, Codes.format.color.high_intensity.bright_red, a || this);
    },
    brightGreen: function(a, b) {
        return Construct.cons4b(48, 5, Codes.format.color.high_intensity.bright_green, a || this);
    },
    brightYellow: function(a, b) {
        return Construct.cons4b(48, 5, Codes.format.color.high_intensity.bright_yellow, a || this);
    },
    darkBlue: function(a, b) {
        return Construct.cons4b(48, 5, Codes.format.color.high_intensity.dark_blue, a || this);
    },
    brightMagenta: function(a, b) {
        return Construct.cons4b(48, 5, Codes.format.color.high_intensity.bright_magenta, a || this);
    },
    brightCyan: function(a, b) {
        return Construct.cons4b(48, 5, Codes.format.color.high_intensity.bright_cyan, a || this);
    },
    brightWhite: function(a, b) {
        return Construct.cons4b(48, 5, Codes.format.color.high_intensity.bright_white, a || this);
    },
}

const full = {
    ...basic,
    font: fonts,
    reset,
    ...foreground,
    background,
    highIntensity: {
        ...foreground_high_intensity,
        background: background_high_intensity
    }
}

module.exports = full;