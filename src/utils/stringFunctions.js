export const ordinal_suffix_of = (i, include_i = true) => {
  var j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return include_i ? i + 'st' : 'st';
  }
  if (j === 2 && k !== 12) {
    return include_i ? i + 'nd' : 'nd';
  }
  if (j === 3 && k !== 13) {
    return include_i ? i + 'rd' : 'rd';
  }
  return include_i ? i + 'th' : 'th';
};
