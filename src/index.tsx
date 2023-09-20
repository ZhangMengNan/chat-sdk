import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'src/App';

const myComponent = document.createElement('div');
myComponent.id = 'myRoot';
const uuid = document.currentScript?.getAttribute('uuid') || '';



ReactDOM.createRoot(myComponent as HTMLElement).render(<App uuid={uuid} />);

document.body.appendChild(myComponent);
