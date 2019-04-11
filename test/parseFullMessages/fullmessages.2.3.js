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

const removeEmpty = obj => {
  Object.entries(obj).forEach(([key, val]) => {
    if (val && typeof val === 'object') {
      removeEmpty(val);
    }
    if (val === null) {
      delete obj[key];
    } else if (val === '') {
      delete obj[key];
    } else if (val && typeof val === 'object') {
      let newval = JSON.stringify(val);
      if (newval === null) {
        delete obj[key];
      } else if (newval === '') {
        delete obj[key];
      } else if (newval === '{}') {
        delete obj[key];
      }

      // if (Object.entries(val).length == 0) {
      //   delete obj[key];
    }
  });
  return obj;
};

function parseORM() {
  const hl7_string = fs
    .readFileSync('/Users/it/Development/KawaFlows/Libraries/hl7/test/testHL7/ORM.hl7')
    .toString();
  const $segments = hl7_string.split('\n');

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
      case 'PV1':
        message_json.visit = pv1_parser(segment);
        break;
      case 'GT1':
        message_json.garentor = gt1_parser(segment);
        break;
      case 'IN1':
        message_json.insurance = in1_parser(segment);
        break;
      case 'ORC':
        message_json.order_control = orc_parser(segment);
        break;
      case 'OBR':
        message_json.observation = obr_parser(segment);
      default:
        break;
    }
  }

  message_json = removeEmpty(message_json);
  return message_json;
}

describe('Parse ORM', () => {
  it('Should nievely parse an ORM', () => {
    const parsed = parseORM();
    fs.writeFileSync('./parsed.json', JSON.stringify(parsed));
  });
});
