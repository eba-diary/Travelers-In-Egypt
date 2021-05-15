import ebaTitle from './img/EBA_title_img.jpeg';
import './Banner.css';

export default function Banner() {
    return (
        <div className='title-banner'>
            <div className='container'>
                <img src={ebaTitle} alt='Emma B. Andrews title'/>
            </div>
        </div>
    );
}