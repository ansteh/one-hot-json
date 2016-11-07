# one-hot-json
on development

# Purpose
flattening and encoding JSON Objects

# Spark of Need
Many multivariate algorithms depend on array-like data. There is a need for modules to transform JSON Objects into such kind of data in a reasonable and easy to use manner. The main goal is to deliver a module with a generic encoding and decoding functionality for a collection of JSON Objects of the same Schema.

# Approach
Flattening JSON Objects and encoding string values via one-hot approach.

## Example

```js
const Onehot = require('one-hot-json');

const input = [
  {
    user: { id: 1, name: 'Dalton', prename: 'John', online: true },
    project: { id: 1, name: 'lodash'},
  },
  {
    user: { id: 1, name: 'Dalton', prename: 'John', online: true },
    project: { id: 2, name: 'docdown'},
  },
  {
    user: { id: 1, name: 'Dalton', prename: 'John', online: true },
    project: { id: 3, name: 'lodash-cli'},
  },
  {
    user: { id: 2, name: '-', prename: 'contra', online: false },
    project: { id: 4, name: 'gulp'},
  },
  {
    user: { id: 3, name: '-', prename: 'phated', online: true },
    project: { id: 4, name: 'gulp'},
  }
];
```
Initiate the one-hot-json transcriptor by a sample from targeting collection.
```js
let sample = _.first(input);
const User = Onehot(sample);

let encoded:  = User.encode(input);
// encoded:
```
```json
[ [ 1, 0, 0, 2, 1, 0 ],
  [ 1, 0, 0, 2, 2, 1 ],
  [ 1, 0, 0, 2, 3, 2 ],
  [ 2, 1, 1, 3, 4, 3 ],
  [ 3, 1, 2, 2, 4, 3 ] ]
```
Decoding:
```js
let decoded = User.decode(encoded);
console.log(JSON.stringify(input) === JSON.stringify(decoded)); //true
```
Usecase: encoded matrix as output from a replication or machine learning algorithms.
```js
let deformatedEncoding = [
  [ 0.9, 0.1, 0.2, 2.3, 0.8, 0.01 ],
  [ 1.1, 0.2, 0.3, 2.2, 2.1, 1.35 ],
  [ 0.8, 0.1, 0.1, 2.3, 3.2, 2.11 ],
  [ 1.9, 0.9, 1.2, 3.1, 4.2, 3.31 ],
  [ 2.9, 1.1, 2.2, 2.1, 4.3, 3.22 ]
];

let decodedDeformation = User.decode(deformatedEncoding);
console.log(JSON.stringify(input) === JSON.stringify(decodedDeformation));//true
```
