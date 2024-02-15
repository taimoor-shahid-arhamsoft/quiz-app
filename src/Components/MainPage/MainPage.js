import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../Assets/Images/logo.png";

const MainPage = () => {
  return (
    <div className="main-page">
      <Container>
        <Row>
          <Col md={12}>
            <div className="quiz-app">
              <div className="quiz-container">
                <div className="quiz logo">
                  <img className="img-fluid" src={logo} alt="APP LOGO" />
                </div>
                <Link to="/quiz-page" className="text-button">
                  START
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainPage;
