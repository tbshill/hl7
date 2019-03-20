const moment = require('moment');
const assert = require('assert');
const datatypes = require('../datatypes');
describe('Parsing Data Types', () => {
  describe('AlphaNumeric', () => {
    it('parse_ST', () => {
      const parsed = datatypes.parse_ST('Hello');
      assert.equal(parsed, 'Hello', 'Could not parse ST');
    });

    it('parse_TX', () => {
      const parsed = datatypes.parse_TX('Text data');
      assert.equal(parsed, 'Text data', 'Could not parsed TX');
    });

    it('parse_FT', () => {
      const parsed = datatypes.parse_FT('This is \\formated Data');
      assert.equal(parsed, 'This is \\formated Data');
    });
    it('parse_FT - escape characters');
  });

  describe('Numerical', () => {
    it('parse_CQ', () => {
      const parsed = datatypes.parse_CQ('150^lb&&ANSI+', 'F');
      const expected = {
        quantity: 150,
        units: {
          identifier: 'lb',
          text: '',
          coding_system: 'ANSI+',
          alternate_id: '',
          alternate_text: '',
          alternate_coding_system: ''
        }
      };

      assert.deepStrictEqual(parsed, expected, 'Did not parse CQ');
    });
    it('parse_MO', () => {
      let parsed = datatypes.parse_MO('25^USD');
      const expected = {
        quantity: 25,
        denomination: 'USD'
      };
      assert.deepStrictEqual(parsed, expected, 'Could not parse MO');
    });
    it('parse_NM', () => {
      let num = datatypes.parse_NM('5.4');
      assert.equal(typeof num, typeof 4);
    });
    xit('parse_SI');
    xit('parse_SN');
  });

  describe('Date/Time', () => {
    xit('parse_DT');
    xit('parse_TM');
    it('parse_TS', () => {
      const parsed = datatypes.parse_TS('201903181034123+1000^S');
      //YYYY[MM[DD[HHMM[SS[.S[S[S[S]]]]]]]][+/-ZZZZ]^<degree of precision>
      let a = moment('201903181034123+1000', 'YYYYMMDDHHmmssSSSZZ').toDate();
      const expected = {
        time: a,
        precision: 'S'
      };
      assert.deepStrictEqual(parsed, expected, 'Could not parse TS');
    });
  });

  describe('Identifier', () => {
    it('parse_ID', () => {
      const parsed = datatypes.parse_ID('19-MR-19-0004142');
      assert.equal(parsed, '19-MR-19-0004142', 'Could not parse ID');
    });
    it('parse_IS', () => {
      const parsed = datatypes.parse_IS('IS');
      assert.equal(parsed, 'IS', 'could not parse IS');
    });
    it('parse_HD', () => {
      const parsed = datatypes.parse_HD('IS^ST^ID');
      const expected = {
        namespace_id: 'IS',
        universal_id: 'ST',
        universal_id_type: 'ID'
      };

      assert.deepStrictEqual(parsed, expected, 'could not parse HD');
    });
    xit('parse_EI');
    xit('parse_RP');
    xit('parse_PL');
    it('parse_PT', () => {
      const parsed = datatypes.parse_PT('T^D');
      const expected = {
        id: 'T',
        mode: 'D'
      };
      assert.deepStrictEqual(parsed, expected, 'could not parse PT');
    });
  });
  describe('Generic', () => {
    it('parse_CM', () => {
      datatypes.parse_CM('ORM^O01', data => {
        const components = data.split('^');
        let ret = {};
        ret.type = datatypes.parse_ST(components[0] || '') || '';
        ret.event = datatypes.parse_ST(components[1] || '') || '';
        return ret;
      });
    });
  });

  describe('Code Values', () => {
    it('parse_CE', () => {
      const parsed = datatypes.parse_CE('F-11380^CREATININE^I9^2148-5^CREATININE^LN');
      const expected = {
        identifier: 'F-11380',
        text: 'CREATININE',
        coding_system: 'I9',
        alternate_id: '2148-5',
        alternate_text: 'CREATININE',
        alternate_coding_system: 'LN'
      };
      assert.deepStrictEqual(parsed, expected, 'could not parse CE');
    });
    xit('parse_CF');
    xit('parse_CK');
    xit('parse_CN');
    xit('parse_CX');
    xit('parse_XCN');
  });

  describe('Demographics', () => {
    it('parse_AD', () => {
      let parsed = datatypes.parse_AD('10 ASH LN^#3^LIMA^OH^48132');
      const expected = {
        street: '10 ASH LN',
        other: '#3',
        city: 'LIMA',
        state: 'OH',
        zip: '48132',
        country: '',
        type: '',
        other_geograpic: ''
      };
      assert.deepStrictEqual(parsed, expected, 'Could not parse AD');
    });
    it('parse_PN', () => {
      let parsed = datatypes.parse_PN('SMITH^JOHN^J^III^DR^PHD');
      const expected = {
        family: 'SMITH',
        given: 'JOHN',
        middle: 'J',
        suffix: 'III',
        prefix: 'DR',
        degree: 'PHD'
      };

      assert.deepStrictEqual(parsed, expected, 'Could not parse PN');
    });
    it('parse_TN', () => {
      const parsed = datatypes.parse_TN('(415)925-0121X305');
      assert.equal(parsed, '(415)925-0121X305', 'coud not parse TN');
    });
    it('parse_XAD', () => {
      const parsed = datatypes.parse_XAD(
        '1234 Easy St.^Ste. 123^San Francisco^CA^95123^USA^B^^SF^'
      );
      const expected = {
        street: '1234 Easy St.',
        other: 'Ste. 123',
        city: 'San Francisco',
        state: 'CA',
        zip: '95123',
        country: 'USA',
        type: 'B',
        other_geograpic: '',
        county: 'SF',
        census_tract: ''
      };

      assert.deepStrictEqual(parsed, expected, 'Could not parse XAD');
    });
    it('parse_XPN', () => {
      const parsed = datatypes.parse_XPN('Smith^John^J^III^DR^PHD^L');
      const expected = {
        family: 'Smith',
        given: 'John',
        middle: 'J',
        suffix: 'III',
        prefix: 'DR',
        degree: 'PHD',
        type: 'L',
        representation: ''
      };
      assert.deepStrictEqual(parsed, expected, 'Could not parse XPN');
    });
    it('parse_XON', () => {
      const parsed = datatypes.parse_XON('HL7 Health Center^L^6^M11^HCFA');
      const expected = {};
    });
    xit('parse_XTN');
  });
});
