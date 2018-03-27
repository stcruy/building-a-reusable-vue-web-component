// This code is included before the tests that are run via 'npm run test'.


// Add JSDOM: a browser environment for Node, so that vue-test-utils can run.
require('jsdom-global')();

// Make `should` and `expect` available globally.
const chai = require('chai');
chai.should();
global.expect = chai.expect;
