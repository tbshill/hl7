Please go to the HL7 standard to learn about what each datatype is and how it should be used. This documentation describes how to use the module.

# Parsing a Datatype

For each datatype there is a function called `parse_XX(data, level)` where 'XX' represents the 2 or 3 digit code for that data type. `data` is the unparsed data and `level` denotes wether the data passed in was a feild, or component ('F' or 'C')

They do not test for required/optionality or repeated feilds. It is up to the developer to know that a feild may contain repeatable feilds and call the correct parsing commands accordingly.

If there is more than one component/sub-component in the data type, then the function returns an object with each component labled according the the HL7 Standard.

## Examples:

```javascript
// This is an excerpt from the naive unit tests
const parsed = datatypes.parse_CQ('150^lb&&ANSI+', 'F');
const expected = {
  quantity: 150,
  units: {
    identifier: 'lb',
    text: '',
    coding_system: 'ANSI+',
    alternate_id: '',
    alternate_text: '',
    alternate_coding_system: ''
  }
};

assert.deepStrictEqual(parsed, expected, 'Did not parse CQ');
```

# CM

This datatype is unique because it is defined to be a 'composite' of other data types. In other words, it changes based on its use. For this reason, intead of a `level` parameter it has a `callback` to allow the developer more controlled parsing of the data.

## Example:

```javascript
datatypes.parse_CM('ORM^O01', data => {
  const components = data.split('^');
  let ret = {};
  ret.type = datatypes.parse_ST(components[0] || '') || '';
  ret.event = datatypes.parse_ST(components[1] || '') || '';
  return ret;
});
```
