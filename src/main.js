import { create, movePointTo } from './point';

let data = [1, 2];
const point = data => create(data[0], data[1]);

const body = document.querySelector('#app');
const incrementData = () => data = data.map(v => v + 1);
const handler = event => {
  const current = point(incrementData());
  console.log('c', JSON.stringify(current));
  const latest = movePointTo(current, current[1], current[0] + current[1]);
  console.log('l', JSON.stringify(latest));
  const template = `
    <h2>data</h2>
    <p>${data.join('\t|\t')}</p>
    <h3>Point</h3>
    <ul>
      <li>x: ${latest[0]}</li>
      <li>y: ${latest[1]}</li>
    </ul>
  `;
  body.innerHTML = template;

  const rect = document.querySelector('#rect');
  const ctx = rect.getContext('2d');
  ctx.rect(current[0], current[1], latest[0], latest[1]);
  ctx.stroke();
};

body.addEventListener('click', handler);
handler();
