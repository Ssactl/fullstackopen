import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fullfilled");
      setPersons(response.data);
    });
  }, []);

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setSearch] = useState("");

  function handleNameChange(event) {
    setNewName(event.target.value);
  }

  function handleNumberChange(event) {
    setNewNumber(event.target.value);
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (persons.filter((p) => p.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons, { name: newName }]);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearch} handleChange={handleSearchChange} />
      <h3>add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        name={newName}
        handleNameChange={handleNameChange}
        number={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} search={newSearch} />
    </div>
  );
};

export default App;
