var mocha = require('mocha')
  , assert = require('chai').assert
  , expect = require('chai').expect
  , BigNumber = require('bignumber.js')
  ;

describe("Testing native BigInt support: parse", function () {
  if (typeof (BigInt) === 'undefined') {
    console.log('No native BigInt');
    return;
  }
  var input = '{"big":92233720368547758070,"small":123,"name":"name","child":{"age":456}}';

  it("Should show JSONbig does support parsing native BigInt", function (done) {
    var JSONbig = require('../index')({
      "useNativeBigInt": true
    });
    var obj = JSONbig.parse(input);
    expect(obj.name).to.equal("name");
    expect(obj.small, "small int").to.equal(123);
    expect(obj.big.toString(), "big int").to.equal("92233720368547758070");
    expect(typeof obj.big, "big int").to.equal('bigint');
    done();
  });

  it("Should add hasOwnProperty method to the prototype of the parsed object", function (done) {
    var JSONbig = require('../index')({
      "useNativeBigInt": true
    });
    var obj = JSONbig.parse(input);
    expect(obj.hasOwnProperty("name")).to.equal(true);
    expect(obj.hasOwnProperty("small")).to.equal(true);
    expect(obj.hasOwnProperty("big")).to.equal(true);
    expect(obj.hasOwnProperty("medium")).to.equal(false);
    expect(obj.name).to.equal("name");
    expect(obj.small, "small int").to.equal(123);
    expect(obj.big.toString(), "big int").to.equal("92233720368547758070");
    expect(typeof obj.big, "big int").to.equal('bigint');
    expect(obj.child.age).to.equal(456);
    done();
  });

  it("Should show JSONbig does support forced parsing to native BigInt", function (done) {
    var JSONbig = require('../index')({
      "alwaysParseAsBig": true,
      "useNativeBigInt": true
    });
    var obj = JSONbig.parse(input);
    expect(obj.name).to.equal("name");
    expect(obj.big.toString(), "big int").to.equal("92233720368547758070");
    expect(typeof obj.big, "big int").to.equal('bigint');
    expect(obj.small.toString(), "small int").to.equal("123");
    expect(typeof obj.small, "small int").to.equal('bigint');
    done();
  });


  it("Should show JSONbig does support native Bigint parse/stringify roundtrip", function (done) {
    var JSONbig = require('../index')({
      "useNativeBigInt": true
    });
    var obj = JSONbig.parse(input);
    var output = JSONbig.stringify(obj);
    expect(output).to.equal(input);
    done();
  });

  it("Should show JSONbig does support native Bigint parse/stringify roundtrip when BigInt is forced", function (done) {
    var JSONbig = require('../index')({
      "alwaysParseAsBig": true,
      "useNativeBigInt": true
    });
    var obj = JSONbig.parse(input);
    var output = JSONbig.stringify(obj);
    expect(output).to.equal(input);
    done();
  });
});
