export const computeTimeOverlap = ({ startA, endA, startB, endB }) => {
  const startAMilliseconds = getDateMilliseconds(startA);
  const endAMilliseconds = getDateMilliseconds(endA);

  const startBMilliseconds = getDateMilliseconds(startB);
  const endBMilliseconds = getDateMilliseconds(endB);

  const overlapStart = Math.max(startAMilliseconds, startBMilliseconds);
  const overlapEnd = Math.min(endAMilliseconds, endBMilliseconds);

  if (overlapEnd < overlapStart) {
    return 0;
  }

  return overlapEnd - overlapStart;
};

export const millisecondstToDay = (dateInMS) => {
  return Math.floor(dateInMS / 86400000);
};

const getDateMilliseconds = (currentDate) => {
  if (currentDate === 'NULL') {
    return new Date().valueOf();
  }

  if (currentDate === 'Today') {
    return new Date().valueOf();
  }

  if (!isNaN(currentDate)) {
    return new Date(Number(currentDate)).valueOf();
  }

  return new Date(currentDate).valueOf();
};
