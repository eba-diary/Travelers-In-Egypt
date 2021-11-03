import React, { useEffect, useState } from 'react';
import './css/Landing.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import background from '../img/eba_bg.png';
import Markdown from 'markdown-to-jsx';
import aboutMarkdown from './md/About.md';


function Landing() {

    let img = document.createElement('img');
    img.src = background;
    img.alt = 'historical Egyptian site';

    // This element is for mobile demo and will be changed later.
    let mobile = document.createElement('p');
    let textNode = document.createTextNode('mobile test');
    mobile.appendChild(textNode);

    // Changes elements depending on screen size.
    const handleResize = () => {
        let length = window.innerWidth;
        let row = document.getElementById('row');
        row.innerHTML = '';
        length >= 458 ? row.appendChild(img) : row.appendChild(mobile);
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleResize);

    return (
        <div>
            <div className='row' id='row'>
                <img src={background} alt={img.alt}/>
            </div>
            <div>
                <MarkdownRender />
            </div>
        </div>
    );
}

function MarkdownRender () {
    const [content, setContent] = useState({md: ""});

    useEffect(() =>{
        fetch(aboutMarkdown)
            .then((res) => res.text())
            .then((md) => {
                setContent({md})
            })
            .catch((err) => {
                console.log(err)
            });
    });

    return (
        <div>
            <Markdown children={content.md}/>
        </div>
    );
}

export default Landing;