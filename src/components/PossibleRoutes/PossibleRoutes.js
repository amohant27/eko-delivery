import React, { Component } from 'react';
import { Container, Form, ButtonToolbar, Button, Row, Col, FormLabel, ListGroup } from 'react-bootstrap';
import './PossibleRoutes.css';
import {
    parsedInput
} from '../../util/directedGraph';
import
getPossiblePaths
    from '../../util/possiblePath';
class PossibleRoutes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: '',
            onlyPossibleRoutesArr: [],
            routesArr: '',
            cheapestRoute: '',
            showCheapestRoutes: false,
            errorTxt: '',
            showError: false,
        }
        this.srcInput = React.createRef();
        this.destInput = React.createRef();
        this.getPossibleNodes = this.getPossibleNodes.bind(this);
        this.getRoutes = this.getRoutes.bind(this);
        this.getCheapestRoute = this.getCheapestRoute.bind(this);
        this.showCheapestRoutes = this.showCheapestRoutes.bind(this);
    }

    getPossibleNodes(maxStops) {
        this.setState({ showCheapestRoutes: false })

        let srcInput = this.srcInput.value && this.srcInput.value.toUpperCase();
        let destInput = this.destInput.value && this.destInput.value.toUpperCase();
        const resultSource = /^[A-Za-z]$/.test(srcInput);
        const resultDest = /^[A-Za-z]$/.test(destInput);

        //if src and destination is empty 
        // if the src and destination match the regex
        if (srcInput.length === 0 || destInput.length === 0) {
            this.setState({ showError: true })
            this.setState({ onlyPossibleRoutesArr: [] })
            this.setState({ errorTxt: 'Please provide the source/destination' })
        }else if (!resultSource || !resultDest){
            this.setState({ showError: true });
            this.setState({ onlyPossibleRoutesArr: [] })
            this.setState({ errorTxt: 'Incorrect Value, Please enter correct Route Code' })
        }else {
            // find all possible paths
            var routes = getPossiblePaths(srcInput,destInput, parsedInput);
            if(routes !== ''){
                const routesArr = routes.split(';');
                const onlyPossibleRoutesArr = [];
                const onlyRoutesWithMaxFourST = [];
                this.setState({ routesArr: routes });
                this.setState({ showError: false });

                routesArr.map((route, i) => {
                    const routePerNode = route.split('=');
                    console.log(maxStops === 4);
                    if (maxStops === 4 && routePerNode[0].length <= 5) {
                        const routeWithFourStops = this.getRoutes(routePerNode[0]);
                        onlyRoutesWithMaxFourST.push(routeWithFourStops);
                        this.setState({ onlyPossibleRoutesArr: onlyRoutesWithMaxFourST })
                    } else {
                        const formedRoute = this.getRoutes(routePerNode[0]);
                        onlyPossibleRoutesArr.push(formedRoute);
                        this.setState({ onlyPossibleRoutesArr: onlyPossibleRoutesArr })
                    }
                    return routePerNode;
                });
                this.getCheapestRoute(routesArr);
            }else {
                this.setState({ onlyPossibleRoutesArr: [] })
                this.setState({ errorTxt: 'No Such Route' })
                this.setState({ showError: true });
               
            }
        }    
    }


    getCheapestRoute(routes) {
        var routeCostArr = [];
        routes.map((item) => {

            item = item.split('=');
            var route = item[0];
            var costs = item[1];
            var totalCost = 0;

            costs = costs.split(':');
            for (var i = 0; i < costs.length; i++) {
                totalCost += Number(costs[i]);
            }

            var routeCostObj = { 'path': route, 'cost': totalCost };
            routeCostArr.push(routeCostObj);

            // sort by value
            routeCostArr.sort(function (a, b) {
                return a.cost - b.cost;
            });

            this.setState({ cheapestRoute: routeCostArr[0] })
            return routeCostArr;

        })

    }

    showCheapestRoutes() {
        this.setState({ showCheapestRoutes: true })
    }


    getRoutes(str) {
        var newStr = '';
        for (var i = 0; i <= str.length - 1; i++) {
            let sym = '';
            if (i !== str.length - 1) {
                sym = "-"
            }

            var append = str[i] + sym;
            newStr = newStr + append;
        }
        return newStr;
    }

    render() {
        let routesFormed = '';
        if (this.state.onlyPossibleRoutesArr.length > 0) {
            routesFormed = this.state.onlyPossibleRoutesArr.map((route, index) => {
                return <ListGroup.Item key={route.toString()}>{route}</ListGroup.Item>
            })
        }


        return (
            <div className="pathModule">
                <Container className="module" >
                <br/>
                    <Row>
                        <Col xs={2}><FormLabel className="font-label">Source : </FormLabel></Col>
                        <Col xs={3}><Form.Control size="md" type="text" placeholder="source" ref={(srcInput) => this.srcInput = srcInput}  ></Form.Control>
                        </Col>
                        <Col xs={7}></Col>
                    </Row>
                    <br />
                    <Row>
                        <Col xs={2}><FormLabel className="font-label" >Destination : </FormLabel></Col>
                        <Col xs={3}><Form.Control size="md" type="text" placeholder="destination" ref={(destInput) => this.destInput = destInput}  ></Form.Control>
                        </Col>
                        <Col xs={7}></Col>
                    </Row>
                    <br />
                    {this.state.showError && <FormLabel className="error-pr"> {this.state.errorTxt}</FormLabel>}

                    <Row>
                        <Col xs={3}>
                            <ButtonToolbar>
                                <Button variant="secondary" size="md" id="findNodesBtn" active onClick={this.getPossibleNodes.bind(this, 'no')}>
                                    Find All Possible Routes
                                </Button>
                            </ButtonToolbar>
                        </Col>
                        <Col xs={4}>
                            <ButtonToolbar>
                                <Button variant="secondary" size="md" active onClick={this.getPossibleNodes.bind(this, 4)}>
                                     Routes with Max 4 stops
                                </Button>
                            </ButtonToolbar>
                        </Col>

                    </Row>
                    
                    {this.state.onlyPossibleRoutesArr.length > 0 && <div className="list-group font-label">
                        <div>We found <strong>{this.state.onlyPossibleRoutesArr.length}</strong> Routes for you.</div>
                        <br/>
                        <div>{routesFormed}</div>
                        <br/>
                        <Row>
                            <Col xs={1}></Col>
                            <Col xs={10}>
                                <ButtonToolbar>
                                    <Button variant="secondary" size="md" active onClick={this.showCheapestRoutes}>
                                       Find the Cheapest Route
                                </Button>
                                </ButtonToolbar>
                            </Col>
                            <Col xs={1}></Col>
                        </Row>
                    </div>}




                    {this.state.showCheapestRoutes && <div className="list-group font-label-cheapest">
                        <div>Take <strong>{this.state.cheapestRoute.path}</strong> which will cost you <strong>{this.state.cheapestRoute.cost}</strong></div>
                    </div>}

                </Container>

            </div>

        )
    }
}

export default PossibleRoutes;
