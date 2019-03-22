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
        ret.type = datatypes.parse_ST(components[0]) || '';
        ret.event = datatypes.parse_ST(components[1]) || '';
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
    this.principle_language = components => datatypes.parse_CE(components[18]);
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
  orc_template: function orc_template() {
    this.order_control = components => datatypes.parse_ID(components[1]);
    this.placer_order_number = components => datatypes.parse_EI(components[2]);
    this.filler_order_number = components => datatypes.parse_EI(components[3]);
    this.placer_group_number = components => datatypes.parse_EI(components[4]);
    this.order_status = components => datatypes.parse_ID(components[5]);
    this.response_flag = components => datatypes.parse_ID(components[6]);
    this.quanity_timing = components => datatypes.parse_TQ(components[7]);
    this.parent = components => datatypes.parse_CM(components[8]); // TODO: BUILD CM Callback
    this.transaction_date = components => datatypes.parse_TS(components[9]);
    this.entered_by = components => datatypes.parse_XCN(components[10]);
    this.verified_by = components => datatypes.parse_XCN(components[11]);
    this.ordering_provider = components => datatypes.parse_XCN(components[12]);
    this.enterers_location = components => datatypes.parse_PL(components[13]);
    this.call_back_number = components => datatypes.parse_XTN(components[14]);
    this.order_effective_date = components => datatypes.parse_TS(components[15]);
    this.order_control_code_reason = components => datatypes.parse_CE(components[16]);
    this.entering_organization = components => datatypes.parse_CE(components[17]);
    this.entering_device = components => datatypes.parse_CE(components[18]);
    this.action_by = components => datatypes.parse_XCN(components[19]);
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
    this.assigned_location = components => datatypes.parse_PL(components[3]);
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
    this.financial_class = components => datatypes.parse_FC(components[20]);
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
    this.discharged_to = components => datatypes.parse_CM(components[37]); // TODO: BUILD CM Callback
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
  },
  obr_template: function obr_template() {
    this.set_id = components => datatypes.parse_SI(components[1]);
    this.placer_order_number = components => datatypes.parse_EI(components[2]);
    this.filler_order_number = components => datatypes.parse_EI(components[3]);
    this.universal_service_id = components => datatypes.parse_CE(components[4]);
    this.priority = components => datatypes.parse_ID(components[5]);
    this.requested_time = components => datatypes.parse_TS(components[6]);
    this.observation_time = components => datatypes.parse_TS(components[7]);
    this.observation_end_time = components => datatypes.parse_TS(components[8]);
    this.collection_volume = components => datatypes.parse_CQ(components[9]);
    this.collector_identifier = components => datatypes.parse_XCN(components[10]);
    this.specimen_action_code = components => datatypes.parse_ID(components[11]);
    this.danger_code = components => datatypes.parse_CE(components[12]);
    this.relevant_clinical_info = components => datatypes.parse_ST(components[13]);
    this.specimen_recieved_time = components => datatypes.parse_TS(components[14]);
    this.specimen_source = components => datatypes.parse_CM(components[15]); // TODO: BUILD CM Callback
    this.ordering_provider = components => datatypes.parse_XCN(components[16]);
    this.order_callback_phone_number = components => datatypes.parse_XTN(components[17]);
    this.placer_feild1 = components => datatypes.parse_ST(components[18]);
    this.placer_feild2 = components => datatypes.parse_ST(components[19]);
    this.filler_feild1 = components => datatypes.parse_ST(components[20]);
    this.filler_feild2 = components => datatypes.parse_ST(components[21]);
    this.results_change_time = components => datatypes.parse_TS(components[22]);
    this.charge_to_practice = components => datatypes.parse_CM(components[23]); // TODO: BUILD CM Callback
    this.diagnostic_service_section_id = components => datatypes.parse_ID(components[24]);
    this.result_status = components => datatypes.parse_ID(components[25]);
    this.parent_result = components => datatypes.parse_CM(components[26]); // TODO: BUILD CM Callback
    this.quantity_timing = components => datatypes.parse_TQ(components[27]);
    this.result_copies_top = components => datatypes.parse_XCN(components[28]);
    this.parent = components => datatypes.parse_CM(components[29]); // TODO: BUILD CM Callback
    this.transporation_mode = components => datatypes.parse_ID(components[30]);
    this.reason_for_study = components => datatypes.parse_CE(components[31]);
    this.principal_result_interpreter = components => datatypes.parse_CM(components[32]); // TODO: BUILD CM Callback
    this.assistant_result_interpreter = components => datatypes.parse_CM(components[33]); // TODO: BUILD CM Callback
    this.technician = components => datatypes.parse_CsM(components[34]);
    this.transcriptionist = components => datatypes.parse_CM(components[35]); // TODO: BUILD CM Callback
    this.scheduled_time = components => datatypes.parse_TS(components[36]);
    this.number_of_sample_containers = components => datatypes.parse_NM(components[37]);
    this.transport_logistics_of_sample = components => datatypes.parse_CE(components[38]);
    this.collectors_comments = components => datatypes.parse_CE(components[39]);
    this.transport_arrangement_responsibility = components => datatypes.parse_CE(components[40]);
    this.transport_arranged = components => datatypes.parse_ID(components[41]);
    this.escort_required = components => datatypes.parse_ID(components[42]);
    this.planned_patient_transport_comment = components => datatypes.parse_CE(components[43]);
  },
  obx_template: function obx_template() {
    this.set_id = components => datatypes.parse_SI(components[16]);
    this.value_type = components => datatypes.parse_ID(components[2]);
    this.observation_identifier = components => datatypes.parse_CE(components[3]);
    this.observation_sub_id = components => datatypes.parse_ST(components[4]);
    this.observation_value = components => datatypes.parse_ST(components[5]); // TODO: the data type is * in the standard
    this.units = components => datatypes.parse_CE(components[6]);
    this.references_range = components => datatypes.parse_ST(components[7]);
    this.abnormal_flags = components => datatypes.parse_ID(components[8]);
    this.probability = components => datatypes.parse_NM(components[9]);
    this.nature_of_abnormal_test = components => datatypes.parse_ID(components[10]);
    this.observation_result_status = components => datatypes.parse_ID(components[11]);
    this.date_last_observed_normal_values = components => datatypes.parse_TS(components[12]);
    this.user_defined_access_checks = components => datatypes.parse_ST(components[13]);
    this.time_of_observation = components => datatypes.parse_TS(components[14]);
    this.producers_id = components => datatypes.parse_CE(components[15]);
    this.responsible_observer = components => datatypes.parse_XCN(components[16]);
    this.observation_method = components => datatypes.parse_CE(components[17]);
  },
  in1_template: function in1_template() {
    this.set_id = components => datatypes.parse_SI(components[1]);
    this.insurance_plan_id = components => datatypes.parse_CE(components[2]);
    this.insurance_company_id = components => datatypes.parse_CX(components[3]);
    this.insurance_company_name = components => datatypes.parse_XON(components[4]);
    this.insurance_company_address = components => datatypes.parse_XAD(components[5]);
    this.insurance_company_contact = components => datatypes.parse_XPN(components[6]);
    this.insurance_company_phone = components => datatypes.parse_XTN(components[7]);
    this.group_number = components => datatypes.parse_ST(components[8]);
    this.group_name = components => datatypes.parse_XON(components[9]);
    this.insured_group_emp_id = components => datatypes.parse_CX(components[10]);
    this.insured_group_emp_name = components => datatypes.parse_XON(components[11]);
    this.plan_effective_date = components => datatypes.parse_DT(components[12]);
    this.plan_expiration_date = components => datatypes.parse_DT(components[13]);
    this.authorization_information = components => datatypes.parse_CM(components[14]); // TODO: BUILD CM Callback
    this.plan_type = components => datatypes.parse_IS(components[15]);
    this.name_of_issued = components => datatypes.parse_XPN(components[16]);
    this.insured_replationship_to_patient = components => datatypes.parse_CE(components[17]);
    this.insured_dob = components => datatypes.parse_TS(components[18]);
    this.insured_address = components => datatypes.parse_XAD(components[19]);
    this.assignment_of_benefits = components => datatypes.parse_IS(components[20]);
    this.coordination_of_benefits = components => datatypes.parse_IS(components[21]);
    this.coordination_of_benefits_priority = components => datatypes.parse_ST(components[22]);
    this.notice_of_admission_flag = components => datatypes.parse_ID(components[23]);
    this.notice_of_admission_date = components => datatypes.parse_DT(components[24]);
    this.report_of_eligibility_flag = components => datatypes.parse_IS(components[25]);
    this.report_of_eligibility_date = components => datatypes.parse_DT(components[26]);
    this.release_information_code = components => datatypes.parse_IS(components[27]);
    this.pac = components => datatypes.parse_ST(components[28]);
    this.verification_time = components => datatypes.parse_tS(components[29]);
    this.verification_by = components => datatypes.parse_XCN(components[30]);
    this.type_of_agreement_code = components => datatypes.parse_IS(components[31]);
    this.billing_status = components => datatypes.parse_IS(components[32]);
    this.lifetime_reserve_days = components => datatypes.parse_NM(components[33]);
    this.delay_before_lifetime_reserve_day = components => datatypes.parse_NM(components[34]);
    this.company_plan_code = components => datatypes.parse_IS(components[35]);
    this.policy_number = components => datatypes.parse_ST(components[36]);
    this.policy_deductible = components => datatypes.parse_CP(components[37]);
    this.policy_limit_amount = components => datatypes.parse_CP(components[38]);
    this.policy_limit_days = components => datatypes.parse_NM(components[39]);
    this.room_rate_semiprivate = components => datatypes.parse_CP(components[40]);
    this.room_rate_private = components => datatypes.parse_CP(components[41]);
    this.insured_employment_status = components => datatypes.parse_CE(components[42]);
    this.insured_sex = components => datatypes.parse_IS(components[43]);
    this.insured_employer_address = components => datatypes.parse_XAD(components[44]);
    this.verification_status = components => datatypes.parse_ST(components[45]);
    this.prior_insurance_plan_id = components => datatypes.parse_IS(components[46]);
    this.coverage_type = components => datatypes.parse_IS(components[47]);
    this.handicap = components => datatypes.parse_IS(components[48]);
    this.insureds_id_number = components => datatypes.parse_CX(components[49]);
  },
  in2_template: function in2_template() {
    this.insureds_employee_id = components => datatypes.parse_CX(components[1]);
    this.insureds_social_security_number = components => datatypes.parse_ST(components[2]);
    this.insureds_employer_name = components => datatypes.parse_XCN(components[3]);
    this.employer_information_data = components => datatypes.parse_IS(components[4]);
    this.mail_claim_party = components => datatypes.parse_IS(components[5]);
    this.medicare_health_ins_card_number = components => datatypes.parse_ST(components[6]);
    this.medicaid_case_name = components => datatypes.parse_XPN(components[7]);
    this.medicaid_case_number = components => datatypes.parse_ST(components[8]);
    this.champus_sponsor_name = components => datatypes.parse_XPN(components[9]);
    this.champus_id_number = components => datatypes.parse_ST(components[10]);
    this.dependent_of_champus_recipient = components => datatypes.parse_CE(components[11]);
    this.champus_organization = components => datatypes.parse_ST(components[12]);
    this.champus_station = components => datatypes.parse_ST(components[13]);
    this.champus_service = components => datatypes.parse_IS(components[14]);
    this.champus_rank_grade = components => datatypes.parse_IS(components[15]);
    this.champus_status = components => datatypes.parse_IS(components[16]);
    this.champus_retire_date = components => datatypes.parse_DT(components[17]);
    this.champus_nonavail_cert_on_file = components => datatypes.parse_ID(components[18]);
    this.baby_coverage = components => datatypes.parse_ID(components[19]);
    this.combine_baby_bill = components => datatypes.parse_ID(components[20]);
    this.blood_deductible = components => datatypes.parse_ST(components[21]);
    this.special_coverage_approval_name = components => datatypes.parse_XPN(components[22]);
    this.special_coverage_approval_title = components => datatypes.parse_ST(components[23]);
    this.noncovered_insurance_code = components => datatypes.parse_ST(components[24]);
    this.payor_id = components => datatypes.parse_CX(components[25]);
    this.payor_subscriber_id = components => datatypes.parse_CX(components[26]);
    this.eligibility_source = components => datatypes.parse_IS(components[27]);
    this.room_coverage_type_amount = components => datatypes.parse_CM(components[28]); // TODO: BUILD CM Callback
    this.policy_type_amount = components => datatypes.parse_CM(components[29]); // TODO: BUILD CM Callback
    this.daily_deductible = components => datatypes.parse_CM(components[30]); // TODO: BUILD CM Callback
    this.living_dependency = components => datatypes.parse_IS(components[31]);
    this.ambulatory_status = components => datatypes.parse_IS(components[32]);
    this.citizenship = components => datatypes.parse_IS(components[33]);
    this.primary_language = components => datatypes.parse_CE(components[34]);
    this.living_arrangement = components => datatypes.parse_IS(components[35]);
    this.publicity_indicator = components => datatypes.parse_CE(components[36]);
    this.protection_indicator = components => datatypes.parse_ID(components[37]);
    this.student_indicator = components => datatypes.parse_IS(components[38]);
    this.religion = components => datatypes.parse_IS(components[39]);
    this.mothers_maiden_name = components => datatypes.parse_XPN(components[40]);
    this.nationality_code = components => datatypes.parse_CE(components[41]);
    this.ethnic_group = components => datatypes.parse_IS(components[42]);
    this.marital_status = components => datatypes.parse_IS(components[43]);
    this.employment_start_date = components => datatypes.parse_DT(components[44]);
    this.employment_stop_date = components => datatypes.parse_DT(components[45]);
    this.job_title = components => datatypes.parse_ST(components[46]);
    this.job_code = components => datatypes.parse_JCC(components[47]);
    this.job_status = components => datatypes.parse_IS(components[48]);
    this.employer_contact_person_name = components => datatypes.parse_XPN(components[49]);
    this.employer_contact_person_phone_number = components => datatypes.parse_XTN(components[50]);
    this.employer_contact_reason = components => datatypes.parse_IS(components[51]);
    this.insureds_contact_persons_name = components => datatypes.parse_XPN(components[52]);
    this.insureds_contact_person_telephone_number = components =>
      datatypes.parse_XTN(components[53]);
    this.insureds_contact_person_reason = components => datatypes.parse_IS(components[54]);
    this.relationship_to_the_patient_start_date = components => datatypes.parse_DT(components[55]);
    this.relationship_to_the_patient_stop_date = components => datatypes.parse_DT(components[56]);
    this.insurance_co_contact_reason = components => datatypes.parse_IS(components[57]);
    this.insurance_co_contact_phone_number = components => datatypes.parse_XTN(components[58]);
    this.policy_scope = components => datatypes.parse_IS(components[59]);
    this.policy_source = components => datatypes.parse_IS(components[60]);
    this.patient_member_number = components => datatypes.parse_CX(components[61]);
    this.guarantors_relationship_to_insured = components => datatypes.parse_IS(components[62]);
    this.insureds_telephone_number_home = components => datatypes.parse_XTN(components[63]);
    this.insureds_employer_telephone_number = components => datatypes.parse_XTN(components[64]);
    this.military_handicapped_program = components => datatypes.parse_CE(components[65]);
    this.suspend_flag = components => datatypes.parse_ID(components[66]);
    this.co_pay_limit_flag = components => datatypes.parse_ID(components[67]);
    this.stoploss_limit_flag = components => datatypes.parse_ID(components[68]);
    this.insured_organization_name_and_id = components => datatypes.parse_XON(components[69]);
    this.insured_employer_organization_name_and_id = components =>
      datatypes.parse_XON(components[70]);
    this.race = components => datatypes.parse_IS(components[71]);
    this.patient_relationship_to_insured = components => datatypes.parse_ID(components[72]);
  },
  in3_template: function in3_template() {
    this.set_id = components => datatypes.parse_SI(components[1]);
    this.certification_number = components => datatypes.parse_CX(components[2]);
    this.certified_by = components => datatypes.parse_XCN(components[3]);
    this.certification_required = components => datatypes.parse_ID(components[4]);
    this.penalty = components => datatypes.parse_CM(components[5]); // TODO: BUILD CM Callback
    this.certification_time = components => datatypes.parse_TS(components[6]);
    this.certification_modified = components => datatypes.parse_TS(components[7]);
    this.operator = components => datatypes.parse_XCN(components[8]);
    this.certificaiton_begin_date = components => datatypes.parse_DT(components[9]);
    this.certification_end_date = components => datatypes.parse_DT(components[10]);
    this.days = components => datatypes.parse_CM(components[11]); // TODO: BUILD CM Callback
    this.nonconcur_code = components => datatypes.parse_CE(components[12]);
    this.nonconcur_effective_time = components => datatypes.parse_TS(components[13]);
    this.physician_reviewer = components => datatypes.parse_XCN(components[14]);
    this.certification_contact = components => datatypes.parse_ST(components[15]);
    this.certificaiton_contact_phone = components => datatypes.parse_XTN(components[16]);
    this.appeal_reason = components => datatypes.parse_CE(components[17]);
    this.certification_agency = components => datatypes.parse_CE(components[18]);
    this.certification_agency_phone = components => datatypes.parse_XTN(components[19]);
    this.precertification_required = components => datatypes.parse_CM(components[20]); // TODO: BUILD CM Callback
    this.case_manager = components => datatypes.parse_ST(components[21]);
    this.second_opinion_date = components => datatypes.parse_DT(components[22]);
    this.second_opinion_status = components => datatypes.parse_IS(components[23]);
    this.second_opinion_documentation_recieved = components => datatypes.parse_IS(components[24]);
    this.second_opinion_physician = components => datatypes.parse_XCN(components[25]);
  },
  gt1_template: function gt1_template() {
    this.set_id = components => datatypes.parse_SI(components[1]);
    this.number = components => datatypes.parse_CX(components[2]);
    this.name = components => datatypes.parse_XPN(components[3]);
    this.spouse_name = components => datatypes.parse_XPN(components[4]);
    this.address = components => datatypes.parse_XAD(components[5]);
    this.home_phone_ = components => datatypes.parse_XTN(components[6]);
    this.business_phone = components => datatypes.parse_XTN(components[7]);
    this.dob = components => datatypes.parse_TS(components[8]);
    this.sex = components => datatypes.parse_IS(components[9]);
    this.type = components => datatypes.parse_IS(components[10]);
    this.relationship = components => datatypes.parse_IS(components[11]);
    this.ssn = components => datatypes.parse_ST(components[12]);
    this.begin_date = components => datatypes.parse_DT(components[13]);
    this.end_date = components => datatypes.parse_DT(components[14]);
    this.priority = components => datatypes.parse_NM(components[15]);
    this.employer_name = components => datatypes.parse_XPN(components[16]);
    this.employer_address = components => datatypes.parse_XAD(components[17]);
    this.employ_phone_number = components => datatypes.parse_XTN(components[18]);
    this.employee_id_number = components => datatypes.parse_CX(components[19]);
    this.employment_status = components => datatypes.parse_IS(components[20]);
    this.organization = components => datatypes.parse_XON(components[21]);
    this.billing_hold_flag = components => datatypes.parse_ID(components[22]);
    this.credit_rating_code = components => datatypes.parse_CE(components[23]);
    this.death_date_and_time = components => datatypes.parse_TS(components[24]);
    this.death_flag = components => datatypes.parse_ID(components[25]);
    this.charge_adjustment_code = components => datatypes.parse_CE(components[26]);
    this.household_annual_income = components => datatypes.parse_CP(components[27]);
    this.household_size = components => datatypes.parse_NM(components[28]);
    this.employer_id_number = components => datatypes.parse_CX(components[29]);
    this.marital_status_code = components => datatypes.parse_IS(components[30]);
    this.hire_effective_date = components => datatypes.parse_DT(components[31]);
    this.employment_stop_date = components => datatypes.parse_DT(components[32]);
    this.living_dependency = components => datatypes.parse_IS(components[33]);
    this.ambulatory_status = components => datatypes.parse_IS(components[34]);
    this.citizenship = components => datatypes.parse_IS(components[35]);
    this.primary_language = components => datatypes.parse_CE(components[36]);
    this.living_arrangement = components => datatypes.parse_IS(components[37]);
    this.publicity_indicator = components => datatypes.parse_CE(components[38]);
    this.protection_indicator = components => datatypes.parse_ID(components[39]);
    this.student_indicator = components => datatypes.parse_IS(components[40]);
    this.religion = components => datatypes.parse_IS(components[41]);
    this.mothers_maiden_name = components => datatypes.parse_XPN(components[42]);
    this.nationality_code = components => datatypes.parse_CE(components[43]);
    this.ethnic_group = components => datatypes.parse_IS(components[44]);
    this.contact_persons_name = components => datatypes.parse_XPN(components[45]);
    this.contact_persons_telephone_number = components => datatypes.parse_XTN(components[46]);
    this.contact_reason = components => datatypes.parse_CE(components[47]);
    this.contact_relationship_code = components => datatypes.parse_IS(components[48]);
    this.job_title = components => datatypes.parse_ST(components[49]);
    this.job_code = components => datatypes.parse_JCC(components[50]);
    this.employers_organization_name = components => datatypes.parse_XON(components[51]);
    this.handicap = components => datatypes.parse_IS(components[52]);
    this.job_status = components => datatypes.parse_IS(components[53]);
    this.financial_class = components => datatypes.parse_FC(components[54]);
    this.race = components => datatypes.parse_IS(components[55]);
  },
  al1_template: function al1_template() {
    this.set_id = components => datatypes.parse_SI(components[1]);
    this.type = components => datatypes.parse_ID(components[2]);
    this.code = components => datatypes.parse_CE(components[3]);
    this.sensitivity = components => datatypes.parse_IS(components[4]);
    this.reaction = components => datatypes.parse_ST(components[5]);
    this.identification_date = components => datatypes.parse_DT(components[6]);
  },
  dg1_template: function dg1_template() {
    this.set_id = components => datatypes.parse_SI(components[1]);
    this.diagnosis_coding_method = components => datatypes.parse_ID(components[2]);
    this.diagnosis_code = components => datatypes.parse_CE(components[3]);
    this.diagnosis_description = components => datatypes.parse_ST(components[4]);
    this.diagnosis_time = components => datatypes.parse_TS(components[5]);
    this.diagnosis_type = components => datatypes.parse_IS(components[6]);
    this.major_diagnostic_category = components => datatypes.parse_CE(components[7]);
    this.diagnostic_related_group = components => datatypes.parse_CE(components[8]);
    this.drg_approval_indicator = components => datatypes.parse_ID(components[8]); // TODO: Learn what DRG stands for
    this.drg_grouper_review_code = components => datatypes.parse_(components[9]);
    this.outlier_type = components => datatypes.parse_CE(components[10]);
    this.outlier_days = components => datatypes.parse_NM(components[11]);
    this.outlier_cost = components => datatypes.parse_CP(components[12]);
    this.grouper_version_and_type = components => datatypes.parse_ST(components[13]);
    this.diagnosis_priority = components => datatypes.parse_NM(components[14]);
    this.diagnosing_clinician = components => datatypes.parse_XCN(components[15]);
    this.diagnosis_classification = components => datatypes.parse_IS(components[16]);
    this.confidential_indicator = components => datatypes.parse_ID(components[17]);
    this.attestation_time = components => datatypes.parse_TS(components[18]);
  },
  cti_template: function cti_template() {
    this.sponsor_study_id = components => datatypes.parse_EI(components[1]);
    this.study_phase_identifier = components => datatypes.parse_CE(components[2]);
    this.study_scheduled_time_point = components => datatypes.parse_CE(components[3]);
  },
  blg_template: function blg_template() {
    this.when_to_charge = components => datatypes.parse_CM(components[1]); // TODO: BUILD CM Callback
    this.charge_type = components => datatypes.parse_ID(components[2]);
    this.account_id = components => datatypes.parse_CK(components[3]);
  },
  pd1_template: function pd1_template() {
    this.living_dependency = components => datatypes.parse_IS(components[1]);
    this.living_arrangement = components => datatypes.parse_IS(components[2]);
    this.patient_primary_facility = components => datatypes.parse_XON(components[3]);
    this.patient_primary_care_provider = components => datatypes.parse_XCN(components[4]);
    this.student_indicator = components => datatypes.parse_IS(components[5]);
    this.handicap = components => datatypes.parse_IS(components[6]);
    this.living_will = components => datatypes.parse_IS(components[7]);
    this.organ_donor = components => datatypes.parse_IS(components[8]);
    this.separate_bill = components => datatypes.parse_ID(components[9]);
    this.diplicate_patient = components => datatypes.parse_CX(components[10]);
    this.publicity_indicator = components => datatypes.parse_CE(components[11]);
    this.protection_indicator = components => datatypes.parse_ID(components[12]);
  }
};

module.exports = templates;
