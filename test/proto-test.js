const makeJSON = require('../index.js');
const expect = require('chai').expect;
describe('__proto__ and constructor assignment', function () {

  it('should throw an exception if there is a __proto__ property', () => {
    const JSONbig = makeJSON({ protoAction: 'error' });
    expect(() =>
      JSONbig.parse('{ "\\u005f_proto__": 1000000000000000 }')
    ).to.throw('Object contains forbidden prototype property');
  });

  it('should throw an exception if there is constructor property', () => {
    const JSONbig = makeJSON({ protoAction: 'error' });
    expect(() => JSONbig.parse('{ "constructor": 1000000000000000 }')).to.throw(
      'Object contains forbidden constructor property'
    );
  });

});
