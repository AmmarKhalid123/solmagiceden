import React from "react";
import {Modal,Button} from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../redux/ActionCreators";

export default function EditProfileModal({show, handleClose, setUser}){
  const authedUser = useSelector(state => state.authedUser);
  const dispatch = useDispatch();
  const updateUserDetails = () => {
    let uname = document.getElementById('uname-edit').value;
    let discord = document.getElementById('discord-edit').value;
    let twitter = document.getElementById('twitter-edit').value;
    if (uname){
      discord = discord ? discord : '';
      twitter = twitter ? twitter : '';
      console.log(uname, discord, twitter, authedUser.authedUser._id);
      dispatch(updateUserProfile(uname, discord, twitter, authedUser.authedUser._id))
      .then(r => {
        setUser(r.payload)
        alert('Success');
      });
    }
    else{
      alert('Username is required');
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
        <div className="form-group">
          <input type="text" className="form-control" id="discord-edit" defaultValue={authedUser.authedUser.discord} placeholder="Discord" />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" id="twitter-edit" defaultValue={authedUser.authedUser.twitter} placeholder="Twitter" />
        </div>
        <button className='btn editBtn' onClick={updateUserDetails}>Submit</button>
      </div>
    </Modal.Body>
  </Modal>
  );
}