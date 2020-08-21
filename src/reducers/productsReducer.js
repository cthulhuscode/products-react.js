// Types
import {
  ADD_PRODUCT,
  SUCCESSFUL_ADDED_PRODUCT,
  UNSUCCESSFUL_ADDED_PRODUCT,
  BEGIN_PRODUCTS_DOWNLOAD,
  SUCCESSFUL_PRODUCTS_DOWNLOAD,
  UNSUCCESSFUL_PRODUCTS_DOWNLOAD,
} from "../types";

// Cada reducer tiene su propio state
const initialState = {
  products: [],
  error: null,
  loading: false,
};

// El state puede ser enviado desde el store o si no será el initialState
export default function (state = initialState, action) {
  // Definir los casos que describan la aplicación y cambien el state según el payload
  switch (action.type) {
    case BEGIN_PRODUCTS_DOWNLOAD:
    case ADD_PRODUCT:
      return {
        ...state,
        loading: action.payload,
      };

    case SUCCESSFUL_ADDED_PRODUCT:
      return {
        ...state,
        loading: false,
        products: [action.payload, ...state.products],
      };

    case UNSUCCESSFUL_PRODUCTS_DOWNLOAD:
    case UNSUCCESSFUL_ADDED_PRODUCT:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SUCCESSFUL_PRODUCTS_DOWNLOAD:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
      };

    default:
      return state;
  }
}
