/*
boundedPoints
All points are at least "padding" from each other on all three axes
while staying within the xyz bounds.

const quantity = 10;
const bounds = [10, 15, 20];
const padding = 2;

const randomPoints = generateRandomPoints(quantity, bounds, padding);

*/

function boundedPoints(quantity, bounds, padding) {
  const points = [];

  while (points.length < quantity) {
    const point = [
      Math.random() * bounds[0],
      Math.random() * bounds[1],
      Math.random() * bounds[2]
    ];

    if (points.every(existingPoint => isFarEnough(existingPoint, point, padding))) {
      points.push(point);
    }
  }

  return points;
}

function isFarEnough(pointA, pointB, padding) {
  const distance = Math.sqrt(
    Math.pow(pointA[0] - pointB[0], 2) +
    Math.pow(pointA[1] - pointB[1], 2) +
    Math.pow(pointA[2] - pointB[2], 2)
  );

  return distance >= padding;
}

export default boundedPoints