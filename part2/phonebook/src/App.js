import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import personService from "./services/persons";

const App = () => {
  useEffect(() => {
    console.log("effect");
    personService.getAll().then((response) => {
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

    if (persons.filter((p) => p.name === newName) === []) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      //add new person details to the phonebook by using HTTP POST request
      personService.create(newPerson).then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      });
    }
  }

  function deletePerson(event) {
    console.log(event.target.id);
    const name = persons.find(({ id }) => {
      return id == event.target.id;
    }).name;
    if (window.confirm(`Delete ${name} ?`)) {
      personService.deletePerson(event.target.id);
      personService.getAll().then((response) => setPersons(response.data));
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
      <Persons
        persons={persons}
        search={newSearch}
        handleDeleteClick={deletePerson}
      />
    </div>
  );
};

export default App;
