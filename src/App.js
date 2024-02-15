import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./Components/MainPage/MainPage";
import Quiz from "./Components/Quiz/Quiz";
import Result from "./Components/Result/Result";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

const App = () => {
  const [score, setScore] = useState(0);
  const [wrongScore, setWrongScore] = useState(0);
  const [correctScore, setCorrectScore] = useState(0);
  const [skipped, setSkipped] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route
          path="/quiz-page"
          element={
            <Quiz
              setScore={setScore}
              setWrongScore={setWrongScore}
              setCorrectScore={setCorrectScore}
              setSkipped={setSkipped}
            />
          }
        ></Route>
        <Route
          path="/result"
          element={
            <Result
              score={score}
              wrongScore={wrongScore}
              correctScore={correctScore}
              skipped={skipped}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
