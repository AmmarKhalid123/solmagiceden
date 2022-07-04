import React, { useState } from "react";
import searchIcon from '../images/searchIcon.svg'
import { Link, NavLink } from 'react-router-dom';
import { Dropdown } from "react-bootstrap";

export const NavbarCustom = ({connectWallet, authedUser}) => {
  const [isOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!isOpen);

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
                        <Dropdown.Item>
                            <NavLink id="navbar-link" exact={true} to={`/profile/${authedUser.authedUser.address}`} className="nav-link nav-item text-center" style={{borderBottom:'1px solid white'}}>Profile</NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <NavLink id="navbar-link" exact={true} to="/settings" className="nav-link nav-item text-center px-2 pt-1"  style={{borderBottom:'1px solid white'}}>Account Settings</NavLink>
                        </Dropdown.Item>
                        {authedUser.authedUser.premium ? (
                            <>
                                <Dropdown.Item>
                                    <NavLink id="navbar-link" exact={true} to="/create-project" className="nav-link nav-item text-center px-2 pt-1"  style={{borderBottom:'1px solid white'}}>Create Project</NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <NavLink id="navbar-link" exact={true} to="/bulk-collection-create" className="nav-link nav-item text-center px-2 pt-1"  style={{borderBottom:'1px solid white'}}>Create Bulk Collection</NavLink>
                                </Dropdown.Item>
                            </>
                        ) : (<></>)}
                        <Dropdown.Item>
                            <NavLink id="navbar-link-create-collection" activeClassName="" exact={true} to="/create-collection" style={{borderBottom:'1px solid white'}} className="nav-link text-center nav-item px-2 pt-1">Create Collection</NavLink>
                        </Dropdown.Item>
                        {/* <DropdownItem>
                            <NavLink id="navbar-link-create-collection" activeClassName="" exact={true} to="/create-solana" style={{borderBottom:'1px solid white'}} className="nav-link text-center nav-item px-2 pt-1">Create Solana</NavLink>
                        </DropdownItem> */}
                        <Dropdown.Item>
                            <NavLink id="navbar-link-create-collection" activeClassName="" exact={true} to="/create-collection-solana" className="nav-link text-center nav-item px-2 pt-1">Create Solana Collection</NavLink>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                    
                </Dropdown>
              ) : (
              <button className="btn color-white connectWalletBtn" onClick={connectWallet} >
                Connect Wallet
              </button>
              )}
            {/* <button className="btn color-white connectWalletBtn" onClick={connectWallet} >
              {Object.keys(authedUser.authedUser).length === 0 ? 'CONNECT WALLET' : <>
              <img src={`${process.env.REACT_APP_BASE_URL}/${authedUser.authedUser.profilepic}`} style={{borderRadius: '50%', height: '30px', width: '30px'}} />{` `}
              {authedUser.authedUser.username ? authedUser.authedUser.username : `${authedUser.authedUser.address?.substring(0,5)}...${authedUser.authedUser.address?.substring(39,43)}`}
              </>
              }
            </button> */}
          </div>
        </nav>
  )
};
