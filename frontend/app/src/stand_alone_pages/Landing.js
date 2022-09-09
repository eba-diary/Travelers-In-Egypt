import { useState, useEffect } from 'react';
import { useContentfulLanding } from '../useContentful'
import { Container, Col, Row, Card, CardBody, CardTitle, CardText} from 'reactstrap'

export default function Landing(props) {

    const { getFeaturedArticles } = useContentfulLanding()

    const [featuredArticles, setFeaturedArticles] = useState({
        articles: []
    })

    useEffect(() => {
        getFeaturedArticles().then(response => setFeaturedArticles({articles: response.items}))
    }, [])

    return (
        <Container>
            { featuredArticles.articles.map((entries, index) => {
                const sliderCard = entries.fields.sliderCards.map((entries, index) => {
                    return (
                        <Card>
                            <CardText>
                                { entries.fields.title }
                            </CardText>
                            <CardBody>
                                { entries.fields.description }
                            </CardBody>
                        </Card>
                    )
                })
                return (
                    <Row key={index}>
                        <Col sm='3' md='1'>
                            { sliderCard }
                        </Col>
                    </Row>
                )})
            }

        </Container>
    )

}