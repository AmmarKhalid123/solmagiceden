import React, { useState,useEffect,useRef } from 'react';
import ReactDOM from 'react-dom'
import { Routes, Route, Link, useNavigate, useParams, useSearchParams, Navigate, useLocation } from "react-router-dom";
import { getPhantomWallet, PhantomWalletAdapter, SlopeWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";

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
import { loginUserReq, setDiscordUser } from './redux/ActionCreators';
import axios from 'axios';
import qs from 'qs';

const DiscordFetch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  console.log(searchParams.get('code'));
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (searchParams.get('code')){
      dispatch(setDiscordUser(searchParams.get('code'), searchParams.get('state')))
      .then(res => {
        console.log(res, res.type === 'LOGGED_IN');
        if (res.type === 'LOGGED_IN'){
          navigate(`/profile/${res.payload.address}`);
        }
        else{
          navigate('/');
        }
      });
    }
  }, []);

  if (searchParams.get('code')){
    return(
      // <Navigate to={`/profile/${searchParams.get('state')}`} />
      <></>
    );
  }
  else{
    return(
      <Navigate to='/'/>
    );  
  }
}



// import Slider1 from './component/slickSlider';  

function App() {
  const authedUser = useSelector(state => state.authedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loc = useLocation();
  console.log(loc);

  const connectWallet = async (wallet, cb) => {
    if (Object.keys(authedUser.authedUser).length === 0){

      // if (window.solana){
      try{
        let address = '';
        if (wallet === 'phantom'){
          let wallet = new PhantomWalletAdapter();
          await wallet.connect();
          console.log(wallet);
          console.log(wallet._wallet.publicKey.toString());
          address = wallet._wallet.publicKey.toString();
        }
        else if (wallet === 'slope'){
          let wallet = new SlopeWalletAdapter();
          await wallet.connect();
          console.log(wallet);
          console.log(wallet._publicKey.toString());  
          address = wallet._publicKey.toString();
        }
        else if (wallet === 'solflare'){
          let wallet = new SolflareWalletAdapter();
          await wallet.connect();
          console.log(wallet);
          console.log(wallet._wallet.publicKey.toString());  
          address = wallet._wallet.publicKey.toString();
        }
        dispatch(loginUserReq(address));
        if (cb){
          cb();
        }
      }
      catch(e){
        console.log(e);
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
        <Route path="/discord/" element={<DiscordFetch connectWallet={connectWallet} /> } />
      </Routes>
  </>
    
  );
}

export {App};
