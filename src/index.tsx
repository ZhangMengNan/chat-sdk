import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'src/App';

const myComponent = document.createElement('div');
myComponent.id = 'myRoot';

ReactDOM.createRoot(myComponent as HTMLElement).render(<App />);

document.body.appendChild(myComponent);
