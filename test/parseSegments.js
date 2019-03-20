const datatypes = require('../datatypes');
const segments = require('../segments');

describe('Segments', () => {
  it('Should parse MSH', () => {
    const msh = 'MSH|^~&|LABxxx|ClinLAB|ICU||19910918060544||MFN^M03|MSGID002|P|2.2';

    const parser_adj = {
      sending_application: components => datatypes.parse_ST(components[2]),
      sending_facility: components => datatypes.parse_ST(components[3]),
      recieving_application: components => datatypes.parse_ST(components[4]),
      recieving_facility: components => datatypes.parse_ST(components[5]),
      delete: ['principle_language']
    };

    const parser = segments.builder(new segments.templates['2.3'].msh_template(), parser_adj);

    const data = parser(msh);
    console.log(data);

    // const msh_parser = segments.msh_parser_builder(parser_adj);
    // const data = msh_parser(msh);
    // console.log(data);
  });
});
