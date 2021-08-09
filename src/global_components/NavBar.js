import NavBarList from './navbar.json';
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

function NavBar() {
    // props have "header" field and "pages" field DONE
    // map header and pages to divs. DONE

    // headers will be mapped into their own columns DONE
    // pages will be mapped into their own list DONE

    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);

    const toggleDropdown = () => {
        let dropdown = document.querySelector('.dropdown');

        toggle();
        open ? dropdown.style.display = 'none' : dropdown.style.display = 'block';
    }

    let nav = NavBarList.map((links) => {
        let header = 
            <div>
                {links.header}
                <FontAwesomeIcon icon={faCaretDown} className='fa-icon'/>
            </div>
        let pages = 
            <div className='container'>
                <div className='row'>
                    {links.pages.map((page)=> {
                        let list = 
                            <div className='col-12'>
                                <ul key={page}>{page}</ul>
                            </div>
                        return <li key={page}>{list}</li>;
                    })
                    }
                </div>
            </div>;
        
        return (
            <div className='inline-block' key={header}>
                <button onClick={toggleDropdown}>
                    {header}
                </button>
                <div className='dropdown' style={{display: 'none'}} key={pages}>
                    {pages}
                </div>
            </div>
        );
    });

    // each page in a list will be put in a stacked bootstrap column DONE
    // each header will be put in a bootstrap column DONE

    // each header will have a down arrow on the right  DONE
    // each header will have an onclick event listener that toggles the corresponding bootstrap column
    // the render for the corresponding bootstrap column will be ripple effect
    // the onclick toggle will rotate the arrow 180 degrees

    // the headers will be put in an inline row

    // the headers, for medium and smaller screen, will turn into hamburger
    // hamburger will have onclick event listener that will display stacked headers
    // headers will have onclick function that toggles a fluid list of pages

    // each page will have an href for the <Route> component to know which page to render


    // TODO debug checks:
    // "headers" may need to be anchor tags

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-10'>
                    <div className='title'>
                        Traveler <br/> In Egypt
                    </div>
                    <div className='nav'>
                        {nav}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;