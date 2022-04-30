const computeDistance = require('./main');

test('distance of 3, 3 and 7, 4 to be 4', () => {
  expect(computeDistance(3, 3, 7, 4)).toBe(4);
});

test('distance of 8, -3 and 2, 9 to be 4', () => {
    expect(computeDistance(8, -3, 2, 9)).toBe(13);
  });


test('square of 9 to be 9', () => {
    expect(squareGreaterThanTen(9)).toBe(9);
});

test('square of 100 to be 100', () => {
    expect(squareGreaterThanTen(10)).toBe(100);
});
