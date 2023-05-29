import './App.css'
import React from 'react'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import Layout from '../src/components/Layout'
import Home from '../src/components/Home'
import Contact from '../src/components/Contact'
import Shop from '../src/components/Shop'
import Item from '../src/components/Item'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Account from './components/Account'
import PDFPedido from './components/PDFPedido'

function App() {
  return(
    <Router>
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path="/shop" element={<Shop />}/>
            <Route path="/item/:id" element={<Item />}/>
            <Route path="/contact" element={<Contact />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/checkout" element={<Checkout />}/>
            <Route path="/account" element={<Account />}/>
            <Route path="/pdfpedido/:id" element={<PDFPedido />}/>
          </Route>
      </Routes>
    </Router>
  )
}

export default App;