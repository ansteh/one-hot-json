'use strict';
const Onehot = require('./index.js');
const _ = require('lodash');

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

let sample = _.first(input);
const User = Onehot(sample);

let encoded = User.encode(input);
let decoded = User.decode(encoded);
console.log(encoded);
console.log(decoded);
console.log(JSON.stringify(input) === JSON.stringify(decoded));

let deformatedEncoding = [
  [ 0.9, 0.1, 0.2, 2.3, 0.8, 0.01 ],
  [ 1.1, 0.2, 0.3, 2.2, 2.1, 1.35 ],
  [ 0.8, 0.1, 0.1, 2.3, 3.2, 2.11 ],
  [ 1.9, 0.9, 1.2, 3.1, 4.2, 3.31 ],
  [ 2.9, 1.1, 2.2, 2.1, 4.3, 3.22 ]
];

let decodedDeformation = User.decode(deformatedEncoding);
console.log(decodedDeformation);
console.log(JSON.stringify(input) === JSON.stringify(decodedDeformation));
