
let moment;
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

module.exports = {

    ST: function ST(data = '', level) {
        return data || '';
    },

    TX: function TX(data = '', level) {
        return data;
    },

    FT: function FT(data = '', level) {
        return data;
    },

    //what does this do?
    // Numeric
    NM: function NM(data = '', level) {
        return Number(data) || '';
    },
    MO: function MO(data = '', level) {
        const levelData = getLevel(level);
        const delim = levelData.delim;
        const sub_level = levelData.sub_level;

        const components = data.split(delim);
        let ret = {};
        ret.quantity = this.NM(components[0], sub_level) || '';
        ret.denomination = this.ID(components[1], sub_level) || '';
        return ret;
    },
    // Date/Time
    TS: function TS(data = '', level) {
        // Lazy load moment
        if (moment == undefined) {
            moment = require('moment');
        }
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
    CE: function CE(data = '', level) {
        //   Components: <identifier (ST)> ^ <text (ST)> ^ <name of coding system (ST)> ^ <alternate identifier (ST)> ^ <alternate text (ST)> ^ <name of alternate coding system (ST)>
        const levelData = getLevel(level);
        const delim = levelData.delim;
        const sub_level = levelData.sub_level;

        const components = data.split(delim);
        let ret = {};
        ret.identifier = this.ST(components[0], sub_level) || '';
        ret.text = this.ST(components[1], sub_level) || '';
        ret.coding_system = this.ST(components[2], sub_level) || '';
        ret.alternate_id = this.ST(components[3], sub_level) || '';
        ret.alternate_text = this.ST(components[4], sub_level) || '';
        ret.alternate_coding_system = this.ST(components[5], sub_level) || '';
        return ret;
    },

    CQ: function CQ(data = '', level) {
        // Components: <quantity (NM)> ^ <units (CE)>
        const levelData = getLevel(level);
        const delim = levelData.delim;
        const sub_level = levelData.sub_level;
        const sub_components = data.split(delim);
        let ret = {};
        ret.quantity = this.NM(sub_components[0], sub_level) || '';
        ret.units = this.CE(sub_components[1], sub_level) || '';
        return ret;
    },
    // Generic
    CM: function CM(data, callabck) {
        return callabck(data);
    },

    // Identifiers
    ID: function ID(data = '', level) {
        return this.ST(data, level) || '';
    },
    HD: function HD(data = '', level) {
        //<namespace ID (IS)> ^ <universal ID (ST)> ^ <universal ID type (ID)>
        const levelData = getLevel(level);
        const delim = levelData.delim;
        const sub_level = levelData.sub_level;

        const components = data.split(delim);
        let ret = {};

        ret.namespace_id = this.IS(components[0], sub_level) || '';
        ret.universal_id = this.ST(components[1], sub_level) || '';
        ret.universal_id_type = this.ID(components[2], sub_level) || '';
        return ret;
    },
    IS: function IS(data = '', level) {
        return data;
    },
    PT: function PT(data = '', level) {
        const levelData = getLevel(level);
        const delim = levelData.delim;
        const sub_level = levelData.sub_level;

        const components = data.split(delim);
        let ret = {};
        ret.id = this.ID(components[0]) || '';
        ret.mode = this.ID(components[1]) || '';
        return ret;
    },
    //Demographics
    PN: function PN(data = '', level) {
        // <family name (ST)> ^ <given name (ST)> ^ <middle initial or name (ST)> ^ <suffix (e.g., JR or III) (ST)> ^
        // <prefix (e.g., DR) (ST)> ^ <degree (e.g., MD) (ST)>
        const levelData = getLevel(level);
        const delim = levelData.delim;
        const sub_level = levelData.sub_level;

        const components = data.split(delim);
        let ret = {};

        ret.family = this.ST(components[0], sub_level) || '';
        ret.given = this.ST(components[1], sub_level) || '';
        ret.middle = this.ST(components[2], sub_level) || '';
        ret.suffix = this.ST(components[3], sub_level) || '';
        ret.prefix = this.ST(components[4], sub_level) || '';
        ret.degree = this.ST(components[5], sub_level) || '';
        return ret;
    },
    AD: function AD(data = '', level) {
        //Components: <street address (ST)> ^ < other designation (ST)> ^ <city (ST)> ^ <state or province (ST)> ^
        // <zip or postal code (ST)> ^ <country (ID)> ^ <address type (ID)> ^ <other geographic designation (ST)>

        const levelData = getLevel(level);
        const delim = levelData.delim;
        const sub_level = levelData.sub_level;

        const components = data.split(delim);
        let ret = {};

        ret.street = this.ST(components[0], sub_level) || '';
        ret.other = this.ST(components[1], sub_level) || '';
        ret.city = this.ST(components[2], sub_level) || '';
        ret.state = this.ST(components[3], sub_level) || '';
        ret.zip = this.ST(components[4], sub_level) || '';
        ret.country = this.ID(components[5], sub_level) || '';
        ret.type = this.ID(components[6], sub_level) || '';
        ret.other_geograpic = this.ST(components[7], sub_level) || '';

        return ret;
    },
    TN: function TN(data = '', level) {
        return data;
    },
    XAD: function XAD(data = '', level) {
        // In Version 2.3, replaces the AD data type. <street address (ST)> ^ <other designation (ST)> ^ <city (ST)> ^ <state or province (ST)> ^ <zip or postal code (ST)> ^ <country (ID)> ^
        // < address type (ID)> ^ <other geographic designation (ST)> ^ <county/parish code(IS) > ^ <census tract (IS) >
        const levelData = getLevel(level);
        const delim = levelData.delim;
        const sub_level = levelData.sub_level;

        const components = data.split(delim);
        let ret = {};

        ret.street = this.ST(components[0], sub_level) || '';
        ret.other = this.ST(components[1], sub_level) || '';
        ret.city = this.ST(components[2], sub_level) || '';
        ret.state = this.ST(components[3], sub_level) || '';
        ret.zip = this.ST(components[4], sub_level) || '';
        ret.country = this.ID(components[5], sub_level) || '';
        ret.type = this.ID(components[6], sub_level) || '';
        ret.other_geograpic = this.ST(components[7], sub_level) || '';
        ret.county = this.IS(components[8], sub_level) || '';
        ret.census_tract = this.IS(components[9], sub_level) || '';

        return ret;
    },
    XPN: function XPN(data = '', level) {
        //  <family name (ST) > ^ <given name (ST) > ^ <middle initial or name (ST) > ^ <suffix (e.g., JR or III) (ST) > ^ <prefix (e.g., DR)(ST) > ^
        // <degree (e.g., MD)(ST) > ^ <name type code (ID) > ^ <name representation code (ID) >
        const levelData = getLevel(level);
        const delim = levelData.delim;
        const sub_level = levelData.sub_level;

        const components = data.split(delim);
        let ret = {};

        ret.family = this.ST(components[0], sub_level) || '';
        ret.given = this.ST(components[1], sub_level) || '';
        ret.middle = this.ST(components[2], sub_level) || '';
        ret.suffix = this.ST(components[3], sub_level) || '';
        ret.prefix = this.ST(components[4], sub_level) || '';
        ret.degree = this.ST(components[5], sub_level) || '';
        ret.type = this.ID(components[6], sub_level) || '';
        ret.representation = this.ID(components[7], sub_level) || '';
        return ret;
    },
    XON: function XON(data = '', level) {
        //Components: <organization name (ST)> ^ <organization name type code (IS)> ^ <ID Number (NM)> ^ <check digit (NM)> ^ <code identifying the check digit scheme employed (ID)>
        //  ^ <assigning authority (HD)> ^ <identifier type code (IS)> ^ <assigning facility ID (HD)>

        //Subcomponents of assigning authority: <namespace ID (IS) > & <universal ID (ST) > & <universal ID type (ID) >
        //Subcomponents of assigning facility: <namespace ID (IS) > & <universal ID (ST) > & <universal ID type (ID) >

        const levelData = getLevel(level);
        const delim = levelData.delim;
        const sub_level = levelData.sub_level;

        const components = data.split(delim);

        let ret = {};

        ret.organization_name = this.ST(components[0], sub_level) || '';
        ret.organization_type = this.IS(components[1], sub_level) || '';
        ret.id = this.NM(components[2], sub_level) || '';
        ret.check_digit = this.NM(components[3], sub_level) || '';
        ret.check_digit_scheme = this.ID(components[4], sub_level) || '';
        ret.assigning_authority = this.HD(components[5], sub_level) || '';
        ret.identifier_type = this.IS(components[6], sub_level) || '';
        ret.assigning_facility_id = this.HD(components[7], sub_level) || '';

        return ret;
    },

    SI: function SI(data = '', level) {
        return this.NM(data, level);
    },
    CX: function CX(data = '', level) {
        // <ID (ST)> ^ <check digit (ST)> ^ <code identifying the check digit scheme employed (ID)> ^
        // < assigning authority (HD) )> ^ <identifier type code (IS)> ^ < assigning facility (HD)
        const levelData = getLevel(level);
        const delim = levelData.delim;
        const sub_level = levelData.sub_level;

        const components = data.split(delim);

        let ret = {};

        ret.id = this.ST(components[0], sub_level);
        ret.check_digit = this.ST(components[1], sub_level);
        ret.check_digit_schema_code = this.ID(components[2], sub_level);
        ret.assigning_authority = this.HD(components[3], sub_level);
        ret.identifier_code = this.IS(components[4], sub_level);
        ret.assigning_facility = this.HD(components[5], sub_level);

        return ret;
    },
    XTN: function XTN(data = '', level) {
        // [NNN] [(999)]999-9999 [X99999] [B99999] [C any text] ^ <telecommunication use code (ID)> ^
        // <telecommunication equipment type (ID)> ^ <email address (ST)> ^ <country code (NM)> ^ <area/city code (NM)> ^
        // <phone number (NM)> ^ <extension (NM)> ^ <any text (ST)>

        const levelData = getLevel(level);
        const delim = levelData.delim;
        const sub_level = levelData.sub_level;

        const components = data.split(delim);

        let ret = {};

        ret.number = this.TN(components[0]);
        ret.telecommunication_code = this.ID(components[1]);
        ret.telecommunication_equipment_type = this.ID(components[2]);
        ret.email = this.ST(components[3]);
        ret.country_code = this.NM(components[4]);
        ret.area_code = this.NM(components[5]);
        ret.phone_number = this.NM(components[6]);
        ret.extension = this.NM(components[7]);
        ret.text = this.ST(components[8]);

        return ret;
    },
    DLN: function DLN(data = '', level) {
        if (moment == undefined) {
            moment = require('moment');
        }
        // <license number (ST) > ^ <issuing state, province, country (IS) > ^ <expiration date (DT
        const levelData = getLevel(level);
        const delim = levelData.delim;
        const sub_level = levelData.sub_level;

        const components = data.split(delim);

        let ret = {};
        ret.number = this.ST(components[0]);
        ret.state = this.IS(components[1]);
        ret.expiration = this.DT(components[2]);
        return ret;
    },
    DT: function DT(data = '', level) {
        // Lazy Load moment
        if (moment == undefined) {
            moment = require('moment');
        }
        const date = moment(data, 'YYYYMMDDHH');
        if (date.isValid()) {
            return date.toDate();
        } else {
            return '';
        }
    },
    EI: function EI(data = '', level) {
        // <entity identifier (ST)> ^ <namespace ID (IS)> ^ <universal ID (ST)> ^ <universal ID type (ID)>
        const levelData = getLevel(level);
        const delim = levelData.delim;
        const sub_level = levelData.sub_level;

        const components = data.split(delim);

        let ret = {};

        ret.identifier = this.ST(components[0], sub_level);
        ret.namespace_id = this.IS(components[1], sub_level);
        ret.universal_id = this.ST(components[2], sub_level);
        ret.universal_id_type = this.ID(components[3], sub_level);
        return ret;
    },
    PL: function PL(data = '', level) {
        //<point of care (IS )> ^ <room (IS )> ^ <bed (IS)> ^ <facility (HD)> ^ < location status (IS )> ^ <person location type (IS)> ^ <building (IS )> ^ <floor (IS )> ^ <location description (ST)>
        const levelData = getLevel(level);
        const delim = levelData.delim;
        const sub_level = levelData.sub_level;

        const components = data.split(delim);

        let ret = {};
        ret.point_of_care = this.IS(components[0], sub_level);
        ret.room = this.IS(components[1], sub_level);
        ret.bed = this.IS(components[2], sub_level);
        ret.facility = this.HD(components[3], sub_level);
        ret.location_status = this.IS(components[4], sub_level);
        ret.person_location_type = this.IS(components[5], sub_level);
        ret.building = this.IS(components[6], sub_level);
        ret.floor = this.IS(components[7], sub_level);
        ret.location_description = this.ST(components[8], sub_level);

        return ret;
    },
    TQ: function TQ(data = '', level) {
        //<quantity (CQ)> ^ <interval (*)> ^ <duration (*)> ^ <start date/time (TS)> ^ <end date/time (TS)> ^ <priority (ID)> ^ <condition (ST)> ^ <text (TX)> ^ <conjunction (ID)> ^ <order sequencing (*)>

        const levelData = getLevel(level);
        const delim = levelData.delim;
        const sub_level = levelData.sub_level;

        const components = data.split(delim);

        let ret = {};
        ret.quantity = this.CQ(components[0], sub_level);
        ret.interval = components[1]; // not sure what (*) denotes in the standard //TODO: Find out what (*) means
        ret.duration = components[2]; // not sure what(*) denotes in the standard
        ret.start_time = this.TS(components[3], sub_level);
        ret.end_time = this.TS(components[4], sub_level);
        ret.priority = this.ID(components[5], sub_level);
        ret.condition = this.ST(components[6], sub_level);
        ret.text = this.TX(components[7], sub_level);
        ret.conjunction = this.ID(components[8], sub_level);
        ret.order_sequencing = components[9]; // not sure what (*) denotes in the standard

        return ret;
    },
    FC: function FC(data = '', level) {
        const levelData = getLevel(level);
        const delim = levelData.delim;
        const sub_level = levelData.sub_level;

        const components = data.split(delim);

        let ret = {};
        ret.id = this.ID(components[0], sub_level);
        ret.effective_date = this.TS(components[1], sub_level);
        return ret;
    },
    XCN: function XCN(data = '', level) {
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

        ret.components = this.ID(components[0], sub_level);
        ret.family_name = this.ST(components[1], sub_level);
        ret.given_name = this.ST(components[2], sub_level);
        ret.middle_name = this.ST(components[3], sub_level);
        ret.suffix = this.ST(components[3], sub_level);
        ret.prefix = this.ST(components[4], sub_level);
        ret.degree = this.ST(components[5], sub_level);
        ret.source_table = this.IS(components[6], sub_level);
        ret.assigning_authority = this.HD(components[7], sub_level);
        ret.name_type_code = this.ID(components[8], sub_level);
        ret.identifier_check_digit = this.ST(components[9], sub_level);
        ret.id_of_checkdigit_scheme = this.ID(components[10], sub_level);
        ret.identifier_code = this.IS(components[11], sub_level);
        ret.assigning_facility = this.HD(components[12], sub_level);

        return ret;
    },
    CP: function CP(data = '', level) {
        //<price (MO)> ^ <price type (ID)> ^ <from value (NM)> ^ <to value (NM)> ^ <range units (CE)> ^ <range type (ID)>
        const levelData = getLevel(level);
        const delim = levelData.delim;
        const sub_level = levelData.sub_level;

        const components = data.split(delim);

        let ret = {};
        this.price = this.MO(components[0], sub_level);
        this.price_type = this.ID(components[1], sub_level);
        this.from_value = this.NM(components[2], sub_level);
        this.value = this.NM(components[3], sub_level);
        this.range_units = this.CE(components[4], sub_level);
        this.range_type = this.ID(components[5], sub_level);

        return ret;
    },
    JCC: function JCC(data = '', level) {
        //<job code (IS)> ^ <job class (IS)>
        const levelData = getLevel(level);
        const delim = levelData.delim;
        const sub_level = levelData.sub_level;

        const components = data.split(delim);

        let ret = {};

        // this.job_code = this.IS(components[0], sub_level);
        // this.job_class = this.IS(components[1], sub_level);

        return ret;
    },
    TQ: function TQ(data = '', level) {
        //<quantity (CQ)> ^ <interval (*)> ^ <duration (*)> ^ <start date/time (TS)> ^
        // <end date/time (TS)> ^ <priority (ID)> ^ <condition (ST)> ^ <text (TX)> ^ <conjunction (ID)> ^ <order sequencing (*)>
        const levelData = getLevel(level);
        const delim = levelData.delim;
        const sub_level = levelData.sub_level;

        const components = data.split(delim);

        let ret = {};
        ret.quantity = this.CQ(components[0], sub_level);
        ret.interval = this.FT(components[1], sub_level);
        ret.duration = this.FT(components[2], sub_level);
        ret.start_date = this.TS(components[3], sub_level);
        ret.end_date = this.TS(components[4], sub_level);
        ret.priority = this.ID(components[5], sub_level);
        ret.condition = this.ST(components[6], sub_level);
        ret.text = this.TX(components[7], sub_level);
        ret.conjunction = this.ID(components[8], sub_level);
        ret.order_sequencing = this.FT(components[9], sub_level);
        return ret;
    }
};
