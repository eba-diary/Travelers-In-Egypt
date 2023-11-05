import { Stack } from "@chakra-ui/react";
import React from "react";
import CardDeck from "./ui/card-deck";
import Carousel from "./ui/carousel";
import Contributors from "./ui/contributors";
import DatabaseCards from "./ui/database/database-cards";
import GeneralInformation from "./ui/general-information";
import LargeSearchBar from "./ui/large-search-bar";
import ToolHeaderCards from "./ui/tools/tool-header-cards";

export default function StaticPageTemplate({ components }) {
    return (
        <React.Fragment>
            <Stack gap='25px'>
                {components.map((component, index) => {
                    switch (component.type) {
                        case 'carousel':
                            return <Carousel key={index} data={component} />
                        case 'large-search-bar':
                            return <LargeSearchBar key={index} data={component} />
                        case 'card-deck':
                            return <CardDeck key={index} data={component} />
                        case 'general-information':
                            return <GeneralInformation key={index} data={component} />
                        case 'student-contributors':
                            return <Contributors key={index} data={component} />
                        case 'database-container':
                            return <DatabaseCards key={index} data={component} />
                        case 'tool-container':
                            return <ToolHeaderCards key={index} data={component} />
                        default:
                            return <React.Fragment key={index}></React.Fragment>
                    }
                })}
            </Stack>
        </React.Fragment>
    )
}