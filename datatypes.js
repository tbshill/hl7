const moment = require('moment');
function getLevel(level) {
  const _level = level || 'F';
  let delim;
  let sub_level;
  switch (_level) {
    case 'F':
      delim = '^';
      sub_level = 'C';
      break;
    case 'C':
      delim = '&';
      sub_level = '';
    default:
      break;
  }

  return { delim: delim, sub_level: sub_level };
}

const datatypes = {
  parse_ST: function parse_ST(data = '', level) {
    return data || '';
  },
  to_ST: function to_ST(data = '', level) {
    return data;
  },
  parse_TX: function parse_TX(data = '', level) {
    return data;
  },
  to_TX: function parse_TX(data = '', level) {
    return data;
  },
  parse_FT: function parse_FT(data = '', level) {
    return data;
  },
  to_FT: function to_FT(data = '', level) {
    return data;
  },
  //what does this do?
  // Numeric
  parse_NM: function parse_NM(data = '', level) {
    return Number(data) || '';
  },
  parse_MO: function parse_MO(data = '', level) {
    const levelData = getLevel(level);
    const delim = levelData.delim;
    const sub_level = levelData.sub_level;

    const components = data.split(delim);
    let ret = {};
    ret.quantity = this.parse_NM(components[0], sub_level) || '';
    ret.denomination = this.parse_ID(components[1], sub_level) || '';
    return ret;
  },
  // Date/Time
  parse_TS: function parse_TS(data = '', level) {
    const levelData = getLevel(level);
    const delim = levelData.delim;
    const sub_level = levelData.sub_level;

    const components = data.split(delim);
    let ret = {};
    const date = moment(components[0], 'YYYYMMDDHHmmssSSSZZ');
    if (date.isValid()) {
      ret.time = date.toDate();
    } else {
      ret.time = '';
    }

    ret.precision = components[1] || '';
    return ret;
  },

  // Code Values
  parse_CE: function parse_CE(data = '', level) {
    //   Components: <identifier (ST)> ^ <text (ST)> ^ <name of coding system (ST)> ^ <alternate identifier (ST)> ^ <alternate text (ST)> ^ <name of alternate coding system (ST)>
    const levelData = getLevel(level);
    const delim = levelData.delim;
    const sub_level = levelData.sub_level;

    const components = data.split(delim);
    let ret = {};
    ret.identifier = this.parse_ST(components[0], sub_level) || '';
    ret.text = this.parse_ST(components[1], sub_level) || '';
    ret.coding_system = this.parse_ST(components[2], sub_level) || '';
    ret.alternate_id = this.parse_ST(components[3], sub_level) || '';
    ret.alternate_text = this.parse_ST(components[4], sub_level) || '';
    ret.alternate_coding_system = this.parse_ST(components[5], sub_level) || '';
    return ret;
  },

  parse_CQ: function parse_CQ(data = '', level) {
    // Components: <quantity (NM)> ^ <units (CE)>
    const levelData = getLevel(level);
    const delim = levelData.delim;
    const sub_level = levelData.sub_level;
    const sub_components = data.split(delim);
    let ret = {};
    ret.quantity = this.parse_NM(sub_components[0], sub_level) || '';
    ret.units = this.parse_CE(sub_components[1], sub_level) || '';
    return ret;
  },
  // Generic
  parse_CM: function parse_CM(data, callabck) {
    return callabck(data);
  },

  // Identifiers
  parse_ID: function parse_ID(data = '', level) {
    return this.parse_ST(data, level) || '';
  },
  parse_HD: function parse_HD(data = '', level) {
    //<namespace ID (IS)> ^ <universal ID (ST)> ^ <universal ID type (ID)>
    const levelData = getLevel(level);
    const delim = levelData.delim;
    const sub_level = levelData.sub_level;

    const components = data.split(delim);
    let ret = {};

    ret.namespace_id = this.parse_IS(components[0], sub_level) || '';
    ret.universal_id = this.parse_ST(components[1], sub_level) || '';
    ret.universal_id_type = this.parse_ID(components[2], sub_level) || '';
    return ret;
  },
  parse_IS: function parse_IS(data = '', level) {
    return data;
  },
  parse_PT: function parse_PT(data = '', level) {
    const levelData = getLevel(level);
    const delim = levelData.delim;
    const sub_level = levelData.sub_level;

    const components = data.split(delim);
    let ret = {};
    ret.id = this.parse_ID(components[0]) || '';
    ret.mode = this.parse_ID(components[1]) || '';
    return ret;
  },
  //Demographics
  parse_PN: function parse_PN(data = '', level) {
    // <family name (ST)> ^ <given name (ST)> ^ <middle initial or name (ST)> ^ <suffix (e.g., JR or III) (ST)> ^
    // <prefix (e.g., DR) (ST)> ^ <degree (e.g., MD) (ST)>
    const levelData = getLevel(level);
    const delim = levelData.delim;
    const sub_level = levelData.sub_level;

    const components = data.split(delim);
    let ret = {};

    ret.family = this.parse_ST(components[0], sub_level) || '';
    ret.given = this.parse_ST(components[1], sub_level) || '';
    ret.middle = this.parse_ST(components[2], sub_level) || '';
    ret.suffix = this.parse_ST(components[3], sub_level) || '';
    ret.prefix = this.parse_ST(components[4], sub_level) || '';
    ret.degree = this.parse_ST(components[5], sub_level) || '';
    return ret;
  },
  parse_AD: function parse_AD(data = '', level) {
    //Components: <street address (ST)> ^ < other designation (ST)> ^ <city (ST)> ^ <state or province (ST)> ^
    // <zip or postal code (ST)> ^ <country (ID)> ^ <address type (ID)> ^ <other geographic designation (ST)>

    const levelData = getLevel(level);
    const delim = levelData.delim;
    const sub_level = levelData.sub_level;

    const components = data.split(delim);
    let ret = {};

    ret.street = this.parse_ST(components[0], sub_level) || '';
    ret.other = this.parse_ST(components[1], sub_level) || '';
    ret.city = this.parse_ST(components[2], sub_level) || '';
    ret.state = this.parse_ST(components[3], sub_level) || '';
    ret.zip = this.parse_ST(components[4], sub_level) || '';
    ret.country = this.parse_ID(components[5], sub_level) || '';
    ret.type = this.parse_ID(components[6], sub_level) || '';
    ret.other_geograpic = this.parse_ST(components[7], sub_level) || '';

    return ret;
  },
  parse_TN: function parse_TN(data = '', level) {
    return data;
  },
  parse_XAD: function parse_XAD(data = '', level) {
    // In Version 2.3, replaces the AD data type. <street address (ST)> ^ <other designation (ST)> ^ <city (ST)> ^ <state or province (ST)> ^ <zip or postal code (ST)> ^ <country (ID)> ^
    // < address type (ID)> ^ <other geographic designation (ST)> ^ <county/parish code(IS) > ^ <census tract (IS) >
    const levelData = getLevel(level);
    const delim = levelData.delim;
    const sub_level = levelData.sub_level;

    const components = data.split(delim);
    let ret = {};

    ret.street = this.parse_ST(components[0], sub_level) || '';
    ret.other = this.parse_ST(components[1], sub_level) || '';
    ret.city = this.parse_ST(components[2], sub_level) || '';
    ret.state = this.parse_ST(components[3], sub_level) || '';
    ret.zip = this.parse_ST(components[4], sub_level) || '';
    ret.country = this.parse_ID(components[5], sub_level) || '';
    ret.type = this.parse_ID(components[6], sub_level) || '';
    ret.other_geograpic = this.parse_ST(components[7], sub_level) || '';
    ret.county = this.parse_IS(components[8], sub_level) || '';
    ret.census_tract = this.parse_IS(components[9], sub_level) || '';

    return ret;
  },
  parse_XPN: function parse_XPN(data = '', level) {
    //  <family name (ST) > ^ <given name (ST) > ^ <middle initial or name (ST) > ^ <suffix (e.g., JR or III) (ST) > ^ <prefix (e.g., DR)(ST) > ^
    // <degree (e.g., MD)(ST) > ^ <name type code (ID) > ^ <name representation code (ID) >
    const levelData = getLevel(level);
    const delim = levelData.delim;
    const sub_level = levelData.sub_level;

    const components = data.split(delim);
    let ret = {};

    ret.family = this.parse_ST(components[0], sub_level) || '';
    ret.given = this.parse_ST(components[1], sub_level) || '';
    ret.middle = this.parse_ST(components[2], sub_level) || '';
    ret.suffix = this.parse_ST(components[3], sub_level) || '';
    ret.prefix = this.parse_ST(components[4], sub_level) || '';
    ret.degree = this.parse_ST(components[5], sub_level) || '';
    ret.type = this.parse_ID(components[6], sub_level) || '';
    ret.representation = this.parse_ID(components[7], sub_level) || '';
    return ret;
  },
  parse_XON: function parse_XON(data = '', level) {
    //Components: <organization name (ST)> ^ <organization name type code (IS)> ^ <ID Number (NM)> ^ <check digit (NM)> ^ <code identifying the check digit scheme employed (ID)>
    //  ^ <assigning authority (HD)> ^ <identifier type code (IS)> ^ <assigning facility ID (HD)>

    //Subcomponents of assigning authority: <namespace ID (IS) > & <universal ID (ST) > & <universal ID type (ID) >
    //Subcomponents of assigning facility: <namespace ID (IS) > & <universal ID (ST) > & <universal ID type (ID) >

    const levelData = getLevel(level);
    const delim = levelData.delim;
    const sub_level = levelData.sub_level;

    const components = data.split(delim);

    let ret = {};

    ret.organization_name = this.parse_ST(components[0], sub_level) || '';
    ret.organization_type = this.parse_IS(components[1], sub_level) || '';
    ret.id = this.parse_NM(components[2], sub_level) || '';
    ret.check_digit = this.parse_NM(components[3], sub_level) || '';
    ret.check_digit_scheme = this.parse_ID(components[4], sub_level) || '';
    ret.assigning_authority = this.parse_HD(components[5], sub_level) || '';
    ret.identifier_type = this.parse_IS(components[6], sub_level) || '';
    ret.assigning_facility_id = this.parse_HD(components[7], sub_level) || '';

    return ret;
  },

  parse_SI: function parse_SI(data = '', level) {
    return this.parse_NM(data, level);
  },
  parse_CX: function parse_CX(data = '', level) {
    // <ID (ST)> ^ <check digit (ST)> ^ <code identifying the check digit scheme employed (ID)> ^
    // < assigning authority (HD) )> ^ <identifier type code (IS)> ^ < assigning facility (HD)
    const levelData = getLevel(level);
    const delim = levelData.delim;
    const sub_level = levelData.sub_level;

    const components = data.split(delim);

    let ret = {};

    ret.id = this.parse_ST(components[0], sub_level);
    ret.check_digit = this.parse_ST(components[1], sub_level);
    ret.check_digit_schema_code = this.parse_ID(components[2], sub_level);
    ret.assigning_authority = this.parse_HD(components[3], sub_level);
    ret.identifier_code = this.parse_IS(components[4], sub_level);
    ret.assigning_facility = this.parse_HD(components[5], sub_level);

    return ret;
  },
  parse_XTN: function parse_XTN(data = '', level) {
    // [NNN] [(999)]999-9999 [X99999] [B99999] [C any text] ^ <telecommunication use code (ID)> ^
    // <telecommunication equipment type (ID)> ^ <email address (ST)> ^ <country code (NM)> ^ <area/city code (NM)> ^
    // <phone number (NM)> ^ <extension (NM)> ^ <any text (ST)>

    const levelData = getLevel(level);
    const delim = levelData.delim;
    const sub_level = levelData.sub_level;

    const components = data.split(delim);

    let ret = {};

    ret.number = this.parse_TN(components[0]);
    ret.telecommunication_code = this.parse_ID(components[1]);
    ret.telecommunication_equipment_type = this.parse_ID(components[2]);
    ret.email = this.parse_ST(components[3]);
    ret.country_code = this.parse_NM(components[4]);
    ret.area_code = this.parse_NM(components[5]);
    ret.phone_number = this.parse_NM(components[6]);
    ret.extension = this.parse_NM(components[7]);
    ret.text = this.parse_ST(components[8]);

    return ret;
  },
  parse_DLN: function parse_DLN(data = '', level) {
    // <license number (ST) > ^ <issuing state, province, country (IS) > ^ <expiration date (DT
    const levelData = getLevel(level);
    const delim = levelData.delim;
    const sub_level = levelData.sub_level;

    const components = data.split(delim);

    let ret = {};
    ret.number = this.parse_ST(components[0]);
    ret.state = this.parse_IS(components[1]);
    ret.expiration = this.parse_DT(components[2]);
    return ret;
  },
  parse_DT: function parse_DT(data = '', level) {
    const date = moment(data, 'YYYYMMDDHH');
    if (date.isValid()) {
      return date.toDate();
    } else {
      return '';
    }
  },
  parse_EI: function parse_EI(data = '', level) {
    // <entity identifier (ST)> ^ <namespace ID (IS)> ^ <universal ID (ST)> ^ <universal ID type (ID)>
    const levelData = getLevel(level);
    const delim = levelData.delim;
    const sub_level = levelData.sub_level;

    const components = data.split(delim);

    let ret = {};

    ret.identifier = this.parse_ST(components[0], sub_level);
    ret.namespace_id = this.parse_IS(components[1], sub_level);
    ret.universal_id = this.parse_ST(components[2], sub_level);
    ret.universal_id_type = this.parse_ID(components[3], sub_level);
    return ret;
  },
  parse_PL: function parse_PL(data = '', level) {
    //<point of care (IS )> ^ <room (IS )> ^ <bed (IS)> ^ <facility (HD)> ^ < location status (IS )> ^ <person location type (IS)> ^ <building (IS )> ^ <floor (IS )> ^ <location description (ST)>
    const levelData = getLevel(level);
    const delim = levelData.delim;
    const sub_level = levelData.sub_level;

    const components = data.split(delim);

    let ret = {};
    ret.point_of_care = this.parse_IS(components[0], sub_level);
    ret.room = this.parse_IS(components[1], sub_level);
    ret.bed = this.parse_IS(components[2], sub_level);
    ret.facility = this.parse_HD(components[3], sub_level);
    ret.location_status = this.parse_IS(components[4], sub_level);
    ret.person_location_type = this.parse_IS(components[5], sub_level);
    ret.building = this.parse_IS(components[6], sub_level);
    ret.floor = this.parse_IS(components[7], sub_level);
    ret.location_description = this.parse_ST(components[8], sub_level);

    return ret;
  },
  prase_TQ: function parse_TQ(data = '', level) {
    //<quantity (CQ)> ^ <interval (*)> ^ <duration (*)> ^ <start date/time (TS)> ^ <end date/time (TS)> ^ <priority (ID)> ^ <condition (ST)> ^ <text (TX)> ^ <conjunction (ID)> ^ <order sequencing (*)>

    const levelData = getLevel(level);
    const delim = levelData.delim;
    const sub_level = levelData.sub_level;

    const components = data.split(delim);

    let ret = {};
    ret.quantity = this.parse_CQ(components[0], sub_level);
    ret.interval = components[1]; // not sure what (*) denotes in the standard //TODO: Find out what (*) means
    ret.duration = components[2]; // not sure what(*) denotes in the standard
    ret.start_time = this.parse_TS(components[3], sub_level);
    ret.end_time = this.parse_TS(components[4], sub_level);
    ret.priority = this.parse_ID(components[5], sub_level);
    ret.condition = this.parse_ST(components[6], sub_level);
    ret.text = this.parse_TX(components[7], sub_level);
    ret.conjunction = this.parse_ID(components[8], sub_level);
    ret.order_sequencing = components[9]; // not sure what (*) denotes in the standard

    return ret;
  },
  parse_FC: function parse_FC(data = '', level) {
    const levelData = getLevel(level);
    const delim = levelData.delim;
    const sub_level = levelData.sub_level;

    const components = data.split(delim);

    let ret = {};
    ret.id = this.parse_ID(components[0], sub_level);
    ret.effective_date = this.parse_TS(components[1], sub_level);
    return ret;
  },
  parse_XCN: function parse_XCN(data = '', level) {
    //Components: <ID number (ST)> ^ <family name (ST)> ^ <given name (ST)> ^ <middle initial or name (ST)> ^ <suffix (e.g., JR or III) (ST)> ^
    // <prefix (e.g., DR) (ST)> ^ <degree (e.g., MD) (ST)> ^ <source table (IS)> ^ <assigning authority (HD)> ^ <name type code(ID)> ^
    // <identifier check digit (ST)> ^ <code identifying the check digit scheme employed (ID )> ^ <identifier type code (IS)> ^
    // <assigning facility (HD)>

    // Subcomponents of assigning authority: <namespace ID (IS) > & <universal ID (ST) > & <universal ID type (ID) >
    // Subcomponents of assigning facility: <namespace ID (IS) > & <universal ID (ST) > & <universal ID type (ID) >
    const levelData = getLevel(level);
    const delim = levelData.delim;
    const sub_level = levelData.sub_level;

    const components = data.split(delim);

    let ret = {};

    ret.components = this.parse_ID(components[0], sub_level);
    ret.family_name = this.parse_ST(components[1], sub_level);
    ret.given_name = this.parse_ST(components[2], sub_level);
    ret.middle_name = this.parse_ST(components[3], sub_level);
    ret.suffix = this.parse_ST(components[3], sub_level);
    ret.prefix = this.parse_ST(components[4], sub_level);
    ret.degree = this.parse_ST(components[5], sub_level);
    ret.source_table = this.parse_IS(components[6], sub_level);
    ret.assigning_authority = this.parse_HD(components[7], sub_level);
    ret.name_type_code = this.parse_ID(components[8], sub_level);
    ret.identifier_check_digit = this.parse_ST(components[9], sub_level);
    ret.id_of_checkdigit_scheme = this.parse_ID(components[10], sub_level);
    ret.identifier_code = this.parse_IS(components[11], sub_level);
    ret.assigning_facility = this.parse_HD(components[12], sub_level);

    return ret;
  },
  parse_CP: function parse_CP(data = '', level) {
    //<price (MO)> ^ <price type (ID)> ^ <from value (NM)> ^ <to value (NM)> ^ <range units (CE)> ^ <range type (ID)>
    const levelData = getLevel(level);
    const delim = levelData.delim;
    const sub_level = levelData.sub_level;

    const components = data.split(delim);

    let ret = {};
    this.price = this.parse_MO(components[0], sub_level);
    this.price_type = this.parse_ID(components[1], sub_level);
    this.from_value = this.parse_NM(components[2], sub_level);
    this.to_value = this.parse_NM(components[3], sub_level);
    this.range_units = this.parse_CE(components[4], sub_level);
    this.range_type = this.parse_ID(components[5], sub_level);

    return ret;
  },
  parse_JCC: function parse_JCC(data = '', level) {
    //<job code (IS)> ^ <job class (IS)>
    const levelData = getLevel(level);
    const delim = levelData.delim;
    const sub_level = levelData.sub_level;

    const components = data.split(delim);

    let ret = {};

    // this.job_code = this.parse_IS(components[0], sub_level);
    // this.job_class = this.parse_IS(components[1], sub_level);

    return ret;
  },
  parse_TQ: function parse_TQ(data = '', level) {
    //<quantity (CQ)> ^ <interval (*)> ^ <duration (*)> ^ <start date/time (TS)> ^
    // <end date/time (TS)> ^ <priority (ID)> ^ <condition (ST)> ^ <text (TX)> ^ <conjunction (ID)> ^ <order sequencing (*)>
    const levelData = getLevel(level);
    const delim = levelData.delim;
    const sub_level = levelData.sub_level;

    const components = data.split(delim);

    let ret = {};
    ret.quantity = this.parse_CQ(components[0], sub_level);
    ret.interval = this.parse_FT(components[1], sub_level);
    ret.duration = this.parse_FT(components[2], sub_level);
    ret.start_date = this.parse_TS(components[3], sub_level);
    ret.end_date = this.parse_TS(components[4], sub_level);
    ret.priority = this.parse_ID(components[5], sub_level);
    ret.condition = this.parse_ST(components[6], sub_level);
    ret.text = this.parse_TX(components[7], sub_level);
    ret.conjunction = this.parse_ID(components[8], sub_level);
    ret.order_sequencing = this.parse_FT(components[9], sub_level);
    return ret;
  }
};

module.exports = datatypes;
