import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore'
import ProductStore from './store/ProductStore';

export const Context = createContext(null);
console.log(process.env.REACT_APP_API_URL)//в будущем надо стереть или закоменитить


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        products: new ProductStore(),
    }}>
    <App />
  </Context.Provider>  
);

