import * as ActionTypes from './ActionTypes';

export const loginUser = (u) => ({
  type: ActionTypes.LOGGED_IN,
  payload: u
});

export const updateUser = (u) => ({
  type: ActionTypes.UPDATE_USER,
  payload: u
});

export const logoutUser = (u) => ({
  type: ActionTypes.LOGGED_OUT,
});

export const loginUserReq = (address) => dispatch => {
  return fetch(`${process.env.REACT_APP_BASE_URL}/users/exists/${address}`)
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then(r => {
      if (r.success){
        return dispatch(loginUser(r.user));
      }
      else{
        return r.message;
      }
    });
};

export const uploadCoverImage = (img, address) => dispatch => {
  let headers = new Headers();

  let formdata = new FormData();

  formdata.append('coverImg', img, img.name);
  formdata.append('address', address);

  return fetch(`${process.env.REACT_APP_BASE_URL}/users/update-cover`, {
    method: 'PUT',
    body: formdata,
    headers: headers
  })
  .then(r => r.json())
  .then(res => {
    console.log(res);
    if (res.success){
      return dispatch(updateUser(res.updated_user));
    }
  })
}

export const uploadProfileImage = (img, address) => dispatch => {
  let headers = new Headers();

  let formdata = new FormData();

  formdata.append('profileImg', img, img.name);
  formdata.append('address', address);

  return fetch(`${process.env.REACT_APP_BASE_URL}/users/update-profile-img`, {
    method: 'PUT',
    body: formdata,
    headers: headers
  })
  .then(r => r.json())
  .then(res => {
    console.log(res);
    if (res.success){
      return dispatch(updateUser(res.updated_user));
    }
  })
}
