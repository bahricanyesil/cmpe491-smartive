import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import AboutPage from './pages/about/about';
import CafeMenu from './pages/cafe-menu/cafe-menu';
import ClinicalTrialData from './pages/clinical-trial-data/clinical_trial_data';
import Clothing from './pages/clothing/clothing';
import GameObjects from './pages/game-objects/game_objects';
import HomePage from './pages/home-page/home_page';
import Insurance from './pages/insurance/insurance';
import NumberedEventTicket from './pages/numbered-event-ticket/numbered_event_ticket';
import ProductManagement from './pages/product-management/product_management';
import StadiumTicket from './pages/stadium-ticket-page/stadium_ticket';
import TimeSlot from './pages/time-slot/time_slot';
import TravelTicket from './pages/travel-ticket/travel_ticket';
import UnNumberedEventTicket from './pages/unnumbered-event-ticket/unnumbered_event_ticket';
import WeightedMultipleVoting from './pages/weighted-multiple-voting/weighted_multiple_voting';

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage/>} />
        </Routes>
        <Routes>
          <Route path='/about' element={<AboutPage/>} />
        </Routes>
        <Routes>
          <Route path='/stadium-ticket' element={<StadiumTicket/>} />
        </Routes>
        <Routes>
          <Route path='/cafe-menu' element={<CafeMenu/>} />
        </Routes>
        <Routes>
          <Route path='/clinical-trial-data' element={<ClinicalTrialData/>} />
        </Routes>
        <Routes>
          <Route path='/clothing' element={<Clothing/>} />
        </Routes>
        <Routes>
          <Route path='/numbered-event-ticket' element={<NumberedEventTicket/>} />
        </Routes>
        <Routes>
          <Route path='/product-management' element={<ProductManagement/>} />
        </Routes>
        <Routes>
          <Route path='/game-objects' element={<GameObjects/>} />
        </Routes>
        <Routes>
          <Route path='/insurance' element={<Insurance/>} />
        </Routes>
        <Routes>
          <Route path='/time-slot' element={<TimeSlot/>} />
        </Routes>
        <Routes>
          <Route path='/travel-ticket' element={<TravelTicket/>} />
        </Routes>
        <Routes>
          <Route path='/unnumbered-event-ticket' element={<UnNumberedEventTicket/>} />
        </Routes>
        <Routes>
          <Route path='/weighted-multiple-voting' element={<WeightedMultipleVoting/>} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
