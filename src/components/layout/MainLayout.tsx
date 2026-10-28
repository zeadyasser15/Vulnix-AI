import { Outlet } from "react-router-dom"
import Navbar from "./navbar/Navbar"

function MainLayout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    
    </>
  )
}

export default MainLayout