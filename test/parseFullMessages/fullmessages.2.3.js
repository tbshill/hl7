const segments = require('../../segments');
const fs = require('fs');

const msh_parser = segments.builder(new segments.templates['2.3'].msh_template());
const pid_parser = segments.builder(new segments.templates['2.3'].pid_template());
const pv1_parser = segments.builder(new segments.templates['2.3'].pv1_template());
const gt1_parser = segments.builder(new segments.templates['2.3'].gt1_template());
// const acc_parser = segments.builder(new segments.templates['2.3'].acc_template()); // TODO: make ACC template
const in1_parser = segments.builder(new segments.templates['2.3'].in1_template());
const orc_parser = segments.builder(new segments.templates['2.3'].orc_template());
const obr_parser = segments.builder(new segments.templates['2.3'].obr_template());

const hl7_string = fs
  .readFileSync('/Users/it/Development/KawaFlows/Libraries/hl7/test/testHL7/ORM.hl7')
  .toString();

const $segments = hl7_string.split('\n');

const removeEmpty = obj => {
  Object.entries(obj).forEach(
    ([key, val]) =>
      (val && typeof val === 'object' && removeEmpty(val)) ||
      ((val === null || val === '') && delete obj[key])
  );
  return obj;
};

describe('Parse ORM', () => {
  it('Run:', () => {
    let message_json = {};

    for (let segment of $segments) {
      const segment_type = segment.substr(0, 3);
      switch (segment_type) {
        case 'MSH':
          message_json.header = msh_parser(segment);
          break;
        case 'PID':
          message_json.patient = pid_parser(segment);
          break;
        default:
          break;
      }
    }

    message_json = removeEmpty(message_json);
    console.log(message_json);
    console.log('\n\n\n\n');
  });
});
