const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ sum }) => <strong>Number of exercises {sum}</strong>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  // console.log("parts", parts);
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part}></Part>
      ))}
    </>
  );
};

const Course = ({ course }) => {
  // console.log("Course", course.parts);

  // const sum =
  //   course.parts[0].exercises +
  //   course.parts[1].exercises +
  //   course.parts[2].exercises;

  const sum = course.parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0
  );

  return (
    <>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total sum={sum}></Total>
    </>
  );
};

export default Course;
