import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Product from './views/Product';
import Person from './views/Person';
import { Menu } from './views/Menu';
import { Home } from './views/Home';
import { PageError } from './views/Error';
import ProductTable from "./views/ProductTable";
import Promotion from "./views/Promotion";
import PromotionTable from "./views/PromotionTable";
import Move from "./views/Move";
import Buy from "./views/Buy";
import Sale from "./views/Sale";

const App = () => (
  <Router>
    <div>
      <Menu />
      <Suspense fallback={
        <div className="center section valign-wrapper">
        <div className="progress">
          <div className="indeterminate"></div>
          </div>
        </div>
      }>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/person" component={Person} />
          <Route exact path="/product" component={Product} />
          <Route exact path="/productTable" component={ProductTable} />
          <Route exact path="/promotion" component={Promotion} />
          <Route exact path="/promotionTable" component={PromotionTable} />
          <Route exact path="/move" component={Move} />
          <Route exact path="/buy" component={Buy} />
          <Route exact path="/sale" component={Sale} />
          <Route component={PageError} />
        </Switch>
      </Suspense>
    </div>
  </Router>
);


export default App;