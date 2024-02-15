
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Questions from "../Questions/Questions";
import { quizData } from "../QuizData/QuizData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import logo from "../../Assets/Images/logo.png";
import modalImg from "../../Assets/Images/modal-img.png";
import { Modal, Button } from "react-bootstrap";

const Quiz = ({ setScore, setWrongScore, setCorrectScore, setSkipped }) => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(quizData.length).fill(""));
  const [selectedOption, setSelectedOption] = useState("");
  const [durationInSeconds, setDurationInSeconds] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const quitModalRef = useRef(null);

  useEffect(() => {
    const handleUnload = (event) => {
      if (!showModal) {
        event.preventDefault();
        event.returnValue = ""; 
        // openQuitModal(); 
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [showModal]);

  useEffect(() => {
    // timer
    const startTimer = () => {
      const id = setInterval(() => {
        setDurationInSeconds((prevDuration) => prevDuration + 1);
      }, 1000);
      return id;
    };
  
    const interval = startTimer();
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (selectedOption !== "" && currentQuestion <= quizData.length - 1) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedOption; 
      setAnswers(newAnswers); 
    }
  }, [selectedOption, currentQuestion, answers, setAnswers]);

  const openQuitModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const formatTime = (time) => {
    return time < 10 ? "0" + time : time;
  };

  //next button and submit button
  const handleSubmit = () => {
    setCurrentQuestion(currentQuestion + 1); 
    setSelectedOption(answers[currentQuestion + 1]);

    if(selectedOption === ""){
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedOption; 
      setAnswers(newAnswers); 
    }

    if (currentQuestion === quizData.length - 1) {
      const userScore = calculateScore(answers);
      setScore(userScore.score);
      setWrongScore(userScore.wrongScore);
      setCorrectScore(userScore.correctScore);
      setSkipped(userScore.skipped);
      navigate("/result");
    }
  };

  // previuos button
  const previousSubmit = () => {
    setCurrentQuestion(currentQuestion - 1);
    setSelectedOption(answers[currentQuestion - 1]);
  };

  //calculate function
  const calculateScore = (newAnswers) => {
    let wrongScore = 0;
    let correctScore = 0;
    let skipped = 0;
    for (let i = 0; i < newAnswers.length; i++) {
      if (newAnswers[i] === quizData[i].correctAnswer) {
        correctScore++;
      } else if (newAnswers[i] !== quizData[i].correctAnswer) {
        if (newAnswers[i] !== "") {
          wrongScore++;
        } else {
          skipped++;
        }
      }
    }
    let score = correctScore - wrongScore;
    if (score < 0) {
      score = 0;
    }
    return {
      score: score,
      wrongScore: wrongScore,
      correctScore: correctScore,
      skipped: skipped,
    };
  };

  // quit button
  const quitModal = () => {
    setScore(0);
    setWrongScore(0);
    setCorrectScore(0);
    setSkipped(0);
    navigate("/");
  };

  return (
    <div>
      <div className="quiz-app">
        <div className="quiz-header">
          <div className="quiz logo">
            <img className="img-fluid" src={logo} alt="APP LOGO" />
          </div>
          <div className="quit-button-in">
            <button
              type="button"
              className="quit-button"
              onClick={openQuitModal}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <Modal
              id="quitModal"
              show={showModal}
              onHide={handleCloseModal}
              ref={quitModalRef}
            >
              <Modal.Header closeButton>
                <div className="modal-img">
                  <img
                    className="img-fluid"
                    src={modalImg}
                    alt="MODAL LOGO"
                  />
                </div>
              </Modal.Header>
              <Modal.Body>
                <Modal.Title>
                  Are you sure you want to quit this quiz?
                </Modal.Title>
                <p>( your marked data would be lost in this case )</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  No
                </Button>
                <Button variant="primary" onClick={quitModal}>
                  Yes, Quit
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="time">
            <div id="timer">
              {formatTime(Math.floor(durationInSeconds / 3600))}:
              {formatTime(Math.floor((durationInSeconds % 3600) / 60))}:
              {formatTime(durationInSeconds % 60)}
            </div>
          </div>
        </div>
        <div className="quiz-container w-100">
          {quizData[currentQuestion] && (
            <Questions
              id={quizData[currentQuestion].id}
              question={quizData[currentQuestion].question}
              options={quizData[currentQuestion].options}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          )}
        </div>
        <div className="quiz-footer">
          <div className="d-flex align-items-center justify-content-end">
            {currentQuestion !== 0 && (
              <button className="footer-button" onClick={previousSubmit}>
                Previous
              </button>
            )}
            {currentQuestion !== quizData.length - 1 ? (
              <button
                className="footer-button ms-2"
                disabled={selectedOption !== ""}
                onClick={handleSubmit}
              >
                Skip
              </button>
            ) : (
              <button
                className="footer-button ms-2"
                disabled={selectedOption !== ""}
                onClick={handleSubmit}
              >
                Skip & Submit
              </button>
            )}
            {currentQuestion < quizData.length - 1 ? (
              <button
                className="footer-button ms-2"
                disabled={selectedOption === ""}
                onClick={handleSubmit}
              >
                Next
              </button>
            ) : (
              <button
                className="footer-button ms-2"
                disabled={selectedOption === ""}
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;