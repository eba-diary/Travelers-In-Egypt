import React from 'react';
import './Landing.css';
import ebaTitle from './img/EBA_title_img.jpeg';

function Landing() {

    return (
        <div className='body'>
            <Banner/>
        </div>
    )
}

function Banner() {
    return (
        <div className='title-banner'>
            <div className='container'>
                <div className='title-box'>
                    <img src={ebaTitle} alt='Emma B. Andrews title'/>
                </div>
            </div>
            <div className='container'>
                <div className='image-box'>
                    <div className='header-box'>
                        <h1>Travelers In Egypt</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Landing;