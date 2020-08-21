// Types
import {
  ADD_PRODUCT,
  SUCCESSFUL_ADDED_PRODUCT,
  UNSUCCESSFUL_ADDED_PRODUCT,
  BEGIN_PRODUCTS_DOWNLOAD,
  SUCCESSFUL_PRODUCTS_DOWNLOAD,
  UNSUCCESSFUL_PRODUCTS_DOWNLOAD,
  GET_PRODUCT_TO_DELETE,
  SUCCESSFUL_PRODUCT_DELETION,
  ERROR_DELETING_PRODUCT,
  GET_PRODUCT_TO_EDIT,
  SUCCESSFUL_PRODUCT_EDITION,
  ERROR_EDITING_PRODUCT,
  BEGIN_PRODUCT_EDITION,
} from "../types";

// Cada reducer tiene su propio state
const initialState = {
  products: [],
  error: null,
  loading: false,
  deletingproduct: null,
  editingproduct: null,
};

// El state puede ser enviado desde el store o si no será el initialState
export default function (state = initialState, action) {
  // Definir los casos que describan la aplicación y cambien el state según el payload
  switch (action.type) {
    case BEGIN_PRODUCT_EDITION:
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
        products: [...state.products, action.payload],
      };

    case ERROR_DELETING_PRODUCT:
    case UNSUCCESSFUL_PRODUCTS_DOWNLOAD:
    case UNSUCCESSFUL_ADDED_PRODUCT:
    case ERROR_EDITING_PRODUCT:
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

    case GET_PRODUCT_TO_DELETE:
      return {
        ...state,
        deletingproduct: action.payload,
      };

    case SUCCESSFUL_PRODUCT_DELETION:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== state.deletingproduct
        ),
        deletingproduct: null,
      };

    case GET_PRODUCT_TO_EDIT:
      return {
        ...state,
        editingproduct: action.payload,
      };

    case SUCCESSFUL_PRODUCT_EDITION:
      return {
        ...state,
        editingproduct: null,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? (product = action.payload)
            : product
        ),
      };

    default:
      return state;
  }
}
