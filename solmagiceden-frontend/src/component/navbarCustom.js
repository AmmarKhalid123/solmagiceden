import React from "react";
import searchIcon from '../images/searchIcon.svg'

export const NavbarCustom = ({connectWallet, authedUser}) => {
  return (
        <nav className="navbar navbar-light navbar-expand-lg  row mx-0  navFont pr-0 ai-center-lg"  style={{alignItems: 'flex-start'}}>
          <div className=" col-md-4 col-lg-3 col-2 col-auto text-center p-0">
            <a className="navbar-brand p-0" style={{marginTop: '-6px'}} href="/">
                <h3 className="">Logo</h3>
                {/* <img src={Logo} alt="Logo" />  */}
            </a>
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
            <button className="btn color-white connectWalletBtn" onClick={connectWallet} >
              {Object.keys(authedUser.authedUser).length === 0 ? 'CONNECT WALLET' : `${authedUser.authedUser.address?.substring(0,5)}...${authedUser.authedUser.address?.substring(39,43)}`}
            </button>
            
          </div>
        </nav>
  )
};
