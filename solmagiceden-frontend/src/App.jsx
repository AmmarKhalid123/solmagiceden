import React, { useState,useEffect,useRef } from 'react';
import ReactDOM from 'react-dom'
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { getPhantomWallet, PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";

import Slider from "react-slick";
// import moment from 'moment'
// import moment from 'moment-with-locales-es6';

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/jquery/dist/jquery.min.js';
// slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DetailPage } from './component/detailPage';
import { HomePage } from './component/home';
import { NavbarCustom } from './component/navbarCustom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserReq } from './redux/ActionCreators';



// import Slider1 from './component/slickSlider';  

function App() {

  const authedUser = useSelector(state => state.authedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const connectWallet = async () => {
    if (Object.keys(authedUser.authedUser).length === 0){

      // if (window.solana){
      try{
        let wallet = new PhantomWalletAdapter();
        await wallet.connect();
        console.log(wallet);
        console.log(wallet._wallet.publicKey.toString());
        console.log(loginUserReq);
        dispatch(loginUserReq(wallet._wallet.publicKey.toString()));  
      }
      catch(e){
        alert('Unable to connect, try again!');
      }
      // }
        // else{
        //     alert('Install Wallet');
        // }
    }
    else{
        navigate(`/profile/${authedUser.authedUser.address}`);
    }
  }

  return (
  <>
    <NavbarCustom connectWallet={connectWallet} authedUser={authedUser} />
    <Routes>
        <Route path="/profile/:address" element={<DetailPage />} />
        <Route path="/" element={<HomePage /> } />
      </Routes>
  </>
    
  );
}

export {App};
