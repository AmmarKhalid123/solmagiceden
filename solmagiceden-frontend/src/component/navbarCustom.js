import React, { useState } from "react";
import searchIcon from '../images/searchIcon.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dropdown, Modal } from "react-bootstrap";
import { logoutUser } from '../redux/ActionCreators';
import PhantomLogo from '../images/phantom.png'
import {ReactComponent as SolflareLogo} from '../images/solflare.svg'
import {ReactComponent as SlopeLogo} from '../images/slope.svg'

export const NavbarCustom = ({connectWallet, authedUser}) => {
  const [isOpen, setOpen] = useState(false);
  const [connectWalletModal, setConnectWalletModal] = useState(false);
  const [isConnectDDOpen, setConnectDD] = useState(false);
  const toggle = () => setOpen(!isOpen);
  const toggleConnectDD = () => setConnectDD(!isConnectDDOpen);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUserReq = () => {
    dispatch(logoutUser());
  }

  return (
        <nav className="navbar navbar-light navbar-expand-lg  row mx-0  navFont pr-0 ai-center-lg"  style={{alignItems: 'flex-start'}}>
          <div className=" col-md-4 col-lg-3 col-2 col-auto text-center p-0">
            <Link className="navbar-brand p-0" style={{marginTop: '-6px'}} to="/">
                <h3 className="">Logo</h3>
                {/* <img src={Logo} alt="Logo" />  */}
            </Link>
          </div>
          <div className="order-md-2 order-3 toggle-icon-custom">
              <button className="navbar-toggler btn-btn-toggle" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fa fa-bars" aria-hidden="true"></i>
              </button>
            </div>
          <div className="collapse navbar-collapse col-lg-6 jc-center collapse-nav" style={{fontWeight: 700, color: 'black'}} id="navbarNavAltMarkup">
              <div className="inputDiv">
                <input type="text" placeholder='Search collection, items, authors or users' />
                <img src={searchIcon} alt="" />
              </div>
          </div>

          <div className="col-lg-auto  text-center order-md-3 order-1 connect-wallet-small px-0">
            {authedUser.authedUser.address ? (
                <Dropdown isOpen={isOpen} toggle={toggle}>
                    <Dropdown.Toggle className="user-icon-circle">
                        {/* <i className="fal fa-user-circle mr-2 pl-2 pl-lg-0" style={{fontSize:'20px'}}></i> */}
                      <button className="btn color-white connectWalletBtn" >
                        <>
                        <img src={`${process.env.REACT_APP_BASE_URL}/${authedUser.authedUser.profilepic}`} style={{borderRadius: '50%', height: '30px', width: '30px'}} />{` `}
                        {authedUser.authedUser.username ? authedUser.authedUser.username : `${authedUser.authedUser.address?.substring(0,5)}...${authedUser.authedUser.address?.substring(39,43)}`}
                        </>
                      </button>
                    </Dropdown.Toggle>
                    <Dropdown.Menu right>
                        <Dropdown.Item style={{padding: '0px', color: 'white', textAlign: 'center'}} onClick={() => navigate(`/profile/${authedUser.authedUser.address}`)}>
                          Profile
                        </Dropdown.Item>
                        <Dropdown.Item style={{padding: '0px', color: 'white', textAlign: 'center'}} onClick={() => logoutUserReq()}>
                            {/* <NavLink id="navbar-link" exact={true} to="/settings" className="nav-link nav-item text-center" >Logout</NavLink> */}
                            Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Dropdown align="start" isOpen={isConnectDDOpen}>
                <Dropdown.Toggle className="user-icon-circle">
                <button className="btn color-white connectWalletBtn">
                  Connect Wallet
                </button>
                </Dropdown.Toggle>
                <Dropdown.Menu alignRight style={{width: '300px'}}>
                    <Dropdown.Item style={{padding: '10px 0px', color: 'white', marginBottom: '10px', display: 'flex', borderBottom: '1px solid white'}} onClick={() => {connectWallet('phantom', () => setConnectDD(false));}}>
                      <img src={PhantomLogo} style={{height: '50px', width: '50px', marginLeft: '15px'}} />
                      <span style={{marginLeft: '15px'}}>
                        Phantom
                      </span>
                      <span style={{marginTop: 'auto', fontSize: '10px', marginBottom: 'auto', marginRight: '15px', marginLeft: 'auto'}}>
                        {window.phantom ? 'DETECTED' : ''}
                      </span>
                    </Dropdown.Item>
                    <Dropdown.Item style={{padding: '10px 0px', color: 'white', marginBottom: '10px', display: 'flex', marginTop: '10px', borderBottom: '1px solid white'}} onClick={() => {connectWallet('solflare', () => setConnectDD(false));}}>
                      <SolflareLogo style={{ marginLeft: '15px' }}/>
                      <span style={{marginLeft: '15px'}}>
                        Solflare
                      </span>
                      
                      <span style={{marginTop: 'auto', fontSize: '10px', marginBottom: 'auto', marginRight: '15px', marginLeft: 'auto'}}>
                        {window.solflare ? 'DETECTED' : ''}
                      </span>
                    </Dropdown.Item>
                    <Dropdown.Item style={{padding: '10px 0px 0px', color: 'white', marginBottom: '10px', display: 'flex', marginTop: '10px'}} onClick={() => {connectWallet('slope', () => setConnectDD(false));}}>
                      <SlopeLogo style={{height: '50px', width: '50px', marginLeft: '15px'}} />
                      <span style={{marginLeft: '15px'}}>
                        Slope
                      </span>
                      
                      <span style={{marginTop: 'auto', fontSize: '10px', marginBottom: 'auto', marginRight: '15px', marginLeft: 'auto'}}>
                        {window.Slope ? 'DETECTED' : ''}
                      </span>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
              )}
            {/* <button className="btn color-white connectWalletBtn" onClick={connectWallet} >
              {Object.keys(authedUser.authedUser).length === 0 ? 'CONNECT WALLET' : <>
              <img src={`${process.env.REACT_APP_BASE_URL}/${authedUser.authedUser.profilepic}`} style={{borderRadius: '50%', height: '30px', width: '30px'}} />{` `}
              {authedUser.authedUser.username ? authedUser.authedUser.username : `${authedUser.authedUser.address?.substring(0,5)}...${authedUser.authedUser.address?.substring(39,43)}`}
              </>
              }
            </button> */}
          </div>
          <Modal show={connectWalletModal} onHide={() => setConnectWalletModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Connect Wallet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div onClick={() => {connectWallet('phantom', () => setConnectWalletModal(false));}} style={{color: 'white', fontSize: '20px', border: '1px solid', borderRadius: '15px', padding: '10px 5px', margin: '15px auto', display: 'flex', cursor: 'pointer'}}>
                
                <img src={PhantomLogo} style={{height: '50px', width: '50px'}} />
                <span style={{margin : 'auto'}}>
                  Phantom
                </span>
                <span style={{marginTop: 'auto', fontSize: '10px', marginBottom: 'auto', marginRight: '5px'}}>
                  {window.phantom ? 'DETECTED' : ''}
                </span>
              </div>
              <div onClick={() => {connectWallet('solflare', () => setConnectWalletModal(false));}} style={{color: 'white', fontSize: '20px', border: '1px solid', borderRadius: '15px', padding: '10px 5px', margin: '15px auto', display: 'flex', cursor: 'pointer'}}>
                <SolflareLogo />
                <span style={{margin: 'auto'}}>
                  Solflare
                </span>
                
                <span style={{marginTop: 'auto', fontSize: '10px', marginBottom: 'auto', marginRight: '5px'}}>
                  {window.solflare ? 'DETECTED' : ''}
                </span>
              </div>
              <div onClick={() => {connectWallet('slope', () => setConnectWalletModal(false));}} style={{color: 'white', fontSize: '20px', border: '1px solid', borderRadius: '15px', padding: '10px 5px', margin: '15px auto', display: 'flex', cursor: 'pointer'}}>
                <SlopeLogo style={{height: '50px', width: '50px'}} />
                <span style={{margin: 'auto'}}>
                  Slope
                </span>
                
                <span style={{marginTop: 'auto', fontSize: '10px', marginBottom: 'auto', marginRight: '5px'}}>
                  {window.Slope ? 'DETECTED' : ''}
                </span>
              </div>
            </Modal.Body>
          </Modal>

        </nav>
  )
};
