import Person from "./Person";

const Persons = ({ persons, search }) => {
  console.log(persons);
  return (
    <ul>
      {persons
        .filter(
          (person) =>
            person.name.toUpperCase().slice(0, search.length) ===
            search.toUpperCase()
        )
        .map((person) => (
          <Person key={person.id} name={person.name} number={person.number} />
        ))}
    </ul>
  );
};

export default Persons;
