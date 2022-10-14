import { useState, useEffect } from 'react';
import { useContentfulLanding } from '../useContentful'
import { Container, Col, Row, Card, CardBody, CardTitle, CardText} from 'reactstrap'
import "./css/Landing.css";

export default function Landing(props) {

    const { getFeaturedArticles } = useContentfulLanding()

    const [featuredArticles, setFeaturedArticles] = useState({
        articles: []
    })

    useEffect(() => {
        getFeaturedArticles().then(response => setFeaturedArticles({articles: response.items}))
    }, [])

    return (
        <Container fluid>
            { featuredArticles.articles.map((entries, index) => {
                const sliderCard = entries.fields.sliderCards.map((entries, index) => {
                    return (
                        <Col>
                        <link rel="stylesheet" type="text/css" href="./css/Landing.css"/>
                            <Card>
                                <CardBody>
                                    <CardTitle>
                                        { entries.fields.title }
                                    </CardTitle>
                                    <CardText>
                                        { entries.fields.description }
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    )
                })
                return (
                    <Row key={index} xs='2' sm='3' md='4'>
                        { sliderCard }
                    </Row>
                )})
            }

        </Container>
    )

}