'use strict';
const _ = require('lodash');
const pathfinder = require('json-pathfinder');
const shape = {
  array: require('shape-array')
};

const OneHotString = (values) => {
  let uniques = _.uniq(values);

  let encode = (value) => {
    return _.findIndex(uniques, value);
  };

  let decode = (index) => {
    return uniques[index];
  };

  return {
    encode: encode,
    decode: decode
  };
};

const getTypes = (paths, json) => {
  return _.map(paths, (path) => {
    let value = _.get(json, path);
    if(_.isString(value)) return 'string';
  });
};

const onehot = (collection) => {
  let paths = pathfinder.parse(_.first(collection));

  let flatten = shape.array.scheme(paths);
  let encode = () => {

  };

  let deflatten = shape.array.reverse(paths);
  let decode = () => {

  };

  return {
    encode: flatten,
    decode: deflatten
  };
};
