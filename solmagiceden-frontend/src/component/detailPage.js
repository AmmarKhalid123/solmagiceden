
import React, { useState,useEffect,useRef } from 'react';
import {Link, useNavigate, useParams} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import editIcon from '../images/editIcon.svg'
import b1 from "../images/b1.jpg"
import solanaImg from "../images/solana.png"
import discordIcon from "../images/discord.png"
import twitterIcon from "../images/twitter.png"
import {Modal,Button, Dropdown} from 'react-bootstrap'

import metamask from "../images/metamask.png"
import art1 from "../images/art1.png"
import profile1 from "../images/profile1.jpg"
// import Slider1 from '../component/slickSlider';  
import { NavbarCustom } from './navbarCustom';
import { loginUserReq, unLinkDiscord, uploadCoverImage, uploadProfileImage } from '../redux/ActionCreators';
import EditProfileModal from './editProfileModal';

var moment = require('moment-timezone');


function DetailPage() {
  let { address } = useParams();
  const dispatch = useDispatch();
  const authedUser = useSelector(s => s.authedUser);
  const [user, setUser] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);
  const [show, setShow] = useState(false);
  const [isDiscordOpen, setDiscordDD] = useState(false);

  const handleClose = () => {
    setShow(false);
  }

  const handleShow = () => {
    setShow(true);
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/users/getuser/${address}`)
    .then(r => r.json())
    .then(res => {
        if (res.success){
            setLoadingUser(false);
            setUser(res.user);
        }
        else{
            setLoadingUser(false);
        }
    })
  }, [address]);

  let navigate = useNavigate();

  const unLinkDisc = () => {
    if (authedUser.authedUser.address === user.address){
      if (user.discord){
        dispatch(unLinkDiscord(authedUser.authedUser._id))
        .then(res => {
          setUser(res.payload);
        })  
      }
      else{
        window.open(`https://discord.com/oauth2/authorize?response_type=code&scope=identify%20guilds%20guilds.members.read&client_id=993116062616920144&state=${authedUser.authedUser._id}`, "_self")
      }
    }
  }

  const changeCover = () => {
    if (user.address === authedUser.authedUser.address){
        document.getElementById('upload-cover-img').click();     
    }
  }

  const changeProfilePic = () => {
    if (user.address === authedUser.authedUser.address){
        document.getElementById('upload-profile-img').click();     
    }
  }

  const coverImgUpload = (e) => {
    if (e.target.files.length === 1){
        dispatch(uploadCoverImage(e.target.files[0], authedUser.authedUser.address))
        .then(r => {
            console.log(r);
            setUser(r.payload);
        })
    }
  }

  const profileImgUpload = (e) => {
    if (e.target.files.length === 1){
        dispatch(uploadProfileImage(e.target.files[0], authedUser.authedUser.address))
        .then(r => {
            console.log(r);
            setUser(r.payload);
        })
    }
  }

  const openWindow = (url ) => {
    window.open(url.startsWith('http') ? url : `https://${url}`);
  }

  if (loadingUser){
    return(
      <>
      </>
    );
  }
  else if (Object.keys(user).length === 0){
    return (<>
      <h4>No user with this address</h4>
    </>)
  }
  else{
    return (
        <>
            {/* section 1 */}
              {/* banner */}
              {true}
              <div className="profilePageMain">
                <div className="container-fluid">
                  <div className="descBanner">
                    <div className="imgDiv">
                        <img className='coverImg' src={`${process.env.REACT_APP_BASE_URL}/${user.cover}`} alt="banner" />
                    </div>
                    <div className="descBannerContent">
                        <div className="container-fluid">
                        
                        <div className="descBannerLinkContainer" style={{visibility: authedUser.authedUser.address === user.address ? 'visible' : 'hidden'}}>
                          <div className="writeReviewDiv" onClick={changeCover}>
                              <div className="WriteRevBtn" >Change cover <img className='ml-2' src={editIcon} alt="" />
                                {/* <input type="file" /> */}
                              </div>
                          </div>
                          <input type='file' accept="image/*" onChange={coverImgUpload} id="upload-cover-img" style={{display: 'none'}} />
                        </div>

                      </div>
                    </div>
                  </div>
                    <div className="row mx-0 profileMain">
                        <div className="logoDiv"><img src={`${process.env.REACT_APP_BASE_URL}/${user.profilepic}`} onClick={changeProfilePic} alt="" /></div>
                        {/* <div className="EditLogoDiv">
                                <label className="EditLogo" >
                                    <span><i class="fal fa-pencil-square-o ml-2" aria-hidden="true"></i></span>
                                    <input type="file" />
                                </label>
                        </div> */}
                        <input type='file' accept="image/*" onChange={profileImgUpload} id="upload-profile-img" style={{display: 'none'}} />

                    </div>


                    <div className="editMain">
                      <div className='col1'>
                          <div className="addressMain mr-1">
                            <img src={solanaImg} alt="" height="22" />
                            {user.address.substring(0,8)}....{user.address.substring(36,43)}
                          </div>
                          <div className="floorP">
                          Total Floor price <span> ◎ 50</span>
                          </div>
                      </div>
                      <div className='col2'>
                        {authedUser.authedUser.address === user.address ? (
                        <div className="writeReviewDiv" onClick={() => handleShow(true)}>
                          <div className="editProfBtn" >Edit Profile <img className='ml-2' src={editIcon} alt="" /> </div>
                        </div>
                        ) : (<></>)}
                        {user.discord && (
                        authedUser.authedUser.address === user.address ? (
                          <>
                          <Dropdown className="discord-uname" isOpen={isDiscordOpen}>
                            <Dropdown.Toggle id="discord-username-btn">
                              <div className="writeReviewDiv ml-2">
                                  <div className="editProfBtn" > <img className='ml-2' src={discordIcon} alt="" height="22" style={{color: 'white'}} /> {user.discord}
                                  </div>
                              </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu id="unlinc-disc-btn">
                              <Dropdown.Item onClick={() => unLinkDisc()} id="unlinc-disc-btn-link">
                                Unlink Discord
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                          </>
                        ) : (<div className="writeReviewDiv ml-2">
                            <div className="editProfBtn" > <img className='ml-2' src={discordIcon} alt="" height="22" style={{color: 'white'}} /> {user.discord}
                            </div>
                        </div>)
                        )} 
                        {!user.discord && authedUser.authedUser.address === user.address ? (
                          <div className="writeReviewDiv ml-2" onClick={() => window.open(`https://discord.com/oauth2/authorize?response_type=code&scope=identify%20guilds%20guilds.members.read&client_id=993116062616920144&state=${authedUser.authedUser._id}`, "_self")} >
                            <label className="editProfBtn" > <img className='ml-2' src={discordIcon} alt="" height="22" style={{color: 'white'}} /> Link Discord
                              <input type="file" />
                            </label>
                          </div>
                        ) : (<></>)}
                        {user.twitter ? (
                          <div className="writeReviewDiv ml-2" onClick={() => openWindow(`https://twitter.com/${user.twitter}`)}>
                            <label className="editProfBtn" > <img className='ml-2' src={twitterIcon} alt="" height="22" style={{color: 'white'}} /> {user.twitter}
                              <input type="file" />
                            </label>
                          </div>
                        ) : (<></>)}
                      </div>
                    </div>

                    <div className="filterLinks">
                      <div>
                        <button className='btn'>My Items</button>
                        <button className='btn'>Listed Items</button>
                        <button className='btn'>Auctions</button>
                      </div>
                      <div>
                        <button className='btn'>Offers Made</button>
                        <button className='btn'>Offers Received</button>
                        <button className='btn'>Activities</button>
                      </div>
                    </div>

                    <div className="nftCardMain">
                          <div className="row">
                            <NftCard />
                            <NftCard />
                            <NftCard />
                            <NftCard />
                            <NftCard />
                          
                          </div>
                        </div>
                </div>
              </div>
            <EditProfileModal show={show} handleClose={handleClose} setUser={setUser} user={user} />
        </>
    );
  }

}

const NftCard = () =>{
 return(
  <div className="col-sm-6 col-lg-4 col-xl-3">    
    <Link className='nftCardLink' to="/marketplace/detail">
      <div className="nftCard">
        <div className="imgDiv">
          <img src={art1} alt="" />
        </div>
        <div className="infoMain">
          <p className="id">Del God Collection</p>
          <div className="contentDiv">
              <div className="priceDiv">
                <p>Floor price</p>
              </div>
              <div className="priceDiv">
                <p>◎ 50</p>
              </div>
          </div>
        </div>
      </div>
    </Link>               

  </div>
 )
}

export {DetailPage};