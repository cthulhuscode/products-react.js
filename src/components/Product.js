import React from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

// Redux
import { useDispatch } from "react-redux";
import {
  deleteProductAction,
  selectProductToEditAction,
} from "../actions/productsActions";

const Product = ({ product }) => {
  const { name, price, id } = product;

  const dispatch = useDispatch();
  const history = useHistory(); // Enable history for redirection

  // Confirm deletion
  const confirmDeletion = (id) => {
    // Ask to the user
    Swal.fire({
      title: "¿Estás seguro de eliminarlo?",
      text: "El producto no podrá se recuperado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        // Send it to the action
        dispatch(deleteProductAction(id));
      }
    });
  };

  // Redirect in a programmed way
  const redirectProductEdition = (product) => {
    dispatch(selectProductToEditAction(product));
    history.push(`/products/edit/${product.id}`);
  };

  return (
    <tr>
      <td>{name}</td>
      <td>
        <span className="font-weight-bold"> ${price} </span>
      </td>
      <td className="acciones">
        <button
          type="button"
          onClick={() => redirectProductEdition(product)}
          className="btn btn-primary mr-2 "
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmDeletion(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Product;
