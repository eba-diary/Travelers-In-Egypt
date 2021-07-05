import React from 'react';
import { Card } from 'react-bootstrap';
import pyramidBackground from './img/EbaCartoonPyramid.png' ;
import Typewriter from 'typewriter-effect';
import './css/Landing.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function Landing() {
    return (
    <div className='container'>
        <div className='row'>
            <Card className='text-dark text-center' border='white'>
                <Card.Img src={pyramidBackground} alt='Egyptian pyramids'/>
                <Card.ImgOverlay>
                    <Card.Title>
                        <div className='title-container'>
                            <Typewriter 
                            onInit={(typewriter) => {
                                typewriter
                                .typeString("Travelers In Egypt")
                                .start()
                            }}/>
                        </div>
                    </Card.Title>
               </Card.ImgOverlay>
            </Card>
        </div>
    </div>
    );
}

// function Landing() {
//     const IMAGES = {
//         card1: [personalArchives, 'Personal Archives', 'PersonalArchives', PersonalArchives],
//         card2: [travelogues, 'Published Travelogues', 'Travelogues', Travelogues], 
//         card3: [tourOperators, 'Tour Operators', 'TourOperators', TourOperators], 
//         card4: [digitalExhibit, 'Digital Exhibit', 'DigitalExhibit', DigitalExhibit], 
//         card5: [about, 'About', 'About', About]
//     };
    
//     return (
//         <div className='body-content'>
//             <Card className='text-white text-center'>
//                 <Card.Img src={backgroundTitleImage} alt='Egyptian ruins'/>
//                 <Card.ImgOverlay>
//                     <div className='title-container'>
//                         <div className='title-row'>
//                             <h1>Travelers In Egypt</h1>
//                         </div>
//                     </div>
//                 </Card.ImgOverlay>
//             </Card>
//             <NavCards images={IMAGES}/>
//         </div>
//     );
// }


// function NavCards(props) {
//     return (
//         <div className='container'>
//             <RenderCards images={props.images}/>
//             <Redirect to='/'/>
//         </div>
//     );
// }

// function RenderCards(props) {
//     let cards = Object.values(props.images).map(([img, desc, path, component]) => {
//         let card = 
//             <div className='col col-md-4 col-xl-2 each-card'>
//                 <Link to={'/' + path}>
//                     <div className='top-card'>
//                         <img src={img} alt={desc} />
//                         <div className='bottom-card'>
//                             <p>{desc}</p>
//                         </div>
//                     </div>
//                 </Link>
//                 <Route path={'/' + path} component={component}/> 
//             </div>;
//         return card;
//     });

//     return (
//         <div className='row justify-content-around'>
//             {cards}
//         </div>
//     );
// }

export default Landing;