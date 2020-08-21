import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import { createNewProductAction } from "../actions/productsActions";

const NewProduct = ({ history }) => {
  // State
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  // Use useDispatch and get a function
  const dispatch = useDispatch();

  // Store States
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  // Dispatch is used to call the functions in the actions
  // Call the action of the productsActions
  const addProduct = (product) => dispatch(createNewProductAction(product));

  // Handle submit
  const submitNewProduct = (e) => {
    e.preventDefault();

    // Validate
    if (name.trim() === "" || price <= 0) {
      return;
    }

    // No errors

    // Create new product
    addProduct({ name, price });

    // Reset fields
    setName("");
    setPrice(0);

    // Redirect
    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar nuevo producto
            </h2>

            <form onSubmit={submitNewProduct}>
              <div className="form-group">
                <label htmlFor="">Nombre producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre producto"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="">Precio producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio producto"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(+e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>

            {loading ? <p>Cargando...</p> : null}
            {error ? (
              <p className="alert alert-danger p1 mt-4 text-center">
                Error al agregar producto
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
