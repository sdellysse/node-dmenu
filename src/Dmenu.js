"use strict";

const buildArgList = require("./Dmenu/buildArgList");
const constants = require("./Dmenu/constants");
const run = require("./Dmenu/run");

const binaryLocation = new WeakMap();
const caseSensitive = new WeakMap();
const displayOrientation = new WeakMap();
const fontName = new WeakMap();
const grabKeyboard = new WeakMap();
const prompt = new WeakMap();
const verticalLineCount = new WeakMap();

const Dmenu = function (options) {
    if (typeof options === "undefined") {
        options = {};
    }

    if (typeof options.binaryLocation === "undefined") {
        options.binaryLocation = Dmenu.defaults.binaryLocation;
    }
    binaryLocation.set(this, options.binaryLocation);

    if (typeof options.grabKeyboard === "undefined") {
        options.grabKeyboard = Dmenu.defaults.grabKeyboard;
    }
    grabKeyboard.set(this, options.grabKeyboard);

    if (typeof options.caseSensitive === "undefined") {
        options.caseSensitive = Dmenu.defaults.caseSensitive;
    }
    caseSensitive.set(this, options.caseSensitive);

    if (typeof options.fontName === "undefined") {
        options.fontName = Dmenu.defaults.fontName;
    }
    fontName.set(this, options.fontName);

    if (typeof options.displayOrientation === "undefined") {
        options.displayOrientation = Dmenu.defaults.displayOrientation;
    }
    if (1
        && options.displayOrientation === constants.DISPLAY_VERTICAL
        && typeof options.verticalLineCount === "undefined"
    ) {
        throw new Error("When displaying vertically you must specify a verticalLineCount option");
    }
    if (1
        && options.displayOrientation === constants.DISPLAY_HORIZONTAL
        && typeof options.verticalLineCount === "undefined"
    ) {
        options.verticalLineCount = Dmenu.defaults.verticalLineCount;
    }
    displayOrientation.set(this, options.displayOrientation);
    verticalLineCount.set(this, options.verticalLineCount);

    if (typeof options.prompt === "undefined") {
        options.prompt = Dmenu.defaults.prompt;
    }
    prompt.set(this, options.prompt);
};

Object.assign(Dmenu, {
    constants,

    defaults: {
        binaryLocation: "/usr/bin/dmenu",
        caseSensitive: true,
        grabKeyboard: false,
        displayOrientation: constants.DISPLAY_HORIZONTAL,
        fontName: null,
        prompt: null,
        verticalLineCount: null,
    },

    display: function (items) {
        return (new Dmenu()).display(items);
    },

    displayWithPrompt: function (promptString, items) {
        return (new Dmenu()).displayWithPrompt(promptString, items);
    },
});

Object.assign(Dmenu.prototype, {
    getSettings: function (...overrides) {
        const settings =  {
            binaryLocation: binaryLocation.get(this),
            caseSensitive: caseSensitive.get(this),
            fontName: fontName.get(this),
            displayOrientation: displayOrientation.get(this),
            grabKeyboard: grabKeyboard.get(this),
            prompt: prompt.get(this),
            verticalLineCount: verticalLineCount.get(this),
        };

        return Object.assign(settings, ...overrides);
    },

    display: function (items) {
        return this.displayWithPrompt(prompt.get(this), items);
    },

    displayWithPrompt: function (promptString, items) {
        const args = [];

        items.forEach(item => {
            if (typeof item !== "string") {
                throw new Error("Every item must be a string");
            }
        });

        const argList = buildArgList(this.getSettings({ prompt: promptString }));
        return run(binaryLocation.get(this), argList, items);
    },
});


module.exports = Dmenu;
