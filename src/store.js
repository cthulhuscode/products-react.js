import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"; // Para utilizar funciones asíncronas
import reducer from "./reducers"; // No es necesario indicar el archivo index.js

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    typeof window === "object" &&
      typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default store;
