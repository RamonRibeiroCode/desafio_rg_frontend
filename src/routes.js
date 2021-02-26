import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Recipes from './pages/Recipes'
import NewRecipe from './pages/NewRecipe'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/recipes" component={Recipes} />
        <Route path="/newRecipe" component={NewRecipe} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes