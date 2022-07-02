
import React, { useState,useEffect,useRef } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import Slider from "react-slick";
import Slider1 from "react-slick";
import { NavbarCustom } from './navbarCustom';

import marketIcon from "../images/marketIcon.svg"
import down from "../images/down.svg"
import banner1 from "../images/banner1.png"
import clean1 from "../images/clean1.png"
import clean2 from "../images/clean2.png"
import clean3 from "../images/clean3.png"
import volume1 from "../images/volume1.png"
import volume2 from "../images/volume2.png"
import volume3 from "../images/volume3.png"
import volume4 from "../images/volume4.png"
import marketIco1 from "../images/marketIco.png"
import discord from "../images/discord.svg"
import { useSelector } from 'react-redux';
// slider

function HomePage() {


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
   
  };
  const settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
   
  };
  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow:2,
            slidesToScroll: 1,

          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          }
        },
       
      ]
  };
  return (
  <>
  <div className="homeMain">
    <div className="container">
      <div className="row">
        <div className=" col-lg-3 ">
            <div className="dropDownCard">
                <button className='title btn'>MENU <i className="far fa-ellipsis-h"></i></button>
            </div>

            <div className="dropDownCard">
              <button className="btn dropBtn title" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapse1">
              <span>
               <img src={marketIcon} alt="" />  Marketplace
                </span>
                <img src={down} alt="down" /> 
              </button>
              <div className="collapse" id="collapse1">
                <div className="card-body">
                 
                  <div className="contentMain">
                    <button className='selectContent'>
                      Popular Collections
                    </button>
                    <button className='selectContent'>
                      Highest marketcap
                    </button>
                    <button className='selectContent'>
                      Highest Volume
                    </button>
                    <button className='selectContent'>
                      Watchlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropDownCard">
              <button className="btn dropBtn title" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                      
                      <span>
                       <img src={marketIcon} alt="" />  Insights
                        </span>
                        <img src={down} alt="down" /> 
              </button>
              <div className="collapse" id="collapse3">
                <div className="card-body">
                 
                  <div className="contentMain">
                    <button className='selectContent'>
                    Show full menu
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div className="col-lg-9">
          <section className='bannerSec'>
           <Slider {...settings}>
             <div className="bannerImgDiv">
               <img src={banner1} alt="" />
               <div className="bannerContent">
                <div className='col1'>
                  <h1>Clean Collection</h1>
                  <p>Earth is the third planet from the Sun and the only astronomical</p>
                </div>
                <button className='btn launchBtn'>Launchpad</button>
               </div>
             </div>
             <div className="bannerImgDiv">
               <img src={banner1} alt="" />
             </div>
             <div className="bannerImgDiv">
               <img src={banner1} alt="" />
              </div>
            
           </Slider>
          </section>

          <section className='mostpopularSec'>
            <div className="HeadingMain">
              <div className='col1'>
                <h2>Most Popular Collections</h2>
                <div className="filterTime">
                  <button className='btn item'>1 hour</button>
                  <button className='btn item'>24 hours</button>
                  <button className='btn item'>7 days</button>
                  <button className='btn item'>30 days</button>
                </div>
              </div>
              <a href="#" className='veiw' >Veiw all</a>
            </div>
            <div className="popularSlider">
            <Slider1 {...settings1}>
              <div>
              <div className="row">
                <div className="col-6">
                  <div className="col1">
                    <img className='img-fluid mp1' src={clean1} alt="" />
                  </div>
                </div>
                <div className="col-3">
                  <div className="col1">
                    <img className='img-fluid' src={clean2} alt="" />
                  </div>
                </div>
                <div className="col-3">
                  <div className="col1">
                    <img className='img-fluid' src={clean3} alt="" />
                  </div>
                </div>
              </div>
              </div>
              <div>
              <div className="row">
               
                <div className="col-3">
                  <div className="col1">
                    <img className='img-fluid' src={clean2} alt="" />
                  </div>
                </div>
                <div className="col-3">
                  <div className="col1">
                    <img className='img-fluid' src={clean3} alt="" />
                  </div>
                </div>
                <div className="col-3">
                  <div className="col1">
                    <img className='img-fluid' src={clean2} alt="" />
                  </div>
                </div>
                <div className="col-3">
                  <div className="col1">
                    <img className='img-fluid' src={clean3} alt="" />
                  </div>
                </div>
              </div>
              </div>

           </Slider1>
            </div>
          </section>
          
          <section className='mostpopularSec marketcapMain'>
            <div className="HeadingMain">
              <div className='col1'>
                <h2>Highest marketcap</h2>
                <div className="filterTime">
                  <button className='btn item'>1 hour</button>
                  <button className='btn item'>24 hours</button>
                  <button className='btn item'>7 days</button>
                  <button className='btn item'>30 days</button>
                </div>
              </div>
              <a href="#" className='veiw'>Veiw all</a>
            </div>
            <div className="marketcapCardMain">
              <div className="row">
                <div className="col-lg-4">
                  <MarketCard sno="1" image={marketIco1} title1="DeGods" floor1="◎ 319.20" title2="DeGods" floor2="◎ 319.20" />
                  <MarketCard sno="2" image={marketIco1} title1="DeGods" floor1="◎ 319.20" title2="DeGods" floor2="◎ 319.20" />
                  <MarketCard sno="3" image={marketIco1} title1="DeGods" floor1="◎ 319.20" title2="DeGods" floor2="◎ 319.20" />
                </div>
                <div className="col-lg-4">
                  <MarketCard sno="4" image={marketIco1} title1="DeGods" floor1="◎ 319.20" title2="DeGods" floor2="◎ 319.20" />
                  <MarketCard sno="5" image={marketIco1} title1="DeGods" floor1="◎ 319.20" title2="DeGods" floor2="◎ 319.20" />
                  <MarketCard sno="6" image={marketIco1} title1="DeGods" floor1="◎ 319.20" title2="DeGods" floor2="◎ 319.20" />
                </div>
                <div className="col-lg-4">
                  <MarketCard sno="7" image={marketIco1} title1="DeGods" floor1="◎ 319.20" title2="DeGods" floor2="◎ 319.20" />
                  <MarketCard sno="8" image={marketIco1} title1="DeGods" floor1="◎ 319.20" title2="DeGods" floor2="◎ 319.20" />
                  <MarketCard sno="9" image={marketIco1} title1="DeGods" floor1="◎ 319.20" title2="DeGods" floor2="◎ 319.20" />
                </div>
              </div>
            </div>
            
          </section>

          <section className='mostpopularSec volumeSec'>
            <div className="HeadingMain">
              <div className='col1'>
                <h2>Highest Volume</h2>
                <div className="filterTime">
                  <button className='btn item'>1 hour</button>
                  <button className='btn item'>24 hours</button>
                  <button className='btn item'>7 days</button>
                  <button className='btn item'>30 days</button>
                </div>
              </div>
              <a href="#" className='veiw'>Veiw all</a>
            </div>
            <div className="volumeSlider">
            <Slider1 {...settings2}>
                <div className="col text-center">
                  <VolumeCard img={volume1} title="Del God Collection" volume="◎ 900,000" />
                </div>
                <div className="col text-center">
                  <VolumeCard img={volume2} title="Del God Collection" volume="◎ 900,000" />
                </div>
                <div className="col text-center">
                  <VolumeCard img={volume3} title="Del God Collection" volume="◎ 900,000" />
                </div>
                <div className="col text-center">
                  <VolumeCard img={volume4} title="Del God Collection" volume="◎ 900,000" />
                </div>
                <div className="col text-center">
                  <VolumeCard img={volume2} title="Del God Collection" volume="◎ 900,000" />
                </div>
                
           </Slider1>
            </div>
          </section>
          {/* watchList */}
          <section className='mostpopularSec volumeSec pt-5'>
            <div className="HeadingMain">
              <div className='col1'>
                <h2>Watchlist</h2>
                <div className="filterTime">
                  <button className='btn item'>1 hour</button>
                  <button className='btn item'>24 hours</button>
                  <button className='btn item'>7 days</button>
                  <button className='btn item'>30 days</button>
                </div>
              </div>
              <a href="#" className='veiw'>Veiw all</a>
            </div>
            <div className="volumeSlider">
            <Slider1 {...settings2}>
                <div className="col text-center">
                  <VolumeCard img={volume4} title="Del God Collection" volume="◎ 900,000" />
                </div>
                <div className="col text-center">
                  <VolumeCard img={volume3} title="Del God Collection" volume="◎ 900,000" />
                </div>
                <div className="col text-center">
                  <VolumeCard img={volume2} title="Del God Collection" volume="◎ 900,000" />
                </div>
                <div className="col text-center">
                  <VolumeCard img={volume1} title="Del God Collection" volume="◎ 900,000" />
                </div>
                <div className="col text-center">
                  <VolumeCard img={volume2} title="Del God Collection" volume="◎ 900,000" />
                </div>
                
           </Slider1>
            </div>
          </section>
        </div>
      </div>

    </div>
  </div>

  <footer className="footer">
        <div className="container">         
          {/* {/* footer * /} */}
          <div className="row row2">
            <div className="col-md-5  ">
              <div className="footerLogo">
                {/* <img src="assets/images/Logo.png" alt="logo" /> */}
                <h6>Logo</h6>
              </div>
              <p className="desc">Your <span className='onStop'> One-Stop</span> NFTs Marketplace </p>
           
              <p className="copyright">Copyright © 2022 LOGO. All rights reserved</p>
            </div>
            <div className="col-xl-2 col-lg-3 col-sm-3 col-6">
              <ul>
                <li><a href="#"> Marketplace </a></li>
                <li><a href="#vision"> Popular Collections </a></li>
                <li><a href="#whitepaper"> Launchpad </a></li>
                <li><a href="#token"> Auctions </a></li>
              </ul>
            </div>
            <div className="col-xl-3 col-lg-3 col-sm-4 col-6">
              <ul>     
                <li><a href="#" className='text-white'> Join our market community </a></li>
                <li>
                <div className="socialIcon">
                  <a href="#" target="_blank"><i className="fab fa-twitter" /></a>
                  <a href="#" target="_blank"><img src={discord} alt="" /> </a>
                  <a href="#" target="_blank"><i className="fab fa-telegram-plane" /></a>
                
                </div>
                </li>
                <li><a href="#"> Terms </a></li>
                <li><a href="#"> Privacy policy </a></li>
             
              </ul>
            </div>
           
          </div>
        </div>
      </footer>
       
  
      
  </>
    
  );
}

const VolumeCard =({img,title,volume})=>{
  return(
    <div className="volumeCard">
      <div className="imgDiv">
        <img className='img-fluid' src={img} alt="" />
      </div>
      <div className="contentMain">
        <h6>{title}</h6>
        <div className="totalVol">
          <p>Total Volume</p>
          <span>{volume}</span>
        </div>
      </div>
    </div>
  )
}

const MarketCard =({sno,image,title1,floor1,title2,floor2})=>{
  return(
    <div className="marketCard mb-4">
      <div className="col1">  
        <p className='sno'>{sno} </p>
        <img src={image} className='iconImg' alt="" />
        <div>
          <h6>{title1} </h6>
          <p className="floor">Floor  ◎ {floor1}  </p>
        </div>
      </div>
      <div className="col2">
          <h6>{title2} </h6>
          <p className="floor">Floor  ◎ {floor2}  </p>
      </div>
    </div>
  )
}

export {HomePage};