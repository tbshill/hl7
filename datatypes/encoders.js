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

const encoders = {

    ST: function ST(data = '', level) {
        return data;
    },

    TX: function TX(data = '', level) {
        return data;
    },

    FT: function FT(data = '', level) {
        return data;
    },

    NM: function NM(data = '', level) {
        return String(data);
    },

    MO: function MO(data, level) {
        let keys = ['quantity', 'denomination'];
        let datatypes = ['NM', 'ID'];
        return general_encoder(data, keys, datatypes, level);
    },

    TS: function TS(data, level) {
        const keys = ['time', 'precision'];
        const datatypes = ['ST', 'ST'];
        // Lazy load moment
        if (moment == undefined) {
            moment = require('moment');
        }

        const date = moment(data.time, 'YYYYMMDDHHmmssSSSZZ');

        data.time = date.format('YYYYMMDDHHmmssSSS');

        return general_encoder(data, keys, datatypes, level);

    },

    CE: function CE(data, level) {
        //   Components: <identifier (ST)> ^ <text (ST)> ^ <name of coding system (ST)> ^ <alternate identifier (ST)> ^ <alternate text (ST)> ^ <name of alternate coding system (ST)>

        const keys = ['identifier', 'text', 'coding_system', 'alternate_id', 'alternate_text', 'alternate_coding_system'];
        const datatypes = ['ST', 'ST', 'ST', 'ST', 'ST', 'ST'];

        return general_encoder(data, keys, datatypes, level);

    },

    CQ: function CQ(data = '', level) {
        // Components: <quantity (NM)> ^ <units (CE)>

        const keys = ['quantity', 'units'];
        const datatypes = ['NM', 'CE'];

        return general_encoder(data, keys, datatypes, level);
    },

    // // TODO: CM
    // CM: function CM(data, level) {

    // },

    ID: function ID(data = '', level) {
        return data;
    },

    HD: function HD(data = '', level) {
        //<namespace ID (IS)> ^ <universal ID (ST)> ^ <universal ID type (ID)>

        const keys = ['namespace_id', 'unversal_id', 'universal_id_type'];
        const datatypes = ['IS', 'ST', 'ID'];

        return general_encoder(data, keys, datatypes, level);
    },

    IS: function IS(data = '', level) {
        return data;
    },

    PT: function PT(data = '', level) {
        const keys = ['id', 'mode'];
        const datatypes = ['ID', 'ID'];

        return general_encoder(data, keys, datatypes, level);

    },
    PN: function PN(data = '', level) {
        // <family name (ST)> ^ <given name (ST)> ^ <middle initial or name (ST)> ^ <suffix (e.g., JR or III) (ST)> ^
        // <prefix (e.g., DR) (ST)> ^ <degree (e.g., MD) (ST)>

        const keys = ['family', 'given', 'middle', 'suffix', 'prefix', 'degree'];
        const datatypes = ['ST', 'ST', 'ST', 'ST', 'ST', 'ST',];

        return general_encoder(data, keys, datatypes, level);
    },

    AD: function AD(data = '', level) {
        //Components: <street address (ST)> ^ < other designation (ST)> ^ <city (ST)> ^ <state or province (ST)> ^
        // <zip or postal code (ST)> ^ <country (ID)> ^ <address type (ID)> ^ <other geographic designation (ST)>

        const keys = ['street', 'other', 'city', 'state', 'zip', 'coutnry', 'type', 'other_geographic'];
        const datatypes = ['ST', 'ST', 'ST', 'ST', 'ST', 'ID', 'ID', 'ST'];

        return general_encoder(data, keys, datatypes, level);

    },
    TN: function TN(data = '', level) {
        return data;
    },

    XAD: function XAD(data = '', level) {
        // In Version 2.3, replaces the AD data type. <street address (ST)> ^ <other designation (ST)> ^ <city (ST)> ^ <state or province (ST)> ^ <zip or postal code (ST)> ^ <country (ID)> ^
        // < address type (ID)> ^ <other geographic designation (ST)> ^ <county/parish code(IS) > ^ <census tract (IS) >

        const keys = ['street', 'other', 'city', 'state', 'zip', 'country', 'type', 'other_geographic', 'county', 'census_tract'];
        const datatypes = ['ST', 'ST', 'ST', 'ST', 'ST', 'ID', 'ID', 'ST', 'IS', 'IS'];

        return general_encoder(data, keys, datatypes, level);
    },
    XPN: function XPN(data = '', level) {
        //  <family name (ST) > ^ <given name (ST) > ^ <middle initial or name (ST) > ^ <suffix (e.g., JR or III) (ST) > ^ <prefix (e.g., DR)(ST) > ^
        // <degree (e.g., MD)(ST) > ^ <name type code (ID) > ^ <name representation code (ID) >

        const keys = ['family', 'given', 'middle', 'suffix', 'prefix', 'degree', 'type', 'representation'];
        const datatypes = ['ST', 'ST', 'ST', 'ST', 'ST', 'ST', 'ID', 'ID']

        return general_encoder(data, keys, datatypes, level);
    },
    XON: function XON(data = '', level) {
        //Components: <organization name (ST)> ^ <organization name type code (IS)> ^ <ID Number (NM)> ^ <check digit (NM)> ^ <code identifying the check digit scheme employed (ID)>
        //  ^ <assigning authority (HD)> ^ <identifier type code (IS)> ^ <assigning facility ID (HD)>

        const keys = ['organization_name', 'organization_type', 'id', 'check_digit', 'check_digit_scheme', 'assigning_authority', 'identifier_type', 'assigning_facility_id']
        const datatypes = ['ST', 'IS', 'NM', 'NM', 'ID', 'HD', 'IS', 'HD']

        return general_encoder(data, keys, datatypes, level);
        //Subcomponents of assigning authority: <namespace ID (IS) > & <universal ID (ST) > & <universal ID type (ID) >
        //Subcomponents of assigning facility: <namespace ID (IS) > & <universal ID (ST) > & <universal ID type (ID) >
    },
    SI: function SI(data = '', level) {
        return this.NM(data, level);
    },
    CX: function CX(data = {}, level) {
        // <ID (ST)> ^ <check digit (ST)> ^ <code identifying the check digit scheme employed (ID)> ^
        // < assigning authority (HD) )> ^ <identifier type code (IS)> ^ < assigning facility (HD)

        const keys = ['id', 'check_digit', 'check_digit_schema_code', 'assigning_authority', 'identifier_code', 'assigning_facility'];
        const datatypes = ['ST', 'ST', 'ID', 'HD', 'IS', 'HD'];

        return general_encoder(data, keys, datatypes, level);

    },
    XTN: function XTN(data = {}, level) {
        const keys = ['number', 'telecommunication_code', 'telecommunication_equipment_type', 'email', 'country_code', 'area_code', 'phone_number', 'extension', 'text'];
        const datatypes = ['TN', 'ID', 'ID', 'ST', 'NM', 'NM', 'NM', 'ST'];

        return general_encoder(data, keys, datatypes, level);
    },
    DLN: function DLN(data = '', level) {
        // <license number (ST) > ^ <issuing state, province, country (IS) > ^ <expiration date (DT

        const keys = ['number', 'state', 'expiration'];
        const datatypes = ['ST', 'IS', 'DT'];

        return general_encoder(data, keys, datatypes, level);

    },
    DT: function DT(data, level) {
        if (moment == undefined) {
            moment = require('moment');
        }
        data = moment(data);

        return data.format('YYYYMMDDHH');
    },
    EI: function EI(data = '', level) {
        // <entity identifier (ST)> ^ <namespace ID (IS)> ^ <universal ID (ST)> ^ <universal ID type (ID)>

        const keys = ['identifier', 'namespace_id', 'universal_id', 'universal_id_type'];
        const datatypes = ['ST', 'IS', 'ST', 'ID'];
        return general_encoder(data, keys, datatypes, level);
    },
    PL: function PL(data = '', level) {
        //<point of care (IS )> ^ <room (IS )> ^ <bed (IS)> ^ <facility (HD)> ^ < location status (IS )> ^ <person location type (IS)> ^ <building (IS )> ^ <floor (IS )> ^ <location description (ST)>
        const keys = ['point_of_care', 'room', 'bed', 'facility', 'location_status', 'person_location_type', 'building', 'floor', 'location_description'];
        const datatypes = ['IS', 'IS', 'IS', 'HD', 'IS', 'IS', 'IS', 'IS', 'ST'];

        return general_encoder(data, keys, datatypes, level);

    },
    TQ: function TQ(data = '', level) {
        //<quantity (CQ)> ^ <interval (*)> ^ <duration (*)> ^ <start date/time (TS)> ^ <end date/time (TS)> ^ <priority (ID)> ^ <condition (ST)> ^ <text (TX)> ^ <conjunction (ID)> ^ <order sequencing (*)>


        const keys = ['quantity', 'interval', 'duration', 'start_time', 'end_time', 'priority', 'condition', 'text', 'conjunction', 'order_sequencing'];
        // TODO:                  *     *                                         *
        const datatypes = ['CQ', 'ST', 'ST', 'TS', 'TS', 'ID', 'ST', 'TX', 'ID', 'ST'];

        return general_encoder(data, keys, datatypes, level);

    },
    FC: function FC(data = '', level) {
        const keys = ['id', 'effective_date'];
        const datatypes = ['ID', 'TS'];

        return general_encoder(data, keys, datatypes, level);

    },
    XCN: function XCN(data = '', level) {
        //Components: <ID number (ST)> ^ <family name (ST)> ^ <given name (ST)> ^ <middle initial or name (ST)> ^ <suffix (e.g., JR or III) (ST)> ^
        // <prefix (e.g., DR) (ST)> ^ <degree (e.g., MD) (ST)> ^ <source table (IS)> ^ <assigning authority (HD)> ^ <name type code(ID)> ^
        // <identifier check digit (ST)> ^ <code identifying the check digit scheme employed (ID )> ^ <identifier type code (IS)> ^
        // <assigning facility (HD)>

        const keys = ['components', 'family_name', 'given_name', 'middle_name', 'suffix', 'prefix', 'degree', 'source_table', 'assigning_authority', 'name_type_code', 'identifier_check_digit', 'identifier_code', 'assigning_facility'];
        const datatypes = ['ID', 'ST', 'ST', 'ST', 'ST', 'ST', 'ST', 'IS', 'HD', 'ID', 'ST', 'ID', 'IS', 'HD'];

        return general_encoder(data, keys, datatypes, level);

    },
    CP: function CP(data = '', level) {
        //<price (MO)> ^ <price type (ID)> ^ <from value (NM)> ^ <to value (NM)> ^ <range units (CE)> ^ <range type (ID)>

        const keys = ['price', 'price_type', 'from_value', 'value', 'range_units', 'range_type'];
        const datatypes = ['MO', 'ID', 'NM', 'NM', 'CE', 'ID'];

        return general_encoder(data, keys, datatypes, level);

    },
    JCC: function JCC(data = '', level) {
        //<job code (IS)> ^ <job class (IS)>

        const keys = ['job_code', 'job_class'];
        const datatypes = ['IS', 'IS'];

        return general_encoder(data, keys, datatypes, level);

    },
    TQ: function TQ(data = '', level) {
        //<quantity (CQ)> ^ <interval (*)> ^ <duration (*)> ^ <start date/time (TS)> ^
        // <end date/time (TS)> ^ <priority (ID)> ^ <condition (ST)> ^ <text (TX)> ^ <conjunction (ID)> ^ <order sequencing (*)>

        const keys = ['quantity', 'interval', 'duration', 'start_date', 'end_date', 'priority', 'condition', 'text', 'conjunction', 'order_sequencing'];
        const datatypes = ['CQ', 'FT', 'FT', 'TS', 'TS', 'ID', 'ST', 'TX', 'ID', 'FT'];

        return general_encoder(data, keys, datatypes, level);
    }
}

var trimRight = function trimRight(str, delim) {
    if (str[str.length - 1] != delim || str[str.length - 1] == ' ') {
        return str;
    }
    else {
        return trimRight(str.slice(0, -1), delim);
    }
}

var general_encoder = function general_encoder(data, keys, datatypes, level) {
    const levelData = getLevel(level);
    const delim = levelData.delim;
    const sub_level = levelData.sub_level;

    let ret_array = Array(keys.length);

    for (let i in ret_array) {
        ret_array[i] = '';
    }

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const datatype_encoder = encoders[datatypes[i]];
        let parsed_feild;
        if (data[key] == undefined) {
            parsed_feild = '';
        }
        else {
            // console.log(data[key])
            parsed_feild = datatype_encoder(data[key], sub_level);
        }
        ret_array[i] = parsed_feild;
        // console.log(ret_array)

    }
    // console.log(`DELIM: ${delim}`);
    return trimRight(ret_array.join(delim), delim);
}


module.exports = encoders;