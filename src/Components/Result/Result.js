import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Table } from "react-bootstrap";
import DoughnutChart from "./DoughnutChart";
import { usePDF } from "react-to-pdf";
import { quizData } from "../QuizData/QuizData";

const Result = ({ score, wrongScore, correctScore, skipped }) => {

  const [grade, setGrade] = useState("");
  const { toPDF, targetRef } = usePDF({ filename: "QuizResult.pdf" });

  useEffect(() => {
    if (score <= 10 && score >= 9) {
      setGrade("A");
    } else if (score <= 8 && score >= 7) {
      setGrade("B");
    } else if (score <= 6 && score >= 5) {
      setGrade("C");
    } else if (score < 5) {
      setGrade("F");
    }
  }, [score]);

  const chartData = {
    labels: ["Wrong", "Correct", "Skipped"],
    values: [wrongScore, correctScore, skipped],
  };

  return (
    <div className="result-page py-3">
      <div className="result-head">
        <div className="result-buttons d-flex align-items-center justify-content-end">
          <button className="footer-button" onClick={() => toPDF()}>
            Download PDF
          </button>
          <Link className="footer-button ms-2" to="/">
            Play Again?
          </Link>
        </div>
      </div>
      <Row className="pt-4" ref={targetRef}>
        <Col md={12} className="pb-4">
          <div className="text-center">
            <h1>Quiz Result</h1>
          </div>
        </Col>
        <Col md={4}>
          <div className="results">
            <div className="inner-results">
              <h2>Your Result</h2>
              <div className="result-table">
                <Table>
                  <tbody>
                    <tr>
                      <td>Total Questions</td>
                      <td className="text-center">{quizData.length}</td>
                    </tr>
                    <tr>
                      <td>Correct Answers</td>
                      <td className="text-center">{correctScore}</td>
                    </tr>
                    <tr>
                      <td>Wrong Answers</td>
                      <td className="text-center">{wrongScore}</td>
                    </tr>
                    <tr>
                      <td>Skipped</td>
                      <td className="text-center">{skipped}</td>
                    </tr>
                    <tr>
                      <td>Total Score</td>
                      <td className="text-center">{score}</td>
                    </tr>
                    <tr>
                      <td>Grade</td>
                      <td className="text-center">{grade}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
            <div className="inner-results">
              <h2>Grade Criteria</h2>
              <div className="result-table">
                <Table>
                  <tbody>
                    <tr>
                      <td>90% and Above</td>
                      <td className="text-center">A</td>
                    </tr>
                    <tr>
                      <td>70% - 89%</td>
                      <td className="text-center">B</td>
                    </tr>
                    <tr>
                      <td>50% - 69%</td>
                      <td className="text-center">C</td>
                    </tr>
                    <tr>
                      <td>Below 50%</td>
                      <td className="text-center">F</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </Col>
        <Col md={8}>
          <div className="result-graph">
            <DoughnutChart data={chartData} />
            <div className="graph-data result-table text-center d-flex align-items-center justify-content-between">
              <div>
                <b>Wrong Answers:</b> {wrongScore}
              </div>
              <div>
                <b>Correct Answers:</b> {correctScore}
              </div>
              <div>
                <b>Skipped:</b> {skipped}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Result;
