import React from "react";


export const IPFS_BASE_URL = "https://ipfs.infura.io/ipfs/";

export const REQUEST_APP_STATE = 'echo/REQUEST_APP_STATE';
export const SET_APP_STATE_TREE = 'echo/SET_APP_STATE_TREE';
export const RECEIVE_APP_STATE = 'echo/RECEIVE_APP_STATE';
export const RECEIVE_APP_STATE_KEY = 'echo/RECEIVE_APP_STATE__KEY';
export const RETRIEVE_KEY = 'echo/RETRIEVE_KEY';
export const APP_STATE_KEY = 'echo/__state_key';

export const START_IN_PROGRESS = "echo/START_IN_PROGRESS";
export const END_IN_PROGRESS = "echo/END_IN_PROGRESS";






export const startInProgress = () => ({
  type: START_IN_PROGRESS
})


