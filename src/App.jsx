import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import AppRoutes from './routes/AppRoutes.jsx';
import './styles/global.css'
import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTrashCount } from "./services/trashApi";

function App() {
  const [trashCount, setTrashCount] = useState(0);

    const loadTrashCount = () => {
        getTrashCount().then(res => {
            setTrashCount(res.data.count);
        });
    };

    useEffect(() => {
        loadTrashCount();
    }, []);
  return (
    <BrowserRouter>
      <Header trashCount={trashCount} />
      <div className="container">
        <AppRoutes reloadTrashCount={loadTrashCount} />
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
