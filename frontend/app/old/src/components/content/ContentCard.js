import { Card, CardBody, CardTitle, CardText } from 'reactstrap'

export default function ContentCard(props) {
    return (
            <Card>
                <CardBody>
                    <CardTitle>
                        { props.entries.fields.title }
                    </CardTitle>
                    <CardText>
                        { props.entries.fields.description }
                    </CardText>
                </CardBody>
            </Card>
    )
}