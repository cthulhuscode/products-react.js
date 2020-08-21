import axiosClient from "../config/axios";
import Swal from "sweetalert2";

// Types
import {
  ADD_PRODUCT,
  SUCCESSFUL_ADDED_PRODUCT,
  UNSUCCESSFUL_ADDED_PRODUCT,
  BEGIN_PRODUCTS_DOWNLOAD,
  SUCCESSFUL_PRODUCTS_DOWNLOAD,
  UNSUCCESSFUL_PRODUCTS_DOWNLOAD,
} from "../types";

// Create new products
export function createNewProductAction(product) {
  return async (dispatch) => {
    dispatch(addProduct());

    try {
      // Insert in the API
      await axiosClient.post("/productos", product);

      // Update the state
      dispatch(successfulAddedProduct(product));

      // Alert success
      Swal.fire("Correcto", "El producto se agregó correctamente", "success");
    } catch (error) {
      console.log(error);
      dispatch(unsuccessfulAddedProduct(true));

      // Alert error
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Error al agregar el producto",
      });
    }
  };
}

/* ACTIONS */
const addProduct = () => ({
  type: ADD_PRODUCT,
  payload: true,
});
// If product was saved correctly
const successfulAddedProduct = (product) => ({
  type: SUCCESSFUL_ADDED_PRODUCT,
  payload: product,
});
// If there was an error saving the product
const unsuccessfulAddedProduct = (status) => ({
  type: UNSUCCESSFUL_ADDED_PRODUCT,
  payload: status,
});

// Get the products from the DB
export function getProductsAction() {
  return async (dispatch) => {
    dispatch(getProducts());

    try {
      const response = await axiosClient.get("/productos");
      console.log(response.data);

      dispatch(obtainedProducts(response.data));
    } catch (error) {
      console.log(error);
      dispatch(errorGettingProducts(true));
    }
  };
}

const getProducts = () => ({
  type: BEGIN_PRODUCTS_DOWNLOAD,
  payload: true,
});
const obtainedProducts = (products) => ({
  type: SUCCESSFUL_PRODUCTS_DOWNLOAD,
  payload: products,
});
const errorGettingProducts = (status) => ({
  type: UNSUCCESSFUL_PRODUCTS_DOWNLOAD,
  payload: status,
});
