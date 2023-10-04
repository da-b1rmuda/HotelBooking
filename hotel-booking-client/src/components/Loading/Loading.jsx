import React from 'react';
import {Spin } from 'antd';
import './Loading.css'

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="d-f df-center-screen">
        <Spin />
      </div>
    </div>
  );
};

export default Loading;
