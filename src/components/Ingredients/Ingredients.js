import React, { useState, useEffect,useCallback,useReducer} from 'react'
import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Axios from  'axios';

 
const ingredientReducer=(curentIngredient,action)=>{

switch (action.type) {
  case 'SET':
    return action.ingredients;
  case 'ADD':
    return [...curentIngredient,action.ingredient];

  case 'DELETE':
    return curentIngredient.filter(ing=> ing.id !== action.id);
  default: 
    throw new Error('should not get there');
}

}

const httpReducer=(currentHttp,action)=>{
  switch (action.type){
    case 'SENDING':
      return {isloading: true, error:null}
    case 'RESPONSE':
      return {...currentHttp,isloading:false}
    case 'ERROR' :
      return {isloading: false ,error:"Something wrong happend"}
    case 'CLEARDATA':
        return {...currentHttp,error:null}
    default :
      throw new Error('should not reached')
    

  }
}

function Ingredients() {

const [ingredients, dispatch] = useReducer(ingredientReducer, [])
//const [ingredients,setIngredient]=useState([]);



const [httpState,httpDispatch]=useReducer(httpReducer,{
  isloading: false,
  error:null
})
//const  [isloading,setloading]=useState(false);
//const [error,setError]=useState()





  // useEffect(()=>{
  //   Axios.get('https://react-hook-91a5a.firebaseio.com/ingredients.json')
  //   .then(response=>{
  //     const loadingIngre=[]
  //  for(let key in response.data){
  //    loadingIngre.push({
  //     Name: response.data[key].Name,
  //     Amount: response.data[key].Amount,
  //     id:response.data[key]
  //    })
  //     }
  //     setIngredient(loadingIngre)
  //   })
  // },[])
  

const addIngre=(ingredient)=>{
  //setloading(true)
  httpDispatch({type:'SENDING'})
Axios({
  method: 'POST',
  url: 'https://react-hook-91a5a.firebaseio.com/ingredients.json',
  data: ingredient,
  headers: {'Accept': 'application/json',
  'Content-Type': 'application/json;charset=UTF-8'}}) 
.then(response=>{
 // setloading(false);
 httpDispatch({type:'RESPONSE'})
  let obj=JSON.parse(response.config.data);
  // setIngredient(prevIngre=>{
  //   return [...prevIngre,{id:obj.Name ,...ingredient}]
 
  //  });

   dispatch({type:'ADD',ingredient:{id:obj.Name ,...ingredient}})

})
.catch(error=>{
  //setError('Somethiing wrong');
  //setloading(false)
  httpDispatch({type:'ERROR'})
  
})




}

const ingredientsData=useCallback(loadingData => {
    //setIngredient(loadingData);
    dispatch({type: 'SET', ingredients:loadingData})

  },
  []
);



const onRemoveItem=(ingreID)=>{
  Axios({
    method: 'delete',
    url: `https://react-hook-91a5a.firebaseio.com/ingredients/${ingreID}.json`,
  })
  .then(response=>{
  //   setIngredient(prevIngre=>{
  // return prevIngre.filter(ingredient=>ingredient.id !== ingreID)
  //   });

    dispatch({type:'DELETE',id:ingreID});
 
  
  })

}
const clearError=()=>{
  //setError(null)
  httpDispatch({type:'CLEARDATA'})


}

  return (
    <div className="App">
      <IngredientForm addIngre={addIngre} isloading={httpState.isloading}/>
      {httpState.error && <ErrorModal onClose={clearError}> {httpState.error}</ErrorModal>}
      <section>
        <Search ingredientsDta={ingredientsData} />
        <IngredientList ingredients={ingredients} onRemoveItem={onRemoveItem}/>
      </section>
    </div>
  );
}

export default Ingredients;
