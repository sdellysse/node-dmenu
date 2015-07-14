"use strict";

const childProcess = require("child_process");

const run = function (binLocation, args, items) {
    return new Promise(function (resolve, reject) {
        const child = childProcess.spawn(binLocation, args);

        let hasFinished = false;
        let accumulator = "";

        child.on("error", error => {
            if (hasFinished) {
                return;
            }

            hasFinished = true;
            reject(error);
        });
        child.on("exit", (code, signal) => {
            if (hasFinished) {
                return;
            }

            hasFinished = true;
            if (code !== 0) {
                resolve(null);
            } else {
                accumulator = accumulator.replace(/\r|\n$/, "");
                resolve(accumulator);
            }
        });

        child.stdout.on("data", str => {
            accumulator += str;
        });

        child.stdin.write(items.join("\n"));
        child.stdin.end();
    });
};

module.exports = run;
