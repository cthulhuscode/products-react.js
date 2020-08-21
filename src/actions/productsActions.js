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
  GET_PRODUCT_TO_DELETE,
  SUCCESSFUL_PRODUCT_DELETION,
  ERROR_DELETING_PRODUCT,
  GET_PRODUCT_TO_EDIT,
  BEGIN_PRODUCT_EDITION,
  SUCCESSFUL_PRODUCT_EDITION,
  ERROR_EDITING_PRODUCT,
} from "../types";

/* -- Create new products -- */
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

// actions
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

/* -- Get the products from the DB -- */
export function getProductsAction() {
  return async (dispatch) => {
    dispatch(getProducts());

    try {
      const response = await axiosClient.get("/productos");
      dispatch(obtainedProducts(response.data));
    } catch (error) {
      console.log(error);
      dispatch(errorGettingProducts(true));
    }
  };
}

// actions
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

/* -- Delete product -- */
export function deleteProductAction(id) {
  return async (dispatch) => {
    dispatch(getProductToDelete(id));

    try {
      await axiosClient.delete(`/productos/${id}`);
      dispatch(productDeleted());

      // Show alert if deleted successful
      Swal.fire("Eliminado!", "El producto ha sido eliminado.", "success");
    } catch (error) {
      dispatch(deletingProductError());
      console.log(error);
    }
  };
}
// actions
const getProductToDelete = (id) => ({
  type: GET_PRODUCT_TO_DELETE,
  payload: id,
});
const productDeleted = () => ({
  type: SUCCESSFUL_PRODUCT_DELETION,
});
const deletingProductError = () => ({
  type: ERROR_DELETING_PRODUCT,
  payload: true,
});

/* Select product to edit */
export function selectProductToEditAction(product) {
  return (dispatch) => {
    dispatch(getProductToEdit(product));
  };
}
// actions
const getProductToEdit = (product) => ({
  type: GET_PRODUCT_TO_EDIT,
  payload: product,
});

/* Edit product in the API and State */
export function editProductAction(product) {
  return async (dispatch) => {
    dispatch(editProduct());

    try {
      await axiosClient.put(`/productos/${product.id}`, product);

      dispatch(editedProduct(product));
    } catch (error) {
      console.log(error);
      dispatch(editingProductError);
    }
  };
}
// actions
const editProduct = () => ({
  type: BEGIN_PRODUCT_EDITION,
  payload: true,
});
const editedProduct = (product) => ({
  type: SUCCESSFUL_PRODUCT_EDITION,
  payload: product,
});
const editingProductError = () => ({
  type: ERROR_EDITING_PRODUCT,
  payload: true,
});
