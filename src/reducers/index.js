// Archivo que permite combinar todos los reducers

import { combineReducers } from "redux";

// Reducers
import productsReducer from "./productsReducer";

// Al final crea un sólo reducer
export default combineReducers({
  products: productsReducer,
});
