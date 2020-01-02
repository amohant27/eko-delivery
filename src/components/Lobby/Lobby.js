import React, { Component } from 'react';
import { Container, Jumbotron, ButtonToolbar, Button, Row, Col} from 'react-bootstrap';
import './style.css';
import DeliveryCost from '../DeliveryCost/DeliveryCost';
import PossibleRoutes from '../PossibleRoutes/PossibleRoutes';

class Lobby extends Component {
    constructor(props) {
        super(props);
            this.state={
                showDeliveryCost : false,
                showPossibleRoutes: false,
                showCompanyInfo: true,
            }
        this.onClickPath = this.onClickPath.bind(this);
    }

    onClickPath(type){
        if(type === 1){
            this.setState({ showDeliveryCost: true });
            this.setState({ showPossibleRoutes: false });
        }else if (type ===2){
            this.setState({ showPossibleRoutes: true });
            this.setState({ showDeliveryCost: false });
        }
    }

    render() {
        return (
            <div className="layout">
                <Jumbotron fluid className="layout">
                    <Container>
                        <h1 >Welcome to Eko Delivery Services</h1>
                        <p>
                            To help customers​ ​to​ ​define​ ​the​ ​delivery​ ​route​ ​by​ ​themselves.
                        </p>
                        
                        <p >
                           <strong> Routes available :</strong> 'AB1', 'AC4', 'AD10', 'BE3', 'CD4', 'CF2', 'DE1', 'EB3', 'EA2', 'FD1'
                        </p>
 
                        <br/>
                        <Row>
                            <Col xs={4}>
                                <ButtonToolbar>
                                    <Button variant="outline-info" size="lg" onClick={this.onClickPath.bind(this,1)}>
                                       Calculate Delivery Cost
                                </Button>
                                </ButtonToolbar>
                            </Col>
                            <Col xs={6}>
                                <ButtonToolbar>
                                    <Button variant="outline-info" size="lg" onClick={this.onClickPath.bind(this,2)}>
                                        Check Possible Routes for Your Delivery
                                </Button>
                                </ButtonToolbar>
                            </Col>
                        </Row>
                        {this.state.showDeliveryCost && <DeliveryCost />}
                        {this.state.showPossibleRoutes && <PossibleRoutes/>}
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}

export default Lobby;

