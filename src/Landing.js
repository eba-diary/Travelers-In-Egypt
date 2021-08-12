import React from 'react';
import './css/Landing.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import background from './img/eba_bg.png';

function Landing() {

    let img = document.createElement('img');
    img.src = background;
    img.alt = 'historical Egyptian site';

    let mobile = document.createElement('p');
    let textNode = document.createTextNode('mobile test');
    mobile.appendChild(textNode);

    const handleResize = () => {
        let length = window.innerWidth;
        let row = document.getElementById('row');
        row.innerHTML = '';
        length >= 458 ? row.appendChild(img) : row.appendChild(mobile);
    }

    window.addEventListener('resize', handleResize);

    return (
        <div className='row' id='row'>
            <img src={background} alt={img.alt}/>
        </div>
    );
}

export default Landing;