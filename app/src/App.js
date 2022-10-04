import Navbar from './Components/Navbar';
import CreateNft from './Components/CreateNft';
import Marketplace from './Components/Marketplace';
import ViewMyNft from './Components/ViewMyNft';
import Purchases from './Components/Purchases'
import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<React.Fragment>
            <CreateNft />
          </React.Fragment>}>
          </Route>

          <Route path="/createNft" element={<React.Fragment>
            <CreateNft />
          </React.Fragment>}>
          </Route>

          <Route path="/purchases" element={<React.Fragment>
            <Purchases />
          </React.Fragment>}>
          </Route>

          <Route path="/marketplace" element={<React.Fragment>
            <Marketplace />
          </React.Fragment>}>
          </Route>

          <Route path="/viewMyNft" element={<React.Fragment>
            <ViewMyNft />
          </React.Fragment>}>
          </Route>

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
