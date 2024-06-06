export const DateDiff = {
  inDays: function (d1, d2) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return Math.floor((t2 - t1) / (24 * 3600 * 1000));
  },

  inWeeks: function (d1, d2) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
  },

  inMonths: function (d1, d2) {
    var d1Y = d1.getFullYear();
    var d2Y = d2.getFullYear();
    var d1M = d1.getMonth();
    var d2M = d2.getMonth();

    return d2M + 12 * d2Y - (d1M + 12 * d1Y);
  },

  inYears: function (d1, d2) {
    return d2.getFullYear() - d1.getFullYear();
  },
};

var rows = [0, 1, 2, 3, 4, 5];
var cols = [0, 1, 2, 3, 4, 5, 6];

const getMatrix = (y, m) => {
  var matrix = [];
  var date = new Date(y, m);
  var numDays = new Date(y, m + 1, 0).getDate();
  var dayNum;

  rows.forEach((row) => {
    var week = [];

    cols.forEach((col) => {
      if (row === 0) {
        dayNum = col - date.getDay() + 1;
        week.push(
          col < date.getDay()
            ? -new Date(y, m, -(date.getDay() - 1 - col)).getDate()
            : dayNum
        );
      } else {
        dayNum = matrix[matrix.length - 1][6] + col + 1;
        week.push(dayNum <= numDays ? dayNum : -(dayNum - numDays));
      }
    });

    if (!row || week[0] > 1) matrix.push(week);
  });

  return matrix;
};

export const matrix = (year, month) => {
  if (typeof year === 'undefined') year = new Date();

  if (year instanceof Date) {
    return getMatrix(year.getFullYear(), year.getMonth());
  } else {
    return getMatrix(year, month);
  }
};
