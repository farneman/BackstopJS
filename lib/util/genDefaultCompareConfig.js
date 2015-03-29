var fs = require('fs');

var configDefault = {
  "testPairs": []
};

var genDefaultCompareConfig = function (paths) {
  fs.writeFileSync(paths.compareConfigFileName, JSON.stringify(configDefault,null,2));
};

module.exports = genDefaultCompareConfig;
