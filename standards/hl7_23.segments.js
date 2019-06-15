const datatypes_tools = require('../datatypes/datatypes');
const templates = {
  'MSH': [
    ['segment', 'ST'],
    ['delimeters', 'ST'],
    ['sending_application', 'HD'],
    ['sending_facility', 'HD'],
    ['recieving_application', 'HD'],
    ['recieving_facility', 'HD'],
    ['datetime', 'TS'],
    ['security', 'ST'],
    ['message_type', (field) => {
      // Encode it
      if (typeof (field) != 'string') {
        return `${field.type}^${field.trigger}`;
      }

      // Parse It
      else {
        return {
          type: field.split('^')[0],
          trigger: field.split('^')[1]
        }
      }

    }],
    ['control_id', 'ST'],
    ['processing_id', 'PT'],
    ['version', 'ID'],
    ['sequence_number', 'NM'],
    ['continuation_pointer', 'ST'],
    ['accept_ack_type', 'ID'],
    ['application_ack_type', 'ST'],
    ['country_code', 'ID'],
    ['principle_language', 'ID']

  ],

  'PID': [
    ['segment', 'ST'],
    ['set_id', 'SI'],
    ['external_id', 'CX'],
    ['internal_id', 'CX'],
    ['alernate_id', 'CX'],
    ['name', 'XPN'],
    ['mothers_name', 'XPN'],
    ['dob', 'TS'],
    ['sex', 'IS'],
    ['alias', 'XPN'],
    ['race', 'IS'],
    ['address', 'XAD'],
    ['country_code', 'IS'],
    ['home_phone', 'XTN'],
    ['cell_phone', 'XTN'],
    ['primary_langage', 'CE'],
    ['marital_status', 'IS'],
    ['religion', 'IS'],
    ['account_number', 'CX'],
    ['ssn', 'ST'],
    ['drivers_license', 'DLN'],
    ['mothers_identifier', 'CX'],
    ['ethnic_group', 'IS'],
    ['birth_place', 'ST'],
    ['multiple_birth_indicator', 'ID'],
    ['birth_order', 'NM'],
    ['citizenship', 'IS'],
    ['military_status', 'CE'],
    ['nationality', 'CE'],
    ['death_date', 'TS'],
    ['death_indicator', 'ID']
  ],
  "ORC": [
    ['segment', 'ST'],

    ['order_control', 'ID'],
    ['placer_order_number', 'EI'],
    ['filler_order_number', 'EI'],
    ['placer_group_number', 'EI'],
    ['order_status', 'ID'],
    ['response_flag', 'ID'],
    ['quanity_timing', 'TQ'],
    ['parent', 'CM'],
    ['transaction_date', 'TS'],
    ['entered_by', 'XCN'],
    ['verified_by', 'XCN'],
    ['ordering_provider', 'XCN'],
    ['enterers_location', 'PL'],
    ['call_back_number', 'XTN'],
    ['order_effective_date', 'TS'],
    ['order_control_code_reason', 'CE'],
    ['entering_organization', 'CE'],
    ['entering_device', 'CE'],
    ['action_by', 'XCN']],

  "MSA": [
    ['segment', 'ST'],

    ['ack_code', 'ID'],
    ['message_control_id', 'ST'],
    ['text', 'ST'],
    ['expected_sequence_number', 'NM'],
    ['delayed_ack_type', 'ID'],
    ['error_condition', 'CE']],

  "NTE": [
    ['segment', 'ST'],

    ['set_id', 'SI'],
    ['source', 'ID'],
    ['comment', 'FT'],
  ],

  "PV1": [
    ['segment', 'ST'],

    ['set_id', 'SI'],
    ['patient_class', 'IS'],
    ['assigned_location', 'PL'],
    ['admission_type', 'IS'],
    ['preadmit_number', 'CX'],
    ['prior_location', 'PL'],
    ['attending_doctor', 'CN'],
    ['referring_doctor', 'CN'],
    ['consulting_doctor', 'CN'],
    ['hosplital_service', 'IS'],
    ['temp_location', 'PL'],
    ['preadmit_test_indicator', 'IS'],
    ['readmission_indicator', 'IS'],
    ['admit_source', 'IS'],
    ['ambulatory_status', 'IS'],
    ['vip_indicator', 'IS'],
    ['admitting_doctor', 'CN'],
    ['patient_type', 'IS'],
    ['visit_number', 'CX'],
    ['financial_class', 'FC'],
    ['charge_price_indicator', 'IS'],
    ['courtesy_code', 'IS'],
    ['credit_rating', 'IS'],
    ['contract_code', 'IS'],
    ['contract_effective_date', 'DT'],
    ['contract_ammount', 'NM'],
    ['contract_period', 'NM'],
    ['interest_code', 'IS'],
    ['transfer_to_bad_debt_code', 'IS'],
    ['transfer_to_bad_debt_date', 'DT'],
    ['bad_debt_agency_code', 'IS'],
    ['bad_debt_transfer_amount', 'NM'],
    ['bad_debt_recovery_amount', 'NM'],
    ['delete_account_indicator', 'IS'],
    ['delete_account_date', 'DT'],
    ['discharge_disposition', 'IS'],
    ['discharged_to', 'CM'],
    ['diet_type', 'IS'],
    ['servicing_facility', 'IS'],
    ['bed_status', 'IS'],
    ['account_status', 'IS'],
    ['pending_location', 'PL'],
    ['prior_temp_location', 'PL'],
    ['admit_date', 'TS'],
    ['discharged_date', 'TS'],
    ['current_balance', 'NM'],
    ['total_charges', 'NM'],
    ['total_adjustments', 'NM'],
    ['total_payments', 'NM']],

  "PV2": [
    ['segment', 'ST'],

    ['prior_pending_location', 'PL'],
    ['accommodation_code', 'CE'],
    ['admit_reason', 'CE'],
    ['transfer_reason', 'CE'],
    ['pateint_valuables', 'ST'],
    ['pateint_valuables_location', 'ST'],
    ['visit_user_code', 'IS'],
    ['expected_admit_date', 'TS'],
    ['expected_discharge_date', 'TS'],
    ['estimated_length_of_inpatient_stay', 'NM'],
    ['actual_length_of_inpatient_stay', 'e_'],
    ['visit_description', 'ST'],
    ['referral_source_code', 'CN'],
    ['previous_service_date', 'DT'],
    ['employment_illness_related_indicator', 'ID'],
    ['purge_status_code', 'IS'],
    ['purge_status_date', 'DT'],
    ['special_program_code', 'IS'],
    ['retention_indicator', 'ID'],
    ['expected_number_of_insurance_plans', 'NM'],
    ['visit_publicity_code', 'IS'],
    ['visit_protection_indicator', 'ID'],
    ['clinic_organization_name', 'ON'],
    ['patient_status_code', 'IS'],
    ['visit_priority_code', 'IS'],
    ['previous_treatment_date', 'DT'],
    ['expected_discharge_disposition', 'IS'],
    ['signature_on_file_date', 'DT'],
    ['first_similar_illness_date', 'DT'],
    ['patient_charge_adjustment_code', 'IS'],
    ['recurring_service_code', 'IS'],
    ['billing_media_code', 'ID'],
    ['expected_surgery_date', 'TS'],
    ['military_partnership_code', 'ID'],
    ['military_nonavailability_code', 'ID'],
    ['newborn_baby_indicator', 'ID'],
    ['baby_detained_indicator', 'ID']],

  "OBR": [
    ['segment', 'ST'],

    ['set_id', 'SI'],
    ['placer_order_number', 'EI'],
    ['filler_order_number', 'EI'],
    ['universal_service_id', 'CE'],
    ['priority', 'ID'],
    ['requested_time', 'TS'],
    ['observation_time', 'TS'],
    ['observation_end_time', 'TS'],
    ['collection_volume', 'CQ'],
    ['collector_identifier', 'XCN'],
    ['specimen_action_code', 'ID'],
    ['danger_code', 'CE'],
    ['relevant_clinical_info', 'ST'],
    ['specimen_recieved_time', 'TS'],
    ['specimen_source', 'CM'],
    ['ordering_provider', 'XCN'],
    ['order_callback_phone_number', 'XTN'],
    ['placer_feild1', 'ST'],
    ['placer_feild2', 'ST'],
    ['filler_feild1', 'ST'],
    ['filler_feild2', 'ST'],
    ['results_change_time', 'TS'],
    ['charge_to_practice', 'CM'],
    ['diagnostic_service_section_id', 'ID'],
    ['result_status', 'ID'],
    ['parent_result', 'CM'],
    ['quantity_timing', 'TQ'],
    ['result_copies_top', 'XCN'],
    ['parent', 'CM'],
    ['transporation_mode', 'ID'],
    ['reason_for_study', 'CE'],
    ['principal_result_interpreter', 'CM'],
    ['assistant_result_interpreter', 'CM'],
    ['technician', 'CM'],
    ['transcriptionist', 'CM'],
    ['scheduled_time', 'TS'],
    ['number_of_sample_containers', 'NM'],
    ['transport_logistics_of_sample', 'CE'],
    ['collectors_comments', 'CE'],
    ['transport_arrangement_responsibility', 'CE'],
    ['transport_arranged', 'ID'],
    ['escort_required', 'ID'],
    ['planned_patient_transport_comment', 'CE']],

  "OBX": [
    ['segment', 'ST'],

    ['set_id', 'SI'],
    ['value_type', 'ID'],
    ['observation_identifier', 'CE'],
    ['observation_sub_id', 'ST'],
    ['observation_value', 'ST'], // TODO: the data type is * in the standard
    ['units', 'CE'],
    ['references_range', 'ST'],
    ['abnormal_flags', 'ID'],
    ['probability', 'NM'],
    ['nature_of_abnormal_test', 'ID'],
    ['observation_result_status', 'ID'],
    ['date_last_observed_normal_values', 'TS'],
    ['user_defined_access_checks', 'ST'],
    ['time_of_observation', 'TS'],
    ['producers_id', 'CE'],
    ['responsible_observer', 'XCN'],
    ['observation_method', 'CE']
  ],

  "IN1": [
    ['segment', 'ST'],

    ['set_id', 'SI'],
    ['insurance_plan_id', 'CE'],
    ['insurance_company_id', 'CX'],
    ['insurance_company_name', 'XON'],
    ['insurance_company_address', 'XAD'],
    ['insurance_company_contact', 'XPN'],
    ['insurance_company_phone', 'XTN'],
    ['group_number', 'ST'],
    ['group_name', 'XON'],
    ['insured_group_emp_id', 'CX'],
    ['insured_group_emp_name', 'XON'],
    ['plan_effective_date', 'DT'],
    ['plan_expiration_date', 'DT'],
    ['authorization_information', 'CM'],
    ['plan_type', 'IS'],
    ['name_of_issued', 'XPN'],
    ['insured_replationship_to_patient', 'CE'],
    ['insured_dob', 'TS'],
    ['insured_address', 'XAD'],
    ['assignment_of_benefits', 'IS'],
    ['coordination_of_benefits', 'IS'],
    ['coordination_of_benefits_priority', 'ST'],
    ['notice_of_admission_flag', 'ID'],
    ['notice_of_admission_date', 'DT'],
    ['report_of_eligibility_flag', 'IS'],
    ['report_of_eligibility_date', 'DT'],
    ['release_information_code', 'IS'],
    ['pac', 'ST'],
    ['verification_time', 'TS'],
    ['verification_by', 'XCN'],
    ['type_of_agreement_code', 'IS'],
    ['billing_status', 'IS'],
    ['lifetime_reserve_days', 'NM'],
    ['delay_before_lifetime_reserve_day', 'NM'],
    ['company_plan_code', 'IS'],
    ['policy_number', 'ST'],
    ['policy_deductible', 'CP'],
    ['policy_limit_amount', 'CP'],
    ['policy_limit_days', 'NM'],
    ['room_rate_semiprivate', 'CP'],
    ['room_rate_private', 'CP'],
    ['insured_employment_status', 'CE'],
    ['insured_sex', 'IS'],
    ['insured_employer_address', 'XAD'],
    ['verification_status', 'ST'],
    ['prior_insurance_plan_id', 'IS'],
    ['coverage_type', 'IS'],
    ['handicap', 'IS'],
    ['insureds_id_number', 'CX']],
  "IN2": [
    ['segment', 'ST'],

    ['insureds_employee_id', 'CX'],
    ['insureds_social_security_number', 'ST'],
    ['insureds_employer_name', 'XCN'],
    ['employer_information_data', 'IS'],
    ['mail_claim_party', 'IS'],
    ['medicare_health_ins_card_number', 'ST'],
    ['medicaid_case_name', 'XPN'],
    ['medicaid_case_number', 'ST'],
    ['champus_sponsor_name', 'XPN'],
    ['champus_id_number', 'ST'],
    ['dependent_of_champus_recipient', 'CE'],
    ['champus_organization', 'ST'],
    ['champus_station', 'ST'],
    ['champus_service', 'IS'],
    ['champus_rank_grade', 'IS'],
    ['champus_status', 'IS'],
    ['champus_retire_date', 'DT'],
    ['champus_nonavail_cert_on_file', 'ID'],
    ['baby_coverage', 'ID'],
    ['combine_baby_bill', 'ID'],
    ['blood_deductible', 'ST'],
    ['special_coverage_approval_name', 'XPN'],
    ['special_coverage_approval_title', 'ST'],
    ['noncovered_insurance_code', 'ST'],
    ['payor_id', 'CX'],
    ['payor_subscriber_id', 'CX'],
    ['eligibility_source', 'IS'],
    ['room_coverage_type_amount', 'CM'],
    ['policy_type_amount', 'CM'],
    ['daily_deductible', 'CM'],
    ['living_dependency', 'IS'],
    ['ambulatory_status', 'IS'],
    ['citizenship', 'IS'],
    ['primary_language', 'CE'],
    ['living_arrangement', 'IS'],
    ['publicity_indicator', 'CE'],
    ['protection_indicator', 'ID'],
    ['student_indicator', 'IS'],
    ['religion', 'IS'],
    ['mothers_maiden_name', 'XPN'],
    ['nationality_code', 'CE'],
    ['ethnic_group', 'IS'],
    ['marital_status', 'IS'],
    ['employment_start_date', 'DT'],
    ['employment_stop_date', 'DT'],
    ['job_title', 'ST'],
    ['job_code', 'JCC'],
    ['job_status', 'IS'],
    ['employer_contact_person_name', 'XPN'],
    ['employer_contact_person_phone_number', 'XTN'],
    ['employer_contact_reason', 'IS'],
    ['insureds_contact_persons_name', 'XPN'],
    ['insureds_contact_person_telephone_number', 'XTN'],
    ['insureds_contact_person_reason', 'IS'],
    ['relationship_to_the_patient_start_date', 'DT'],
    ['relationship_to_the_patient_stop_date', 'DT'],
    ['insurance_co_contact_reason', 'IS'],
    ['insurance_co_contact_phone_number', 'XTN'],
    ['policy_scope', 'IS'],
    ['policy_source', 'IS'],
    ['patient_member_number', 'CX'],
    ['guarantors_relationship_to_insured', 'IS'],
    ['insureds_telephone_number_home', 'XTN'],
    ['insureds_employer_telephone_number', 'XTN'],
    ['military_handicapped_program', 'CE'],
    ['suspend_flag', 'ID'],
    ['co_pay_limit_flag', 'ID'],
    ['stoploss_limit_flag', 'ID'],
    ['insured_organization_name_and_id', 'XON'],
    ['insured_employer_organization_name_and_id', 'XON'],
    ['race', 'IS'],
    ['patient_relationship_to_insured', 'ID']],
  "IN3":
    [

      ['set_id', 'SI'],
      ['certification_number', 'CX'],
      ['certified_by', 'XCN'],
      ['certification_required', 'ID'],
      ['penalty', 'CM'],
      ['certification_time', 'TS'],
      ['certification_modified', 'TS'],
      ['operator', 'XCN'],
      ['certificaiton_begin_date', 'DT'],
      ['certification_end_date', 'DT'],
      ['days', 'CM'],
      ['nonconcur_code', 'CE'],
      ['nonconcur_effective_time', 'TS'],
      ['physician_reviewer', 'XCN'],
      ['certification_contact', 'ST'],
      ['certificaiton_contact_phone', 'XTN'],
      ['appeal_reason', 'CE'],
      ['certification_agency', 'CE'],
      ['certification_agency_phone', 'XTN'],
      ['precertification_required', 'CM'],
      ['case_manager', 'ST'],
      ['second_opinion_date', 'DT'],
      ['second_opinion_status', 'IS'],
      ['second_opinion_documentation_recieved', 'IS'],
      ['second_opinion_physician', 'XCN'],

    ],

  "GT1":
    [
      ['set_id', 'SI'],
      ['number', 'CX'],
      ['name', 'XPN'],
      ['spouse_name', 'XPN'],
      ['address', 'XAD'],
      ['home_phone_', 'XTN'],
      ['business_phone', 'XTN'],
      ['dob', 'TS'],
      ['sex', 'IS'],
      ['type', 'IS'],
      ['relationship', 'IS'],
      ['ssn', 'ST'],
      ['begin_date', 'DT'],
      ['end_date', 'DT'],
      ['priority', 'NM'],
      ['employer_name', 'XPN'],
      ['employer_address', 'XAD'],
      ['employ_phone_number', 'XTN'],
      ['employee_id_number', 'CX'],
      ['employment_status', 'IS'],
      ['organization', 'XON'],
      ['billing_hold_flag', 'ID'],
      ['credit_rating_code', 'CE'],
      ['death_date_and_time', 'TS'],
      ['death_flag', 'ID'],
      ['charge_adjustment_code', 'CE'],
      ['household_annual_income', 'CP'],
      ['household_size', 'NM'],
      ['employer_id_number', 'CX'],
      ['marital_status_code', 'IS'],
      ['hire_effective_date', 'DT'],
      ['employment_stop_date', 'DT'],
      ['living_dependency', 'IS'],
      ['ambulatory_status', 'IS'],
      ['citizenship', 'IS'],
      ['primary_language', 'CE'],
      ['living_arrangement', 'IS'],
      ['publicity_indicator', 'CE'],
      ['protection_indicator', 'ID'],
      ['student_indicator', 'IS'],
      ['religion', 'IS'],
      ['mothers_maiden_name', 'XPN'],
      ['nationality_code', 'CE'],
      ['ethnic_group', 'IS'],
      ['contact_persons_name', 'XPN'],
      ['contact_persons_telephone_number', 'XTN'],
      ['contact_reason', 'CE'],
      ['contact_relationship_code', 'IS'],
      ['job_title', 'ST'],
      ['job_code', 'JCC'],
      ['employers_organization_name', 'XON'],
      ['handicap', 'IS'],
      ['job_status', 'IS'],
      ['financial_class', 'FC'],
      ['race', 'IS'],
    ],
  "AL1": [
    ['segment', 'ST'],

    ['set_id', 'SI'],
    ['type', 'ID'],
    ['code', 'CE'],
    ['sensitivity', 'IS'],
    ['reaction', 'ST'],
    ['identification_date', 'DT'],
  ],

  "DG1": [
    ['segment', 'ST'],

    ['set_id', 'SI'],
    ['diagnosis_coding_method', 'ID'],
    ['diagnosis_code', 'CE'],
    ['diagnosis_description', 'ST'],
    ['diagnosis_time', 'TS'],
    ['diagnosis_type', 'IS'],
    ['major_diagnostic_category', 'CE'],
    ['diagnostic_related_group', 'CE'],
    ['drg_approval_indicator', 'ID'],
    ['drg_grouper_review_code', '('],
    ['outlier_type', 'CE'],
    ['outlier_days', 'NM'],
    ['outlier_cost', 'CP'],
    ['grouper_version_and_type', 'ST'],
    ['diagnosis_priority', 'NM'],
    ['diagnosing_clinician', 'XCN'],
    ['diagnosis_classification', 'IS'],
    ['confidential_indicator', 'ID'],
    ['attestation_time', 'TS'],
  ],
  "CTI": [
    ['segment', 'ST'],

    ['sponsor_study_id', 'EI'],
    ['study_phase_identifier', 'CE'],
    ['study_scheduled_time_point', 'CE'],
  ],
  "BLG": [
    ['segment', 'ST'],

    ['when_to_charge', 'CM'],
    ['charge_type', 'ID'],
    ['account_id', 'CK'],
  ],
  "PD1": [
    ['segment', 'ST'],

    ['living_dependency', 'IS'],
    ['living_arrangement', 'IS'],
    ['patient_primary_facility', 'XON'],
    ['patient_primary_care_provider', 'XCN'],
    ['student_indicator', 'IS'],
    ['handicap', 'IS'],
    ['living_will', 'IS'],
    ['organ_donor', 'IS'],
    ['separate_bill', 'ID'],
    ['diplicate_patient', 'CX'],
    ['publicity_indicator', 'CE'],
    ['protection_indicator', 'ID'],
  ],
  "ACC": [
    ['segment', 'ST'],

    ['accident_time', 'TS'],
    ['accident_code', 'CE'],
    ['accident_location', 'ST'],
    ['auto_accident_state', 'CE'],
    ['job_related_indicator', 'ID'],
    ['death_indicator', 'ID'],
  ]


}

var general_segment_parser = function general_segment_parser(string_segment) {
  const segment_name = string_segment.substr(0, 3);
  let template = templates[segment_name];
  let components = string_segment.split('|');
  let ret = {}
  for (let i = 0; i < template.length; i++) {
    const key = template[i][0];
    const datatype = template[i][1];

    if (typeof (datatype) == 'string') {
      const datatype_parser = datatypes_tools.datatype_parser(datatype);
      ret[key] = datatype_parser(components[i]);
    }
    else if (typeof (datatype) == 'function') {
      ret[key] = datatype(components[i]);
    }

  }

  return ret;
}

var general_segment_encoder = function general_segment_encoder(data) {
  console.log(data);
  const segment_name = data.segment;
  const template = templates[segment_name];
  let ret_array = Array(template.length);

  for (let i = 0; i < ret_array.length; i++) {
    ret_array[i] = '';
  }

  for (let i = 0; i < template.length; i++) {
    const key = template[i][0];
    const datatype = template[i][1];
    let feild;
    if (typeof (datatype) == 'string') {
      const datatype_encoder = datatypes_tools.datatype_encoder(datatype);

      if (data[key] == undefined) {
        feild = '';
      }
      else {
        feild = datatype_encoder(data[key], 'F');
        // console.log(feild_parser);
        // feild = feild_parser(data[key], 'F');
      }
    } else if (typeof (datatype) == 'function') {
      feild = datatype(data[key]);
    }

    ret_array[i] = feild;
  }

  return ret_array.join('|');

}

module.exports = {
  parser = general_segment_parser,
  encoder = general_segment_encoder
};

// let testMSAParser = new templates.msa_template();

// const msa_data = {
//   ack_code: 'AA',
//   message_control_id: 'Control ID',
//   text: '',
//   expected_sequence_number: '',
//   delayed_ack_type: '',
//   error_condition: {
//     identifier: "Ident",
//     coding_system: "code_sys"
//   },
// }

// console.log(general_segment_encoder('MSA', msa_data));

// const hl7 = "MSH|^~\\&|MOUNTAIN_RAD|JVW|CLOVERLEAF|CLOVERLEAF|20190308081202||ORM^O01|Q933803995T1152150212|P|2.3||||||8859/1 ";

// msh_json = general_segment_parser(hl7);
// console.log(general_segment_encoder(msh_json));