import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticsLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

// a proper place to define a component
const Statistics = ({ good, bad, neutral }) => {
  const all = good + neutral + bad;
  const average = (good * 1 + bad * -1) / all;
  const positive = (good / all) * 100 + "%";

  if (!good && !bad && !neutral) {
    return <p>No feedback given</p>;
  }
  return (
    <>
      <StatisticsLine text="good" value={good}></StatisticsLine>
      <StatisticsLine text="neutral" value={neutral}></StatisticsLine>
      <StatisticsLine text="bad" value={bad}></StatisticsLine>
      <StatisticsLine text="all" value={all}></StatisticsLine>
      <StatisticsLine text="average" value={average}></StatisticsLine>
      <StatisticsLine text="positive" value={positive}></StatisticsLine>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  function handleClickGood() {
    setGood(good + 1);
  }

  function handleClickNeutral() {
    setNeutral(neutral + 1);
  }

  function handleClickBad() {
    setBad(bad + 1);
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleClickGood} text="good" />
      <Button handleClick={handleClickNeutral} text="neutral" />
      <Button handleClick={handleClickBad} text="bad" />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  );
};

export default App;
