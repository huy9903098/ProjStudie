import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';



// Register User
export const registerUser = (userData, history) => (dispatch) => {
    axios
        .post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

// Login - Get user token
export const loginUser = userData => (dispatch) => {
    axios
        .post('/api/users/login', userData)
        .then((res) => {
            // Save to localstorage
            const { token } = res.data; // token userid name the avatar ...
            // Set token to ls
            localStorage.setItem('jwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set curretn user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};


// Set logged in user
export const setCurrentUser = decoded => ({
    type: SET_CURRENT_USER,
    payload: decoded
});



// Log user out
export const logoutUser = () => (dispatch) => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};