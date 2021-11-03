import Markdown from 'markdown-to-jsx';
import React, { useEffect, useState } from 'react';
import getInvolvedMarkdown from './md/GetInvolved.md';

function GetInvolved() {
    let pageContent = 
        <div>
            <MarkdownRender />
        </div>;

    return(pageContent);
}

function MarkdownRender() {
    const [content, setContent] = useState({md: ""});
    
    useEffect(() => {
        fetch(getInvolvedMarkdown)
            .then((res) => res.text())
            .then((md) => {
                setContent({md})
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);
    return (
        <div>
            <Markdown children={content.md} />
        </div>
    );
}

export default GetInvolved;