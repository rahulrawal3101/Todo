import React from 'react'
import Header from './Header'
import MiddlePartHome from './MiddlePartHome'

const HomePage = ({roboto,roboto2}) => {
  return (
    <>
        <Header roboto={roboto} list={'profile'}/>
        <MiddlePartHome roboto={roboto} roboto2={roboto2}/>
    </>
  )
}

export default HomePage