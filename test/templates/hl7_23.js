const assert = require('assert');
const segments = require('../../segments');
describe('Segments for Version 2.3', () => {
  xit('ACC');
  xit('ADD');
  xit('AIG');
  xit('AIL');
  xit('AIP');
  xit('AIS');
  xit('AL1');
  xit('APR');
  xit('ARQ');
  xit('AUT');
  xit('BHS');
  xit('BLG');
  xit('BTS');
  xit('CDM');
  xit('CM0');
  xit('CM1');
  xit('CM2');
  xit('CSP');
  xit('CSR');
  xit('CSS');
  xit('CTD');
  xit('CDI');
  xit('DG1');
  xit('DRG');
  xit('DSC');
  xit('DSP');
  xit('EQL');
  xit('ERQ');
  xit('ERR');
  xit('FAC');
  xit('FHS');
  xit('FT1');
  xit('FTS');
  xit('GT1');
  xit('IN1');
  xit('IN2');
  xit('IN3');
  xit('LCC');
  xit('LCH');
  xit('LDP');
  xit('LOC');
  xit('LRL');
  xit('MFA');
  xit('MFE');
  xit('MFI');
  xit('MRG');
  xit('MSA');
  it('MSH', () => {
    console.log('');
    console.log('');
    console.log('');
    const msh_builder = segments.builder(new segments.templates['2.3'].msh_template(), {});
    const msh = 'MSH|^~&|LABxxx|ClinLAB|ICU||19910918060544||MFN^M03|MSGID002|P|2.2';
    const parsed = msh_builder(msh);
    const expected = {
      sending_application: {
        namespace_id: 'LABxxx',
        universal_id: '',
        universal_id_type: ''
      },
      sending_facility: {
        namespace_id: 'ClinLAB',
        universal_id: '',
        universal_id_type: ''
      },
      recieving_application: { namespace_id: 'ICU', universal_id: '', universal_id_type: '' },
      recieving_facility: { namespace_id: '', universal_id: '', universal_id_type: '' },
      datetime: { time: new Date('1991-09-18T12:05:44.000Z'), precision: '' },
      security: '',
      message_type: { type: 'MFN', event: 'M03' },
      control_id: 'MSGID002',
      processing_id: { id: 'P', mode: '' },
      version: '2.2',
      sequence_number: '',
      continuation_pointer: '',
      accept_ack_type: '',
      application_ack_type: '',
      country_code: '',
      character_set: '',
      principle_language: {
        identifier: '',
        text: '',
        coding_system: '',
        alternate_id: '',
        alternate_text: '',
        alternate_coding_system: ''
      }
    };

    assert.deepStrictEqual(parsed, expected, 'Could not parse MSH segment');
    console.log(parsed);
  });
  xit('MK1');
  xit('NPU');
  xit('NTE');
  xit('OBR');
  xit('OBX');
  xit('ODS');
  xit('ODT');
  xit('OM1');
  xit('OM2');
  xit('OM3');
  xit('OM4');
  xit('OM5');
  xit('OM6');
  xit('ORC');
  xit('PCR');
  xit('PD1');
  xit('PDC');
  xit('PEO');
  xit('PES');
  xit('PID');
  xit('PR1');
  xit('PRA');
  xit('PRC');
  xit('PRD');
  xit('PSR');
  xit('PV1');
  xit('PV2');
  xit('QAK');
  xit('QRD');
  xit('QRF');
  xit('RDF');
  xit('RDT');
  xit('RF1');
  xit('ROL');
  xit('RQ1');
  xit('RQD');
  xit('RXA');
  xit('RXC');
  xit('RXD');
  xit('RXE');
  xit('RXG');
  xit('RXO');
  xit('RXR');
  xit('SCH');
  xit('SPR');
  xit('TXA');
  xit('UB1');
  xit('UB2');
  xit('STF');
  xit('URD');
  xit('URS');
  xit('VTQ');
});
