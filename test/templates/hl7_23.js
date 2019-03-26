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
  it('MSA', () => {
    const msa_parser = segments.builder(new segments.templates['2.3'].msa_template(), {});
    const parsed = msa_parser('MSA|AA|Q952913316T1177454870X481568');
    const expected = {
      ack_code: 'AA',
      delayed_ack_type: '',
      error_condition: {
        alternate_coding_system: '',
        alternate_id: '',
        alternate_text: '',
        coding_system: '',
        identifier: '',
        text: ''
      },
      expected_sequence_number: '',
      message_control_id: 'Q952913316T1177454870X481568',
      text: ''
    };
    assert.deepStrictEqual(parsed, expected, 'Could not parse MSA segment');
  });
  it('MSH', () => {
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
  });
  xit('MK1');
  xit('NPU');
  it('NTE', () => {
    const nte_parser = segments.builder(new segments.templates['2.3'].nte_template(), {});
    const nte = 'NTE|1|L|NOTE: Submission of serum';
    const parsed = nte_parser(nte);
    const expected = {
      comment: 'NOTE: Submission of serum',
      set_id: 1,
      source: 'L'
    };

    assert.deepStrictEqual(parsed, expected, 'Could not parse NTE');
  });
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
  it('PD1', () => {
    const pd1 =
      'PID|||PATID1234^5^M11||JONES^WILLIAM^A^III||19610615|M-||C|1200 N ELMSTREET^^GREENSBORO^NC^27401-1020|GL|(91-9)379-1212|(919)271-3434||S||PATID12345001^2^M10|123456789|9-87654^NC';
    const pd1_parser = segments.builder(new segments.templates['2.3'].pd1_template(), {});
    const parsed = pd1_parser(pd1);
    console.log(parsed);
    let expected = {
      diplicate_patient: {
        assigning_authority: {
          namespace_id: '',
          universal_id: '',
          universal_id_type: ''
        },
        assigning_facility: {
          namespace_id: '',
          universal_id: '',
          universal_id_type: ''
        },
        check_digit: '',
        check_digit_schema_code: '',
        id: 'C',
        identifier_code: ''
      },
      handicap: '',
      living_arrangement: '',
      living_dependency: '',
      living_will: '19610615',
      organ_donor: 'M-',
      patient_primary_care_provider: {
        assigning_authority: {
          namespace_id: '',
          universal_id: '',
          universal_id_type: ''
        },
        assigning_facility: {
          namespace_id: '',
          universal_id: '',
          universal_id_type: ''
        },
        components: '',
        degree: '',
        family_name: '',
        given_name: '',
        id_of_checkdigit_scheme: '',
        identifier_check_digit: '',
        identifier_code: '',
        middle_name: '',
        name_type_code: '',
        prefix: '',
        source_table: '',
        suffix: ''
      },
      patient_primary_facility: {
        assigning_authority: {
          namespace_id: '',
          universal_id: '',
          universal_id_type: ''
        },
        assigning_facility_id: {
          namespace_id: '',
          universal_id: '',
          universal_id_type: ''
        },
        check_digit: '',
        check_digit_scheme: '',
        id: '',
        identifier_type: '',
        organization_name: 'PATID1234',
        organization_type: '5'
      },
      protection_indicator: 'GL',
      publicity_indicator: {
        alternate_coding_system: '',
        alternate_id: 'NC',
        alternate_text: '27401-1020',
        coding_system: 'GREENSBORO',
        identifier: '1200 N ELMSTREET',
        text: ''
      },
      separate_bill: '',
      student_indicator: 'JONES^WILLIAM^A^III'
    };
    // expected.living_dependency =
    // expected.living_arrangement =
    // expected.patient_primary_facility =
    // expected.patient_primary_care_provider =
    // expected.student_indicator =
    // expected.handicap =
    // expected.living_will =
    // expected.organ_donor =
    // expected.separate_bill =
    // expected.diplicate_patient =
    // expected.publicity_indicator =
    // expected.protection_indicator =

    assert.deepStrictEqual(parsed, expected, 'Could not parse PD1');
  });
  xit('PDC');
  xit('PEO');
  xit('PES');
  it('PID', () => {
    const pid_parser = segments.builder(new segments.templates['2.3'].pid_template(), {});
    const pid =
      'PID|||PATID1234^5^M11||JONES^WILLIAM^A^III||19610615|M-||C|1200 N ELMSTREET^^GREENSBORO^NC^27401-1020|GL|(91-9)379-1212|(919)271-3434||S||PATID12345001^2^M10|123456789|9-87654^NC';
    const parsed = pid_parser(pid);

    const expected = {
      set_id: '',
      external_id: {
        id: '',
        check_digit: '',
        check_digit_schema_code: '',
        assigning_authority: { namespace_id: '', universal_id: '', universal_id_type: '' },
        identifier_code: '',
        assigning_facility: { namespace_id: '', universal_id: '', universal_id_type: '' }
      },
      internal_id: {
        id: 'PATID1234',
        check_digit: '5',
        check_digit_schema_code: 'M11',
        assigning_authority: { namespace_id: '', universal_id: '', universal_id_type: '' },
        identifier_code: '',
        assigning_facility: { namespace_id: '', universal_id: '', universal_id_type: '' }
      },
      alernate_id: {
        id: '',
        check_digit: '',
        check_digit_schema_code: '',
        assigning_authority: { namespace_id: '', universal_id: '', universal_id_type: '' },
        identifier_code: '',
        assigning_facility: { namespace_id: '', universal_id: '', universal_id_type: '' }
      },
      name: {
        family: 'JONES',
        given: 'WILLIAM',
        middle: 'A',
        suffix: 'III',
        prefix: '',
        degree: '',
        type: '',
        representation: ''
      },
      mothers_name: {
        family: '',
        given: '',
        middle: '',
        suffix: '',
        prefix: '',
        degree: '',
        type: '',
        representation: ''
      },
      dob: { time: new Date('1961-06-15 0:00'), precision: '' },
      sex: 'M-',
      alias: {
        family: '',
        given: '',
        middle: '',
        suffix: '',
        prefix: '',
        degree: '',
        type: '',
        representation: ''
      },
      race: 'C',
      address: {
        street: '1200 N ELMSTREET',
        other: '',
        city: 'GREENSBORO',
        state: 'NC',
        zip: '27401-1020',
        country: '',
        type: '',
        other_geograpic: '',
        county: '',
        census_tract: ''
      },
      country_code: 'GL',
      home_phone: {
        number: '(91-9)379-1212',
        telecommunication_code: '',
        telecommunication_equipment_type: '',
        email: '',
        country_code: '',
        area_code: '',
        phone_number: '',
        extension: '',
        text: ''
      },
      cell_phone: {
        number: '(919)271-3434',
        telecommunication_code: '',
        telecommunication_equipment_type: '',
        email: '',
        country_code: '',
        area_code: '',
        phone_number: '',
        extension: '',
        text: ''
      },
      primary_langage: {
        identifier: '',
        text: '',
        coding_system: '',
        alternate_id: '',
        alternate_text: '',
        alternate_coding_system: ''
      },
      marital_status: 'S',
      religion: '',
      account_number: {
        id: 'PATID12345001',
        check_digit: '2',
        check_digit_schema_code: 'M10',
        assigning_authority: { namespace_id: '', universal_id: '', universal_id_type: '' },
        identifier_code: '',
        assigning_facility: { namespace_id: '', universal_id: '', universal_id_type: '' }
      },
      ssn: '123456789',
      drivers_license: { number: '9-87654', state: 'NC', expiration: '' },
      mothers_identifier: {
        id: '',
        check_digit: '',
        check_digit_schema_code: '',
        assigning_authority: { namespace_id: '', universal_id: '', universal_id_type: '' },
        identifier_code: '',
        assigning_facility: { namespace_id: '', universal_id: '', universal_id_type: '' }
      },
      ethnic_group: '',
      birth_place: '',
      multiple_birth_indicator: '',
      birth_order: '',
      citizenship: '',
      military_status: {
        identifier: '',
        text: '',
        coding_system: '',
        alternate_id: '',
        alternate_text: '',
        alternate_coding_system: ''
      },
      nationality: {
        identifier: '',
        text: '',
        coding_system: '',
        alternate_id: '',
        alternate_text: '',
        alternate_coding_system: ''
      },
      death_date: { time: '', precision: '' },
      death_indicator: ''
    };
    assert.deepStrictEqual(parsed, expected, 'Could not parse MSH segment');
    // console.log(parsed);
  });
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
