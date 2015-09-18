require("./stylesheets/normalize.css");
require("./stylesheets/skeleton.css");
require("./stylesheets/style.css");

var React = require("react");

var data = require('./models/datamodel.js');

document.write("it works to load "+ data);

require('./content.js');
