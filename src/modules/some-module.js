export const db = { counter: 0 };

export default (msg) => {
  console.log('incrementing...');
  db.counter ++;
  console.log(`${msg ? msg : 'done.'}`);
};
