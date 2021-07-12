
import React, { useState,useEffect,useRef } from 'react'
import Axios from 'axios';


import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

const { ingredientsDta }=props;
const [inputData,setInputdata]=useState('')

const refValue = useRef();
useEffect(()=>{

 const timer= setTimeout(() => {
    if(inputData===refValue.current.value){
      const query=inputData.length === 0 ? '' : `?orderBy="Name"&equalTo="${inputData}"`;
      Axios.get('https://react-hook-91a5a.firebaseio.com/ingredients.json/'+query)
      .then(response=>{
        const loadingIngre=[]
     for(let key in response.data){
       loadingIngre.push({
        Name: response.data[key].Name,
        Amount: response.data[key].Amount,
        id:key
       })
        }
    
        ingredientsDta(loadingIngre)
     
    
      })
    }
  }, 500);

  return ()=>{
    clearTimeout(timer);
  }
 


},[inputData,ingredientsDta,refValue])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref={refValue} type="text" value={inputData} onChange={event=>{setInputdata(event.target.value)}} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
