import { useState, useEffect } from 'react';
import { useContentfulLanding } from '../useContentful'

import './css/Landing.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import aboutImage from '../img/aboutImage.jpeg';
import goalCard1 from '../img/goalCard1.png';
import goalCard2 from '../img/goalCard2.png';
import goalCard3 from '../img/goalCard3.jpg';
import arrows from '../img/goal_arrow_down.png';
import background from '../img/eba_bg.png';
import { CardImg, Col, Row, Card, CardTitle, CardText, CardBody, Button } from 'reactstrap';
import { UncontrolledCarousel } from 'reactstrap';
import projGoalsJSON from './ProjGoals.json';
import { stringify } from 'nodemon/lib/utils';
import { response } from 'express';

export default function Landing(props) {

    const { getFeaturedArticles } = useContentfulLanding()

    const [featuredArticles, setFeaturedArticles] = useState({
        articles: []
    })

    useEffect(() => {
        const featuredArticles = getFeaturedArticles()
            .then(response => {
                if (response) {
                    return response.json()
                }
            }).catch((error) => {
                console.log(`Error getting Landing page data: ${error}`)
            })
        setFeaturedArticles(featuredArticles)
    }, [])

    return (
        <div>
            Test
        </div>
    )

}