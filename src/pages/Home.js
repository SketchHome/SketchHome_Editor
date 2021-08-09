//수정중 (21.07.28)
import React from 'react';

//BootStrap 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../components/index.css'

//Image soruce
import houseImage from '../resource/image/house.jpg';
import startImage from '../resource/image/start.jpg';
import sample1 from '../resource/image/inteior1.jpg'

//Component
import DetailBtn from '../components/DetailBtn'
import ImageTitle from '../components/ImageTitle'
import Navbar from '../components/Navbar'

function Home() {
  return (
    <div className="colorDiv">
       <Navbar/>
      <Container fluid>
          <br/><br/>
          <div style={{marginLeft: "-5vh", marginTop:"-20px"}}>
          <Row>
            {/*detail btn*/}
            <DetailBtn detail="홈 에디터 설명서"/>
          </Row>
          <Row>
            <Col style={{paddingLeft: "90px"}}>
            <a href="editorSelect"><ImageTitle Images={houseImage} type="btnImage" detail="새 공간 꾸미기"/></a>
            </Col>
            <Col>
            <ImageTitle Images={startImage} type="btnImage" detail="꾸민 공간 보기"></ImageTitle>
            </Col>
            <Col style={{paddingRight: "90px"}}>
            <ImageTitle Images={houseImage} type="btnImage" detail="렌더링 이미지 보기"></ImageTitle>
            </Col>
          </Row>

          <br/><br/>
          
        </div>
        </Container>
      </div>
  );
}

export default Home;
