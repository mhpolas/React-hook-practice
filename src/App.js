import React,{useContext} from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/auth/Auth';
import {AuthContext} from './components/Context/Context-auth';



const App = props => {
  //return <Ingredients />;
  const Context=useContext(AuthContext);
  let content=<Auth />;
  if(Context.isAuth){
    return <Ingredients />
  }
  return content ;
};

export default App;
