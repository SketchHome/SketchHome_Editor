import React, { useState } from 'react';

//bootstrap
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//component
import SearchBar from '../SearchBar';
import ListComponent from '../ListComponent'

//source (image)
import wood1 from '../../resource/image/wood1.png';
import wood2 from '../../resource/image/wood2.png';
import wood3 from '../../resource/image/wood3.png';

//인테리어 tab - 가구 선택 카테고리
function Selectitem() {
    return(
        <Container className="List">
            <Row style={{margin: "0px -5px -20px -25px"}}>
                <SearchBar/>
            </Row>
            {/*Basic style*/}
            <Row>
                <Col style={{marginLeft: "5px"}}>
                    <ListComponent itemName="나무 바닥 1" image={wood1} id="wood1" value="w1"/>
                </Col>
                <Col style={{marginLeft: "-30px"}}>
                    <ListComponent itemName="나무 바닥 2" image={wood3} id="wood3" value="w2"/>
                </Col>
            </Row>
        </Container>
    );
}

export default Selectitem;