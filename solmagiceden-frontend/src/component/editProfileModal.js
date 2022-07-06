import React, { useState } from "react";
import {Modal,Button} from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile, unLinkDiscord } from "../redux/ActionCreators";

function onlyNumbers(str) {
  return /^[0-9]+$/.test(str);
}

const discordValid = (discord) => {
  if (discord){
    let d = discord.split('#');
    if (d.length === 2){
      if (d[1].length === 4 && onlyNumbers(d[1]) && d[0].length > 5){
        return true;
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
  }
  else{
    return true;
  }
}

let twitterNameValid = async (twitter) => {
  if (twitter){
    return fetch(`https://twitter.com/i/search/typeahead.json?q=@${twitter}`).then(r => r.json())
    .then(res => {
      return res.users.some(u => u.screen_name === twitter);
    });
  }
  else{
    return true;
  }
}

export default function EditProfileModal({show, handleClose, setUser, user}){
  const authedUser = useSelector(state => state.authedUser);
  const dispatch = useDispatch();
  const [updateLoader, setUpdateLoader] = useState(false);
  const updateUserDetails = async () => {
    setUpdateLoader(true);
    let uname = document.getElementById('uname-edit').value;
    // let discord = document.getElementById('discord-edit').value;
    let twitter = document.getElementById('twitter-edit').value;
    if (uname){
      // discord = discord ? discord : '';
      twitter = twitter ? twitter : '';
      console.log(uname, twitter, authedUser.authedUser._id);
      // if (discordValid(discord)){
        let tValid;
        try{
          tValid = await twitterNameValid(twitter);
        }
        catch(e){
          console.log(e);
          tValid = true;
        }
        if (tValid){
          dispatch(updateUserProfile(uname, twitter, authedUser.authedUser._id))
          .then(r => {
            setUser(r.payload)
            alert('Success');
            setUpdateLoader(false);
          });  
        }
        else{
          alert('Twitter name invalid');
          setUpdateLoader(false);
        }
      // }
      // else{
      //   alert('Discord username invalid');
      //   setUpdateLoader(false);
      // }
    }
    else{
      alert('Username is required');
      setUpdateLoader(false);
    }
  }


  return(
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Profile</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="editForm">
        <div className="form-group">
          <input type="text" className="form-control" id="uname-edit" defaultValue={authedUser.authedUser.username} placeholder="Username*" />
        </div>
        {/* <div className="form-group">
          <input type="text" className="form-control" id="discord-edit" defaultValue={authedUser.authedUser.discord} placeholder="Discord Username: abcdefg#0000" />
        </div> */}
        <div className="form-group">
          <input type="text" className="form-control" id="twitter-edit" defaultValue={authedUser.authedUser.twitter} placeholder="Twitter" />
        </div>
        <button disabled={updateLoader} className='btn editBtn' onClick={updateUserDetails}>{updateLoader ? 'Loading...' : 'Submit'}</button>

      </div>
    </Modal.Body>
  </Modal>
  );
}