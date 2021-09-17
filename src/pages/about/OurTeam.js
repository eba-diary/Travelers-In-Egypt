import Markdown from 'markdown-to-jsx';
import React, { useEffect, useState } from 'react';
import ourTeamMarkdown from './md/OurTeam.md';

function OurTeam() {
    let pageContent = 
        <div>
            <PageText />
        </div>;

    return(pageContent);
}

function PageText() {
    let [content, setContent] = useState({md: ""});

    useEffect(() => {
        fetch(ourTeamMarkdown)
            .then((res) => res.text())
            .then((md) => {
                setContent({md})
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);
    return (
        <div>
            <Markdown children={content.md}/>
        </div>
    )
}

export default OurTeam;