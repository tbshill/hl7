const assert = require('assert');
const datatypes = require('../datatypes');
describe('Encode Datatype to HL7', () => {
  describe('Alphanumeric', () => {
    it('to_ST', () => {
      const ST = datatypes.to_ST('Hello');
      assert.equal(ST, 'Hello', 'Could not encode ST to HL7');
    });

    it('to_TX', () => {
      const tx = datatypes.to_TX('Hello Data ');
      assert.equal(tx, 'Hello Data ', 'could not encode TX');
    });
    it('to_FT - sanity', () => {
      const ft = datatypes.to_FT('Formatted Data');
      assert.equal(ft, 'Formatted Data', 'Could not encode Escape Characters');
    });
    it('to_FT - escape characters');
  });

  describe('Numerical', () => {
    xit('to_CQ');
    xit('to_MO');
    xit('to_NM');
    xit('to_SI');
    xit('to_SN');
  });

  describe('Date/Time', () => {
    xit('to_DT');
    xit('to_TM');
    xit('to_TS');
  });

  describe('Identifiers', () => {
    xit('to_ID');
    xit('to_IS');
    xit('to_HD');
    xit('to_EI');
    xit('to_RP');
    xit('to_PL');
    xit('to_PT');
  });

  describe('Code Values', () => {
    xit('to_CE');
    xit('to_CF');
    xit('to_CK');
    xit('to_CN');
    xit('to_CX');
    xit('to_XCN');
  });
  describe('Demographics', () => {
    xit('to_AD');
    xit('to_PN');
    xit('to_TN');
    xit('to_XAD');
    xit('to_XPN');
    xit('to_XON');
    xit('to_XTN');
  });
});
