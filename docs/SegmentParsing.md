# General Design

Because HL7 changes between vendors, this library needed to be 'editable' to accomidate the variences. For this reason there are 3 objects involved in parsing an HL7 segment.

1. `XXX_parser_template()`: (Where XXX is the 3 digit code for the segment name.) This is the to-spec version of the segment as defined in the HL7 standard. Since vendors tweak their segments, it is designed to be overridden. It is an object where each key becomes the key in the parsed obejct. Each value for each key is a function that will be called later to perform the parsing of a given segment.

2. `XXX_parser_builder(parser_adjuster = {})`: This takes a parser_template and overwrites the callbacks for certain keys with the call back in the parser_adjuster. Each callback takes the list of components as the parameter. The `delete` key has been reserved for removing a key from the standard template. For example:

```javascript
const msh =
  'MSH|^~&|LABxxx|ClinLAB|ICU||19910918060544||MFN^M03|MSGID002|P|2.2';

const parser_adj = {
  sending_application: components => datatypes.parse_ST(components[2]), // Was originally parse_HD(component[2])
  sending_facility: components => datatypes.parse_ST(components[3]),
  recieving_application: components => datatypes.parse_ST(components[4]),
  CHANGED_NAME: components => datatypes.parse_ST(components[5]),            // Notice how the key name reflects in the output
  delete: ['principle_language']
};

const msh_parser = segments.msh_parser_builder(parser_adj);
const data = msh_parser(msh);
console.log(data);

//console.log results:
{ sending_application: 'LABxxx',
  sending_facility: 'ClinLAB',
  recieving_application: 'ICU',
  CHANGED_NAME: '',                                                         // Notice how this was changed in the parser_adj
  datetime: { time: 1991-09-18T12:05:44.000Z, precision: undefined },
  security: '',
  message_type: { type: 'MFN', event: 'M03' },
  control_id: 'MSGID002',
  processing_id: { id: 'P', mode: '' },
  version: '2.2',
  sequence_number: NaN,
  continuation_pointer: undefined,
  accept_ack_type: undefined,
  application_ack_type: undefined,
  country_code: undefined,
  character_set: undefined }

// Notice how 'principle_language' has been removed from the returned object.
```

3. The `XX_parser(hl7_text_segment)`: is returned by the `XX_parser_builder`. It is what finally does the parsing and returns the object with all of the mapped values.
