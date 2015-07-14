"use strict";

const constants = require("./constants");

const buildArgList = function (settings) {
    const args = [];

    if (!settings.caseSensitive) {
        args.push("-i");
    }

    if (settings.displayLocation === constants.BOTTOM) {
        args.push("-b");
    }

    if (settings.grabKeyboard) {
        args.push("-f");
    }

    if (settings.displayOrientation === constants.DISPLAY_VERTICAL) {
        args.push("-l",  settings.verticalLineCount);
    }

    if (settings.prompt !== null) {
        args.push("-p", settings.prompt);
    }

    return args;
};

module.exports = buildArgList;
