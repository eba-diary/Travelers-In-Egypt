import ContentCard from './ContentCard'
import { useState, useEffect } from 'react';
import { useContentfulLanding } from '../useContentful'
import { Container, Col, Row, Card, CardBody, CardTitle, CardText} from 'reactstrap'

export default function CardSlider(props) {

    const { getFeaturedArticles } = useContentfulLanding()

    const [featuredArticles, setFeaturedArticles] = useState({
        articles: []
    })

    useEffect(() => {
        getFeaturedArticles().then(response => setFeaturedArticles({articles: response.items}))
    }, [])

    return (
        <Container fluid>
            <Row key={index} xs='2' sm='3' md='4'>
            { featuredArticles.articles.map((entries, index) => {
                return (
                    <Col key={index}>
                        <ContentCard data={{entries: entries}} />
                    </Col>
                )})
            }
            </Row>
        </Container>
    )

}