export const create = (x ,y) => Object.freeze([x, y]);
export const movePointTo = (point, x, y) => Object.freeze([point[0] + x, point[1] + y]);
