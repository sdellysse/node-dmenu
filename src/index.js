"use strict";

const Dmenu = require("./Dmenu");
Dmenu.defaults.prompt = "Whatssup";

Dmenu.display([
    "My my my",
    "Music makes me so hard",
    "Makes me think oh my lord",
])
    .then(selected => console.log("selected: +"+selected+"+"))
    .catch(err => console.log("error: ", err))
;
