import { SocialIcon } from 'react-social-icons';
import React, { useState }from 'react';
import './Footer.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

// npm uninstall react-social-icons
// use react-icons library instead


function FooterLinks() {
    const [width, setWidth] = useState(window.innerWidth);

    const EBALINKS = ['www.facebook.com/ebadiary', 
        'www.instagram.com/emmabandrewsdiaryproject/', 
        'twitter.com/ebadiary?lang=en', 
        'github.com/orgs/eba-diary/dashboard'
    ];

    const handleResize = (e) => {
        e.preventDefault();
        setWidth(window.innerWidth);
        let div = document.getElementById('social-icons');
        div.className = '';
        width >= 458 ? div.classList.add('page') : div.classList.add('mobile-page');
        // if (width >= 458) {
        //     div.classList.add('page')
        // } else {
        //     div.classList.add('mobile-page');
        // }
    }

    window.addEventListener('resize', handleResize);

    return(
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-6 text'>
                    <ul className='inline-block'>
                        <div className='row'>
                            <li>Credits</li>
                            <li>Donate</li>
                            <li>License</li>
                            <li>Sitemap</li>
                        </div>
                    </ul>
                </div>
                <div className='col-6'>
                    <div className='page' id='social-icons'>
                        <RenderIcons links={EBALINKS} /> 
                    </div>
                </div>
                {/* <div className='col-4'>
                    <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/' className='text'>
                    Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License
                    </a>
                </div> */}
            </div>
        </div>
    );
}

function RenderIcons(props) {
    let linksIcons = props.links.map((ebaLink) => {
        let iconWithLink = 
            <div className='col-6 icons' key={ebaLink}>
                <SocialIcon url={'https://' + ebaLink} key={ebaLink} bgColor='#EADDCA'/>
            </div>
        return iconWithLink;
    });
    
    return (
        <div className='row'>
            {linksIcons}
        </div>
    );
}

export default FooterLinks;
