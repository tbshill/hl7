const encoders = require('./encoders');
const parsers = require('./parsers');

function datatype_parser(datatype, level, cm_callback) {
  // TODO: Throw error if the datatype does not exist
  if (datatype == 'CM' && cm_callback) {
    return data => parsers.CM(data, cm_callback);
  }
  return data => parsers[datatype](data, level);
}

function datatype_encoder(datatype) {
  // TODO: Throw error if the datatype does not exist
  // if (datatype == 'CM' && cm_callback) {
  //   return data => encoders.encode_CM(data, cm_callback);
  // }
  return (data, level) => encoders[datatype](data, level);
}


module.exports = {
  datatype_parser: datatype_parser,
  datatype_encoder: datatype_encoder
}
