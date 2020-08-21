import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Redux
import { editProductAction } from "../actions/productsActions";

const EditProduct = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // Local state
  const [product, setProduct] = useState({
    name: "",
    price: 0,
  });

  // Get the product sent
  const selectedProduct = useSelector((state) => state.products.editingproduct);

  useEffect(() => {
    (() => {
      if (!selectedProduct) return null;
      setProduct(selectedProduct);
    })();
  }, [selectedProduct]);

  // Read form data
  const onChangeInput = (e) => {
    setProduct({
      ...product,
      [e.target.name]:
        e.target.name === "price" ? +e.target.value : e.target.value,
    });
  };

  const { name, price } = product;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate
    if (name.trim() === "" || price <= 0) {
      return;
    }

    // Send product to the action
    dispatch(editProductAction(product));

    // Redirect to the List
    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar producto
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="">Nombre producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre producto"
                  name="name"
                  value={name}
                  onChange={onChangeInput}
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
                  onChange={onChangeInput}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Guarda cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
