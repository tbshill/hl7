const datatypes = require('../datatypes');
const templates = {
  msh_template: function msh_template() {
    // TODO: Feild Separator
    // TODO: Encodign Characters
    this.sending_application = components => datatypes.parse_HD(components[2]);
    this.sending_facility = components => datatypes.parse_HD(components[3]);
    this.recieving_application = components => datatypes.parse_HD(components[4]);
    this.recieving_facility = components => datatypes.parse_HD(components[5]);
    this.datetime = components => datatypes.parse_TS(components[6]);
    this.security = components => datatypes.parse_ST(components[7]);
    this.message_type = components =>
      datatypes.parse_CM(components[8], data => {
        const components = data.split('^');
        let ret = {};
        ret.type = datatypes.parse_ST(components[0] || '') || '';
        ret.event = datatypes.parse_ST(components[1] || '') || '';
        return ret;
      });
    this.control_id = components => datatypes.parse_ST(components[9]);
    this.processing_id = components => datatypes.parse_PT(components[10]);
    this.version = components => datatypes.parse_ID(components[11]);
    this.sequence_number = components => datatypes.parse_NM(components[12]);
    this.continuation_pointer = components => datatypes.parse_ST(components[13]);
    this.accept_ack_type = components => datatypes.parse_ID(components[14]);
    this.application_ack_type = components => datatypes.parse_ST(components[15]);
    this.country_code = components => datatypes.parse_ID(components[16]);
    this.character_set = components => datatypes.parse_ID(components[17]);
    this.principle_language = components => datatypes.parse_CE(components[18] || '');
  },

  pid_template: function pid_template() {
    this.set_id = components => datatypes.parse_SI(components[1]);
    this.external_id = components => datatypes.parse_CX(components[2]);
    this.internal_id = components => datatypes.parse_CX(components[3]);
    this.alernate_id = components => datatypes.parse_CX(components[4]);
    this.name = components => datatypes.parse_XPN(components[5]);
    this.mothers_name = components => datatypes.parse_XPN(components[6]);
    this.dob = components => datatypes.parse_TS(components[7]);
    this.sex = components => datatypes.parse_IS(components[8]);
    this.alias = components => datatypes.parse_XPN(components[9]);
    this.race = components => datatypes.parse_IS(components[10]);
    this.address = components => datatypes.parse_XAD(components[11]);
    this.country_code = components => datatypes.parse_IS(components[12]);
    this.home_phone = components => datatypes.parse_XTN(components[13]);
    this.cell_phone = components => datatypes.parse_XTN(components[14]);
    this.primary_langage = components => datatypes.parse_CE(components[15]);
    this.marital_status = components => datatypes.parse_IS(components[16]);
    this.religion = components => datatypes.parse_IS(components[17]);
    this.account_number = components => datatypes.parse_CX(components[18]);
    this.ssn = components => datatypes.parse_ST(components[19]);
    this.drivers_license = components => datatypes.parse_DLN(components[20]);
    this.mothers_identifier = components => datatypes.parse_CX(components[21]);
    this.ethnic_group = components => datatypes.parse_IS(components[22]);
    this.birth_place = components => datatypes.parse_ST(components[23]);
    this.multiple_birth_indicator = components => datatypes.parse_ID(components[24]);
    this.birth_order = components => datatypes.parse_NM(components[25]);
    this.citizenship = components => datatypes.parse_IS(components[26]);
    this.military_status = components => datatypes.parse_CE(components[27]);
    this.nationality = components => datatypes.parse_CE(components[28]);
    this.death_date = components => datatypes.parse_TS(components[29]);
    this.death_indicator = components => datatypes.parse_ID(components[30]);
  },
  msa_template: function msa_template() {
    this.ack_code = components => datatypes.parse_ID(components[1]);
    this.message_control_id = components => datatypes.parse_ST(components[2]);
    this.text = components => datatypes.parse_ST(components[3]);
    this.expected_sequence_number = components => datatypes.parse_NM(components[4]);
    this.delayed_ack_type = components => datatypes.parse_ID(components[5]);
    this.error_condition = components => datatypes.parse_CE(components[6]);
  },
  nte_template: function nte_template() {
    this.set_id = components => datatypes.parse_SI(components[1]);
    this.source = components => datatypes.parse_ID(components[2]);
    this.comment = components => datatypes.parse_FT(components[3]);
  },
  pv1_template: function pv1_template() {
    this.set_id = components => datatypes.parse_SI(components[1]);
    this.patient_class = components => datatypes.parse_IS(components[2]);
    this.assigned_location = components => datatypes.parse_PL(components[3]); // TODO: Build parse_PL
    this.admission_type = components => datatypes.parse_IS(components[4]);
    this.preadmit_number = components => datatypes.parse_CX(components[5]);
    this.prior_location = components => datatypes.parse_PL(components[6]);
    this.attending_doctor = components => datatypes.parse_XCN(components[7]);
    this.referring_doctor = components => datatypes.parse_XCN(components[8]);
    this.consulting_doctor = components => datatypes.parse_XCN(components[9]);
    this.hosplital_service = components => datatypes.parse_IS(components[10]);
    this.temp_location = components => datatypes.parse_PL(components[11]);
    this.preadmit_test_indicator = components => datatypes.parse_IS(components[12]);
    this.readmission_indicator = components => datatypes.parse_IS(components[13]);
    this.admit_source = components => datatypes.parse_IS(components[14]);
    this.ambulatory_status = components => datatypes.parse_IS(components[15]);
    this.vip_indicator = components => datatypes.parse_IS(components[16]);
    this.admitting_doctor = components => datatypes.parse_XCN(components[17]);
    this.patient_type = components => datatypes.parse_IS(components[18]);
    this.visit_number = components => datatypes.parse_CX(components[19]);
    this.financial_class = components => datatypes.parse_FC(components[20]); // TODO: Build prase_FC
    this.charge_price_indicator = components => datatypes.parse_IS(components[21]);
    this.courtesy_code = components => datatypes.parse_IS(components[22]);
    this.credit_rating = components => datatypes.parse_IS(components[23]);
    this.contract_code = components => datatypes.parse_IS(components[24]);
    this.contract_effective_date = components => datatypes.parse_DT(components[25]);
    this.contract_ammount = components => datatypes.parse_NM(components[26]);
    this.contract_period = components => datatypes.parse_NM(components[27]);
    this.interest_code = components => datatypes.parse_IS(components[28]);
    this.transfer_to_bad_debt_code = components => datatypes.parse_IS(components[29]);
    this.transfer_to_bad_debt_date = components => datatypes.parse_DT(components[30]);
    this.bad_debt_agency_code = components => datatypes.parse_IS(components[31]);
    this.bad_debt_transfer_amount = components => datatypes.parse_NM(components[32]);
    this.bad_debt_recovery_amount = components => datatypes.parse_NM(components[33]);
    this.delete_account_indicator = components => datatypes.parse_IS(components[34]);
    this.delete_account_date = components => datatypes.parse_DT(components[35]);
    this.discharge_disposition = components => datatypes.parse_IS(components[36]);
    this.discharged_to = components => datatypes.parse_CM(components[37]);
    this.diet_type = components => datatypes.parse_IS(components[38]);
    this.servicing_facility = components => datatypes.parse_IS(components[39]);
    this.bed_status = components => datatypes.parse_IS(components[40]);
    this.account_status = components => datatypes.parse_IS(components[41]);
    this.pending_location = components => datatypes.parse_PL(components[42]);
    this.prior_temp_location = components => datatypes.parse_PL(components[43]);
    this.admit_date = components => datatypes.parse_TS(components[44]);
    this.discharged_date = components => datatypes.parse_TS(components[45]);
    this.current_balance = components => datatypes.parse_NM(components[46]);
    this.total_charges = components => datatypes.parse_NM(components[47]);
    this.total_adjustments = components => datatypes.parse_NM(components[48]);
    this.total_payments = components => datatypes.parse_NM(components[49]);
  },
  pv2_template: function pv2_template() {
    this.prior_pending_location = components => datatypes.parse_PL(components[1]);
    this.accommodation_code = components => datatypes.parse_CE(components[2]);
    this.admit_reason = components => datatypes.parse_CE(components[3]);
    this.transfer_reason = components => datatypes.parse_CE(components[4]);
    this.pateint_valuables = components => datatypes.parse_ST(components[5]);
    this.pateint_valuables_location = components => datatypes.parse_ST(components[6]);
    this.visit_user_code = components => datatypes.parse_IS(components[7]);
    this.expected_admit_date = components => datatypes.parse_TS(components[8]);
    this.expected_discharge_date = components => datatypes.parse_TS(components[9]);
    this.estimated_length_of_inpatient_stay = components => datatypes.parse_NM(components[10]);
    this.actual_length_of_inpatient_stay = components => datatypes.parse_(components[11]);
    this.visit_description = components => datatypes.parse_ST(components[12]);
    this.referral_source_code = components => datatypes.parse_XCN(components[13]);
    this.previous_service_date = components => datatypes.parse_DT(components[14]);
    this.employment_illness_related_indicator = components => datatypes.parse_ID(components[15]);
    this.purge_status_code = components => datatypes.parse_IS(components[16]);
    this.purge_status_date = components => datatypes.parse_DT(components[17]);
    this.special_program_code = components => datatypes.parse_IS(components[18]);
    this.retention_indicator = components => datatypes.parse_ID(components[19]);
    this.expected_number_of_insurance_plans = components => datatypes.parse_NM(components[20]);
    this.visit_publicity_code = components => datatypes.parse_IS(components[21]);
    this.visit_protection_indicator = components => datatypes.parse_ID(components[22]);
    this.clinic_organization_name = components => datatypes.parse_XON(components[23]);
    this.patient_status_code = components => datatypes.parse_IS(components[24]);
    this.visit_priority_code = components => datatypes.parse_IS(components[25]);
    this.previous_treatment_date = components => datatypes.parse_DT(components[26]);
    this.expected_discharge_disposition = components => datatypes.parse_IS(components[27]);
    this.signature_on_file_date = components => datatypes.parse_DT(components[28]);
    this.first_similar_illness_date = components => datatypes.parse_DT(components[29]);
    this.patient_charge_adjustment_code = components => datatypes.parse_IS(components[30]);
    this.recurring_service_code = components => datatypes.parse_IS(components[31]);
    this.billing_media_code = components => datatypes.parse_ID(components[32]);
    this.expected_surgery_date = components => datatypes.parse_TS(components[33]);
    this.military_partnership_code = components => datatypes.parse_ID(components[34]);
    this.military_nonavailability_code = components => datatypes.parse_ID(components[35]);
    this.newborn_baby_indicator = components => datatypes.parse_ID(components[36]);
    this.baby_detained_indicator = components => datatypes.parse_ID(components[37]);
  }
};

module.exports = templates;
