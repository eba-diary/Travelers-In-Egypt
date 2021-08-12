import NavBarList from './navbar.json';
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

function NavBar() {

    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);

    let nav = NavBarList.map((links) => {
        let header = 
            <div>
                {links.header}
                <FontAwesomeIcon icon={faCaretDown} className='fa-icon'/>
            </div>
        let pages = 
            <div className='dropdown' style=
            {{display: 'none'}} key={links.pages}>
                <ul>
                    <div className='container'>
                        <div className='row'>
                            {links.pages.map((page)=> {
                                let list = 
                                    <li key={page}>{page}</li>
                                return <div className='col-12' key={page}>{list}</div>;
                            })
                            } 
                        </div>
                    </div>
                </ul>
            </div>;
        return (
            <div className='inline-block' key={links.header}>
                <button className='dropdown-button'>
                    {header}
                </button>
                {pages}
            </div> 
        );
    });

    // make header a link (try button later)
    // header and div dropdown will have same key
    // header has onclick function that takes in the key as param
    // the cb function will get the 

    let dropdown = document.querySelectorAll('.dropdown');
    let button = document.querySelectorAll('.dropdown-button');

    for (let i = 0; i < dropdown.length; i++) {
        button[i].addEventListener('click', ()=> {
            console.log('clicked button and dropdown at index ' + i);
            toggle();
            if (open) {
                dropdown[i].style.display = 'block';
            } else {
                dropdown[i].style.display = 'none';
            }
        })
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-10'>
                    <div className='title'>
                        Travelers <br/> In Egypt
                    </div>
                    <div className='nav'>
                        {nav}
                    </div>
                </div>
            </div>
        </div>
    );
}




// last straw code

// function NavBarPartTwo() {
//     return (
//         <div className='wrapper'>
//             <div className='navbar'>
//                 <ul>
//                     <li>
//                         <a href='#' className='a_parent'>
//                             <div className='wrap'>
//                                 <span className='text'>About</span>
//                                 <FontAwesomeIcon icon={faCaretDown} className='fa-icon'/>
//                             </div>
//                         </a>
//                     </li>
//                     <li>
//                         <a href='#' className='a_parent'>
//                             <div className='wrap'>
//                                 <span className='text'>Explore Databases</span>
//                                 <FontAwesomeIcon icon={faCaretDown} className='fa-icon'/>
//                             </div>
//                         </a>
//                     </li>
//                     <li>
//                         <a href='#' className='a_parent'>
//                             <div className='wrap'>
//                                 <span className='text'>Connecting Information</span>
//                                 <FontAwesomeIcon icon={faCaretDown} className='fa-icon'/>
//                             </div>
//                         </a>
//                     </li>
//                     <li>
//                         <a href='#' className='a_parent'>
//                             <div className='wrap'>
//                                 <span className='text'>Historical Markup Tool</span>
//                                 <FontAwesomeIcon icon={faCaretDown} className='fa-icon'/>
//                             </div>
//                         </a>
//                     </li>
//                     <li>
//                         <a href='#' className='a_parent'>
//                             <div className='wrap'>
//                                 <span className='text'>Help</span>
//                                 <FontAwesomeIcon icon={faCaretDown} className='fa-icon'/>  
//                             </div>
//                         </a>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     )   
// }

export default NavBar;