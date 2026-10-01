const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const parser = require('@babel/parser');

// Exercise the actual inline JSX expressions, not a reimplemented normalizer.
const filename = path.resolve(__dirname, '../pages/NewSearch/AddItem/NewItem.js');
const source = fs.readFileSync(filename, 'utf8');
const ast = parser.parse(source, { sourceType: 'module', plugins: ['jsx'] });
function find(node, predicate) {
  if (!node || typeof node !== 'object') return null;
  if (predicate(node)) return node;
  for (const value of Object.values(node)) {
    for (const child of Array.isArray(value) ? value : [value]) {
      const found = find(child, predicate);
      if (found) return found;
    }
  }
  return null;
}
const attr = (element, name) => element.openingElement.attributes.find(a => a.name?.name === name)?.value;
const group = find(ast, n => n.type === 'JSXElement' && attr(n, 'controlId')?.value === 'localSN');
assert.ok(group, 'NewItem localSN group exists');
const control = find(group, n => n.type === 'JSXElement' && n.openingElement.name?.property?.name === 'Control');
const onChange = attr(control, 'onChange').expression;
const value = attr(control, 'value').expression;
const display = new Function('items', `return (${source.slice(value.start, value.end)});`);
function change(input, previous = { localSN: '', name: 'Unchanged name' }) {
  let result = previous;
  const handler = new Function('setItems', `return (${source.slice(onChange.start, onChange.end)});`)(update => {
    result = typeof update === 'function' ? update(result) : update;
  });
  handler({ target: { value: input } });
  return result;
}

test('NewItem has a fixed accessible AIS prefix and a digits-only text input', () => {
  const prefix = find(group, n => n.type === 'JSXElement' && attr(n, 'id')?.value === 'new-item-local-sn-prefix');
  assert.equal(prefix.openingElement.name.object.name, 'InputGroup');
  assert.equal(prefix.openingElement.name.property.name, 'Text');
  assert.equal(prefix.children.filter(n => n.type === 'JSXText').map(n => n.value).join('').trim(), 'AIS');
  assert.equal(attr(control, 'type').value, 'text');
  assert.equal(attr(control, 'inputMode').value, 'numeric');
  assert.equal(attr(control, 'pattern').value, '[0-9]*');
  assert.match(attr(control, 'aria-describedby').value, /new-item-local-sn-prefix/);
  assert.match(source.slice(group.start, group.end), /Leave blank to generate an unused number/);
});

test('bare digits and pasted AIS spellings retain one canonical prefix in backing state', () => {
  for (const input of ['33551', 'AIS33551', 'ais33551', ' AIS-33551 ', 'aIs _33551']) {
    const actual = change(input);
    assert.equal(actual.localSN, 'AIS33551', input);
    assert.equal(actual.name, 'Unchanged name');
    assert.equal(display(actual), '33551');
  }
});

test('leading zero identifiers remain exact', () => {
  for (const input of ['0033551', 'AIS0033551', 'ais_0033551']) {
    assert.equal(change(input).localSN, 'AIS0033551');
    assert.equal(display(change(input)), '0033551');
  }
});

test('clear and prefix-only input leave the empty value required by automatic generation', () => {
  for (const input of ['', ' ', 'AIS', ' ais- ']) {
    assert.equal(change(input, { localSN: 'AIS33551' }).localSN, '');
    assert.equal(display(change(input)), '');
  }
});

test('invalid pasted identifiers are ignored rather than silently converted to a different item', () => {
  const previous = { localSN: 'AIS12345', untouched: true };
  for (const input of ['AIS-B00047', 'AIS-P00065', 'foo33551', 'AIS335x51', '33 551', '33.551', 'AIS-AIS33551', '-33551']) {
    assert.equal(change(input, previous), previous, input);
  }
});

test('display tolerates existing canonical, lowercase, numeric and blank prefills', () => {
  for (const [localSN, expected] of [['AIS33551', '33551'], ['ais-33551', '33551'], ['0033551', '0033551'], ['', ''], [undefined, '']]) {
    assert.equal(display({ localSN }), expected);
  }
});
