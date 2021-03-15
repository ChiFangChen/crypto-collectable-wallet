import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import MainList from 'pages/MainList';
import Detail from 'pages/Detail';

const RootRouter: FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/detail/:contract_address/:token_id" component={Detail} />
        <Route path="/list" component={MainList} />
        <Redirect path="*" to="/list" />
      </Switch>
    </Router>
  );
};

export default RootRouter;
