function builder(template, parser_adjustments = {}) {
  // Update the Parser
  for (let key in parser_adjustments) {
    if (key != 'delete') template[key] = parser_adjustments[key];
  }

  // Delete UnNeeded Messages
  if (parser_adjustments.delete) {
    for (let key of parser_adjustments.delete) {
      delete template[key];
    }
  }

  // Return the parser
  return segment => {
    const components = segment.split('|');

    let ret = {};
    for (let key in template) {
      ret[key] = template[key](components);
    }
    return ret;
  };
}

module.exports = {
  templates: {
    '2.3': require('./templates/hl7_23.segments'),
    '2.3.1': () => console.log('Not Implemented')
  },
  builder: builder
};
