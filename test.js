'use strict';
const Onehot = require('./index.js');
const _ = require('lodash');

const input = [
  {
    user: { id: 1, name: 'Dalton', prename: 'John', online: 'true' },
    project: { id: 1, name: 'lodash'},
  },
  {
    user: { id: 1, name: 'Dalton', prename: 'John', online: 'true' },
    project: { id: 2, name: 'docdown'},
  },
  {
    user: { id: 1, name: 'Dalton', prename: 'John', online: 'true' },
    project: { id: 3, name: 'lodash-cli'},
  },
  {
    user: { id: 2, name: '-', prename: 'contra', online: 'false' },
    project: { id: 4, name: 'gulp'},
  },
  {
    user: { id: 3, name: '-', prename: 'phated', online: 'true' },
    project: { id: 4, name: 'gulp'},
  }
];

const User = Onehot(_.first(input));

let encoded = User.encode(input);
let decoded = User.decode(encoded);
console.log(encoded);
console.log(JSON.stringify(input) === JSON.stringify(decoded));
