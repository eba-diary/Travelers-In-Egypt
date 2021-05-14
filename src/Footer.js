import cc from './img/cc.png';
import { SocialIcon } from 'react-social-icons';
import './Footer.css';

function FooterLinks() {
    const EBALINKS = ['www.facebook.com/ebadiary', 'github.com/orgs/eba-diary/dashboard', 'twitter.com/ebadiary?lang=en'];
    return (
        <div className='footer-links'>
            <RenderIcons links={EBALINKS}/>
            <div className='cc-info'>
                <div className='cc-image'>
                    <img src={cc} alt='creative commons logo'/>
                </div>
                <div className='cc-link'>
                    <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/' className='bottom-link'>
                        Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License
                    </a>
                </div>
            </div>
        </div>
    );
}

function RenderIcons(props) {
    let linksIcons = props.links.map((ebaLink) => {
        let iconWithLink = 
            <div className='icon-link'>
                <SocialIcon url={'https://' + ebaLink} bgColor='rgba(119, 101, 63, 0.8)'/>
            </div>;
        return iconWithLink;
    });
    
    return (
        <div className='social-link-container'>
            {linksIcons}
        </div>
    );
}

export default FooterLinks;
