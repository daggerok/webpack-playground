let data = [1, 2, 3, 5];
const body = document.querySelector('body');
const incrementData = () => data = data.map(v => v + 1);
const handler = event => {
  System.import('./point').then(pointModule => {
    const point = pointModule.create(1, 2);
    const template = `
      <h2>data</h2>
      <p>${incrementData().join('\t|\t')}</p>
      <h3>Point</h3>
      <ul>
        <li>x: ${point[0]}</li>
        <li>y: ${point[1]}</li>
      </ul>
    `;
    body.innerHTML = template;
  });
};

body.addEventListener('click', handler);
handler();
