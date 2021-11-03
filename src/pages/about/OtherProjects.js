import React, { useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx';
import otherProjectsMarkdown from './md/OtherProjects.md';

function OtherProjects() {
    let content = 
        <div>
            <MarkdownRender />
        </div>;

    return(content);
}

function MarkdownRender() {
    const [content, setContent] = useState({md: ""});

    useEffect(() => {
        fetch(otherProjectsMarkdown)
            .then((res) => res.text())
            .then((md) => {
                setContent({md});
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

export default OtherProjects;