export const create = (x ,y) => Object.freeze([x, y]);
export const movePointTo = (point, x, y) =>
  Object.freeze([point.x + x, point.y + y]);
