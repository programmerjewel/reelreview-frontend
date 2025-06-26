import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from '../components/Footer/Footer'

const Mainlayout = () => {
  return (
    <main>
      <Navbar/>
      <div className="min-h-90"><Outlet/></div>
      
      <Footer/>
    </main>
  );
};

export default Mainlayout;