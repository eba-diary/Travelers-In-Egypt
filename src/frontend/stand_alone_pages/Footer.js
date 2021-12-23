import React from 'react';
import { SocialIcon } from 'react-social-icons';
import './css/Footer.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function Footer() {

    // Social media links.
    const EBALINKS = ['www.facebook.com/ebadiary', 
        'www.instagram.com/emmabandrewsdiaryproject/', 
        'www.twitter.com/ebadiary?lang=en', 
        'www.github.com/orgs/eba-diary/dashboard'
    ];

    return (
        <div className='page' id='social-icons'>
            <div className='container-fluid footer'>
                <div className='row justify-content-between'>
                    <div className='col-6 col-sm-6 col-lg-4 text'>
                        <ul>
                            <div className='row'>
                                <div className='col-12 col-sm-3'>
                                    <a href='/' className='footer-link'>Credits</a>
                                </div>
                                <div className='col-12 col-sm-3'>
                                    <a href='/' className='footer-link'>Donate</a>
                                </div>
                                <div className='col-12 col-sm-3'>
                                    <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/' className='footer-link'>License</a>
                                </div>
                                <div className='col-12 col-sm-3'>
                                    <a href='/' className='footer-link'>Sitemap</a>
                                </div>                            
                            </div>
                        </ul>
                    </div>
                    <div className='col-4 col-xl-3 social-icons'>
                        <div>
                            <SocialIcons links={EBALINKS} /> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SocialIcons(props) {

    // Maps social links to a SocialIcon component that renders the
    // social media icon that corresponds to the link.
    let linksIcons = props.links.map((ebaLink) => {
        let iconWithLink = 
            <div className='col-6 col-sm-3 col-lg-2 icons' key={ebaLink}>
                <SocialIcon url={'https://' + ebaLink} 
                    style={{height: 35, width: 35}} 
                    bgColor='#EADDCA' 
                    key={ebaLink}/>
            </div>
        return iconWithLink;
    });
    
    return (
        <div className='row icons'>
            {linksIcons}
        </div>
    );
}

export default Footer;
