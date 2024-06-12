import React, { useContext, useEffect, useState } from "react";
import {BrowserRouter} from 'react-router-dom';
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NAVs/Navbar";
import NavMenu from "./components/NAVs/NavMenu"; 
import { observer } from "mobx-react-lite";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import {Context} from "./index";
import Footer from "./components/NAVs/Footer";
import NavbarClone from "./components/NAVs/NavbarClone";
import NavScrollExample from "./components/NAVs/Navbarnew"

const App= observer(() =>{
 
  const {user}=useContext(Context)
  const [loading, setLoading]=useState(true)

  useEffect(() => {
    check().then(data => {
        user.setUser(data.role)
        user.setUser(data.id_user)
        user.setIsAuth(true)
        if(data.role==='ADMIN'){
          user.setIsAdmin(true)
        }
    }).catch(error=>{
      console.error('Не авторизован:',error)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner animation={"grow"}/>
  }

  return (
    <BrowserRouter>
        {/* <NavScrollExample/> */}
        <NavBar />
        {/* <NavbarClone/> */}
        <NavMenu />
        <AppRouter />
        <Footer />
    </BrowserRouter>
  );
});

export default App;
