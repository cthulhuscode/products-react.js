import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Header from "./components/Header";
import Products from "./components/Products";
import NewProduct from "./components/NewProduct";
import EditProduct from "./components/EditProduct";

// Redux
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Router>
      <Provider store={store}>
        {/* Se mantendrá en todas las páginas */}
        <Header />

        <div className="container mt-5">
          <Switch>
            {/* Páginas a cargarse */}
            <Route exact path="/" component={Products} />
            <Route exact path="/products/new" component={NewProduct} />
            <Route exact path="/products/edit/:id" component={EditProduct} />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
