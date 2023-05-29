import React from "react";
import Carousel from "./ui/carousel";

export default function StaticPageTemplate({ components }) {
    return (
        <React.Fragment>
            {components.map((component, index) => {
                switch (component.type) {
                    case 'carousel':
                        return <Carousel key={index} data={component} />
                }
            })}
        </React.Fragment>
    )
}