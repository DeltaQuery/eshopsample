import './App.css'
import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './layouts/Navbar/Navbar'
import { Footer } from './layouts/Footer/Footer'
import { Home } from './pages/Home/Home'
import { Details } from './pages/Details/Details'
import { Search } from "./pages/Search/Search"
import { Cart } from './pages/Cart/Cart'
import AppContext from './context/AppContext'
import { useInitialState } from './hooks/useInitialState'
import { Contact } from './pages/Contact/Contact'
import { useProducts } from './hooks/queries/useProducts'
import { useFindProduct } from './hooks/queries/useFindProduct'

function App() {
 
  /*const { data, error, loading } = useProducts()
  const result = useFindProduct("1")
  console.log(data)
  if(result.data){
    console.log("funciona")
    console.log(result.data.findProduct.images[0].smallImg)
  }
  
  { result.data && <div>Hola!!<img src="C:\Users\cebra\Desktop\marateca070622\src\assets\productsImages\streaming\firelite.png"></img></div> }*/

  const initialState = useInitialState()
 
  const location = useLocation()
    React.useEffect(() => {
      window.scrollTo(0, 0)
    }, [location.key])
 
  return (
    <AppContext.Provider value={initialState}>
        <Navbar />
        <main className="mainContainer">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/details/:id" element={<Details />} />
            <Route exact path="/search/:id" element={<Search />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/contact" element={<Contact />} />

            <Route path='*' element={<Home />} />
          </Routes>
          <Footer />
        </main>
    </AppContext.Provider>
  );
}

export default App
