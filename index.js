const optimalMinify = require('optimal-minify');
const printResults = require('optimal-minify/src/print-results');
const {createFilter} = require('rollup-pluginutils');

const rollupOptimalMinify = function(userOptions) {
  userOptions = userOptions || {};
  const filter = createFilter(userOptions.include, userOptions.exclude, {resolve: false});

  return {
    name: 'optimalMinify',
    renderChunk(code, chunk, outputOptions) {
      if (!filter(chunk.fileName)) {
        return null;
      }
      return optimalMinify(Object.assign({}, userOptions, {code})).then(({minResult, results}) => {

        if (userOptions.log) {
          printResults(this.warn, {minResult, results});
        }

        return Promise.resolve({code: minResult.code});
      });
    }
  };
};

module.exports = rollupOptimalMinify;
