import React from "react";
import CardDeck from "./ui/card-deck";
import Carousel from "./ui/carousel";
import LargeSearchBar from "./ui/large-search-bar";

export default function StaticPageTemplate({ components }) {
    return (
        <React.Fragment>
            {components.map((component, index) => {
                switch (component.type) {
                    case 'carousel':
                        return <Carousel key={index} data={component} />
                    case 'large-search-bar':
                        return <LargeSearchBar key={index} data={component} />
                    case 'card-deck':
                        return <CardDeck key={index} data={component} />
                }
            })}
        </React.Fragment>
    )
}