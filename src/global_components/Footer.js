import { SocialIcon } from 'react-social-icons';
import React, { useState }from 'react';
import { IconContext } from 'react-icons';
import './Footer.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


function FooterLinks() {
    const [width, setWidth] = useState(window.innerWidth);

    const EBALINKS = ['www.facebook.com/ebadiary', 
        'www.instagram.com/emmabandrewsdiaryproject/', 
        'www.twitter.com/ebadiary?lang=en', 
        'www.github.com/orgs/eba-diary/dashboard'
    ];
    
    const handleResize = () => {
        let div = document.getElementById('social-icons');
        setWidth(window.innerWidth);
        div.className = '';

        if (width >= 658) {
            div.classList.add('page');

        } else {
            div.classList.add('mobile-page');
        }
    }
    window.addEventListener('load', handleResize);
    window.addEventListener('resize', handleResize);

    return(
        <div className='page' id='social-icons'>
            <IconContext.Provider value={{color: '#DED7B9', size: '1em'}}>
                <div className='container-fluid'>
                    <div className='row justify-content-lg-between'>
                        <div className='col-6 text'>
                            <ul>
                                <div className='row'>
                                    <p>Learn More</p>
                                    <li className='footer-links'><a href='/'>Credits</a></li>
                                    <li className='footer-links'><a href='/'>Donate</a></li>
                                    <li className='footer-links'><a href='/'>License</a></li>
                                    <li className='footer-links'><a href='/'>Sitemap</a></li>
                                </div>
                            </ul>
                        </div>
                        <div className='col col-sm-6 col-lg-4'>
                            <div>
                                <RenderIcons links={EBALINKS} /> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className='copyright'>
                    <a className='text' 
                        href=
                        'https://creativecommons.org/licenses/by-nc-sa/4.0/'
                    >
                        <div className='cc-page'>
                            &copy; Creative Commons 
                            <span className='mobile-untoggle'>
                                Attribution-NonCommercial-ShareAlike 4.0 
                                International License 
                            </span>
                        </div>

                    </a>
                </div>
            </IconContext.Provider>
        </div>
    );
}

function RenderIcons(props) {
    let linksIcons = props.links.map((ebaLink) => {
        let str = '' + ebaLink;
        str = str.substring(
            str.indexOf('.') + 1, 
            str.lastIndexOf('.'));
        str = str.charAt(0).toUpperCase() + str.substring(1);
        let iconWithLink = 
            <div className='col-6 col-xl-5 icons' key={ebaLink}>
                <SocialIcon url={'https://' + ebaLink} 
                    style={{height: 35, width: 35}} 
                    bgColor='#EADDCA' 
                    key={ebaLink}/>
                <p className='social-titles mobile-untoggle'>{str}</p>
            </div>
        return iconWithLink;
    });
    
    return (
        <div className='row justify-content-xl-around'>
            <p className='follow-title'>Follow Us</p>
            {linksIcons}
        </div>
    );
}

export default FooterLinks;
