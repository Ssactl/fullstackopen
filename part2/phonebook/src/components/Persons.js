import Person from "./Person";

const Persons = ({ persons, search, handleDeleteClick }) => {
  console.log(persons);
  return (
    <>
      {persons
        .filter(
          (person) =>
            person.name.toUpperCase().slice(0, search.length) ===
            search.toUpperCase()
        )
        .map((person) => (
          <>
            <Person key={person.id} name={person.name} number={person.number} />
            <button id={person.id} onClick={handleDeleteClick}>
              delete
            </button>
            <br />
          </>
        ))}
    </>
  );
};

export default Persons;
