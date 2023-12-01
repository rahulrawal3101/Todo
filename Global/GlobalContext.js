'use client'
import React, { createContext, useEffect, useReducer } from 'react'
import { reducer } from './Reducer'
import axios from 'axios'

export const context = createContext('')

const initialState = {
    allData:[],
    filteredState:[]
}

const GlobalContext = ({children}) => {

    const [state , dispatch]=useReducer(reducer , initialState)

    const fetchData = async ()=>{
      console.log("after refresh")
      const tid = JSON.parse(localStorage.getItem('tid'))
        try{
            const respData = await axios.get(`/api/showtask/${tid}`);
            // console.log(respData);
            if(respData.data.message == 'Data Fetched Successfully'){
              dispatch({
                type:"MAINDATA",
                payload:(respData.data.resp)
              })
            }

        }
        catch(err){
            console.log(err)
            alert(err)
        }
    }

    useEffect(()=>{
       fetchData();
    },[])

    // console.log("all data context",state.allData)
  return (
    <context.Provider value={{state,dispatch,fetchData}}>
        {children}
    </context.Provider>
  )
}

export default GlobalContext