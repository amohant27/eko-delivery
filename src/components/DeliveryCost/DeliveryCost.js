import React, { Component } from 'react';
import {
    inputRouteMap
} from '../../util/directedGraph';
import './DeliveryCost.css';
import { Container, Form, ButtonToolbar, Button, Row, Col, FormLabel } from 'react-bootstrap';

class DeliveryCost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            objectGraph: {},
            routeCost: 0,
            // routesArr: [],
            errorTxt: 'Route cannot be empty',
            showError: false,
        }
        this.pathInput = React.createRef();
    }

    componentDidMount() {
        var obj = {};
        // parsing the input array to get an object with route and cost
        //AB: 1,AC: 4,AD: 10,BE: 3,CD: 4,CF: 2,DE: 1,EB: 3,EA: 2,FD: 1
        inputRouteMap.map((item) => {
            var route = item.substring(0, 2);
            var cost = item.substring(2);
            obj[route] = Number(cost);
            return obj;
        });
        this.setState({ objectGraph: obj });

    }

    calcCost() {

        // var routesArr = [];
        var cost = 0;
        let routeGiven = this.pathInput.value;
        routeGiven = routeGiven && routeGiven.toUpperCase();

        if (routeGiven && routeGiven.length > 1) {
            this.setState({ showError: false })
            for (var i = 0; i < routeGiven.length - 1; i++) {
                var newStr = '';
                // Take 1st char of string - sourceCode and destCode
                newStr = routeGiven.charAt(i) + routeGiven.charAt(i + 1);
                // routesArr.push(newStr); // remove and check
                cost = cost + this.state.objectGraph[newStr];
                // this.setState({ routesArr: routesArr }); // remove and check
                if (isNaN(cost)) {
                    cost = 'No such Route';
                }
                this.setState({ routeCost: cost });
            }
        } else if (routeGiven && routeGiven.length === 1) {
            this.setState({ routeCost: 0 })
            this.setState({ showError: true })
            this.setState({ errorTxt: 'Route must consists of more than one route code' });
        } else {
            this.setState({ showError: true })
            this.setState({ routeCost: 0 })

        }

        return cost;
    }

    render() {
        return (
            <div className="costModule">
                <Container>
                    <Row>
                        <Col xs={3}></Col>
                        <Col xs={1}><FormLabel className="font-label">Route: </FormLabel></Col>
                        <Col xs={4}><Form.Control size="md" type="text" id="pathId" placeholder="Please enter the route" ref={(pathInput) => { this.pathInput = pathInput }}></Form.Control>
                        </Col>
                    </Row>
                    {this.state.showError && <label className="error-dc"> {this.state.errorTxt}</label>}
                    <br />
                    <Row>
                        <Col xs={5}></Col>
                        <Col xs={5}>
                            <ButtonToolbar>
                                <Button id="calCost" variant="secondary" size="md" active onClick={this.calcCost.bind(this)}>
                                    Calculate Cost
                                </Button>
                            </ButtonToolbar>
                        </Col>
                        <Col xs={9}></Col>
                    </Row>
                    {this.state.routeCost !== 0 && <FormLabel className="font-label-cost">The cost of the Route = {this.state.routeCost}.</FormLabel>}
                </Container>
            </div>
        )
    }
}

export default DeliveryCost;
