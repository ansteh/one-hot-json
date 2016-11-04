'use strict';
const _ = require('lodash');
const pathfinder = require('json-pathfinder');
const shape = {
  array: require('shape-array')
};

const OneHotString = (values) => {
  let uniques = _.uniq(values);

  let encode = (value) => {
    if(_.indexOf(uniques, value) === -1) {
      uniques.push(value);
    }
    return _.findIndex(uniques, str => str === value);
  };

  let decode = (index) => {
    return uniques[index];
  };

  return {
    encode: encode,
    decode: decode
  };
};

const getType = (path, json) => {
  let value = _.get(json, path);
  if(_.isString(value)) return 'string';
  if(_.isNumber(value)) return 'number';
  if(_.isBoolean(value)) return 'boolean';
};

const onehot = (reference) => {
  let paths = pathfinder.parse(reference);

  let patterns = _.map(paths, (path, index) => {
    let pattern = {
      path: path,
      type: getType(path, reference)
    };

    if(pattern.type === 'string') {
      pattern.onehot = OneHotString([]);
    }

    if(pattern.type === 'boolean') {
      pattern.onehot = OneHotString(['false', 'true']);
    }

    return pattern;
  });

  let flatten = shape.array.reverse(paths);
  let encode = (collection) => {
    if(_.isArray(collection) === false) collection = [collection];
    return _.map(collection, item => {
      let row = flatten(item);
      return _.map(patterns, (pattern, index) => {
        if(pattern.onehot) {
          return pattern.onehot.encode(row[index]);
        }
        return row[index];
      });
    });
  };

  let deflatten = shape.array.scheme(paths);
  let decode = (collection) => {
    if(_.isArray(collection) === false) collection = [collection];
    return _.map(collection, row => {
      return deflatten(_.map(patterns, (pattern, index) => {
        let value = row[index];
        if(pattern.onehot) {
          value = pattern.onehot.decode(value);
        }
        return value;
      }));
    });
  };

  return {
    encode: encode,
    decode: decode
  };
};

module.exports = onehot;
