const head = xs => {
  if (xs.length < 1) throw Error('an empty xs');
  return xs[0];
};

const tail = xs => {
  if (xs.length == 0) return [];
  return xs.slice(1);
};

export const sum = xs => {
  if (xs.length == 0) return 0;
  return head(xs) + sum(tail(xs));
};
