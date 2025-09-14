import React from 'react'
import Navbar from './Navbar'
import {Outlet} from 'react-router-dom'
import Footer from './Fooder'

export default function Mainnevigation() {
  return (
    <>
        <Navbar/>
        <Outlet />
        <Footer />
    </>
  )
}
