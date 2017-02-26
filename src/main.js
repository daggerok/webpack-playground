const body = document.querySelector('#app');
const canvas = document.querySelector('#rect');
const canvasContext = canvas.getContext('2d');
let data = [1, 2];

const handler = event => {
  const increment = () => data = data.map(v => v + 1);

  System.import('./point').then(({ current, movePointTo }) => {

    const prev = current(increment());
    const curr = movePointTo(prev, prev[1], prev[0] + prev[1]);

    body.innerHTML = `
      <h2>data</h2>
      <p>${data.join(' | ')}</p>
      <h3>Point</h3>
      <ul>
        <li>x: ${curr[0]}</li>
        <li>y: ${curr[1]}</li>
      </ul>
    `;

    canvasContext.rect(prev[0], prev[1], curr[0], curr[1]);
    canvasContext.stroke();

    System.import('./recoursion')
      .then(module => console.log(`recoursion module is loaded.`));
  });
};

body.addEventListener('click', handler);
handler();
