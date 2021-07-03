import cc from './img/cc.png';
import { SocialIcon } from 'react-social-icons';
import './Footer.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';

function FooterLinks() {
    const EBALINKS = ['www.facebook.com/ebadiary', 'github.com/orgs/eba-diary/dashboard', 'twitter.com/ebadiary?lang=en'];
    return (
        <div className='container justify-content-center'>
            <RenderIcons links={EBALINKS}/>
            <div className='row'>
                <div className='col-12 cc-image'>
                    <img src={cc} alt='creative commons logo'/>
                </div>
                    <div className='d-flex justify-content-center'>
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
            <div className='col-4'>
                <SocialIcon url={'https://' + ebaLink} bgColor='rgba(119, 101, 63, 0.8)'/>
            </div>
        return iconWithLink;
    });
    
    return (
        <div className='container d-inline-flex justify-content-center'>
            <div className='row'>
                {linksIcons}
            </div>
        </div>
    );
}

export default FooterLinks;
