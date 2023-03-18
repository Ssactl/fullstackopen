import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import personService from "./services/persons";
import Notification from "./components/Notification";

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
  const [newMessage, setNewMessage] = useState(null);
  const [messageStatus, setMessageStauts] = useState("");

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

    if (persons.filter((p) => p.name === newName) !== []) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        //update phone number
        const person = persons.find((p) => p.name === newName);
        const changePerson = { ...person, number: newNumber };
        personService
          .update(changePerson.id, changePerson)
          .then((response) => {
            setPersons(
              persons.map((p) => (p.id === changePerson.id ? response.data : p))
            );
            setMessageStauts("success");
            setNewMessage(`Changed ${changePerson.name}'s number`);
          })
          .catch((error) => {
            console.log(error);
            setMessageStauts("error");
            setNewMessage(
              `Information of ${changePerson.name} was already removed from server`
            );
            setTimeout(() => {
              setMessageStauts("");
              setNewMessage(null);
            }, 5000);
            setPersons(persons.filter((p) => p.id !== changePerson.id));
          });
      }
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
        setMessageStauts("success");
        setNewMessage(`Added ${newName}`);
        setTimeout(() => {
          setMessageStauts("");
          setNewMessage(null);
        }, 5000);
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
      setMessageStauts("success");
      setNewMessage(`Deleted ${name}`);
      setTimeout(() => {
        setMessageStauts("");
        setNewMessage(null);
      }, 5000);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newMessage} status={messageStatus} />
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
