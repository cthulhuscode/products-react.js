import Swal from "sweetalert2";

// Firebase
import database from "../config/firebase";

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

/* -- CREATE new products -- */
export function createNewProductAction(product) {
  return async (dispatch) => {
    dispatch(addProduct());

    try {
      // Insert in the DB
      database.ref("productos/").push(product, (err) => {
        if (!err) {
          // Update the state
          dispatch(successfulAddedProduct(product));
          // Alert success
          Swal.fire(
            "Correcto",
            "El producto se agregó correctamente",
            "success"
          );
        }
      });
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

/* -- GET the products from the DB -- */
export function getProductsAction() {
  return async (dispatch) => {
    dispatch(getProducts());

    try {
      await database.ref("/productos").once("value", async (snapshot) => {
        const products = convertToArrayOfObjects(await snapshot.val());
        dispatch(obtainedProducts(products));
      });
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
const convertToArrayOfObjects = (data) => {
  // Convert results to array of objects
  const entries = Object.entries(data);
  const products = entries.map((el) => {
    el[1].key = el[0];
    return el[1];
  });
  return products;
};

/* -- DELETE product -- */
export function deleteProductAction({ id, key }) {
  return async (dispatch) => {
    dispatch(getProductToDelete(id));

    try {
      //await axiosClient.delete(`/productos/${id}`);
      await database.ref(`/productos/${key}`).remove((err) => {
        if (!err) {
          dispatch(productDeleted());

          // Show alert if deleted successful
          Swal.fire("Eliminado!", "El producto ha sido eliminado.", "success");
        }
      });
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

/* EDIT product in the API and State */
export function editProductAction(product) {
  return async (dispatch) => {
    dispatch(editProduct());

    try {
      database.ref(`/productos/${product.key}`).update(product, (err) => {
        if (!err) {
          dispatch(editedProduct(product));

          // Show alert if edition successful
          Swal.fire(
            "Actualizado!",
            "El producto ha sido actualizado correctamente.",
            "success"
          );
        }
      });
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
