import { useEffect, useState } from "react";
import "./App.css";
import personService from "./services/persons";
import Notification from "./components/Notification";

function App() {
  // persons state --array objects--
  const [persons, setPersons] = useState([]);

  // use effect bring json server data through promise
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  // new Name state and phone
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  // state for searching
  const [showSearch, setShowSearch] = useState("");
  // state for error messages
  const [errorMessage, setErrorMessage] = useState("");

  //handlePersonChange
  function handlePersonChange(event) {
    setNewName(event.target.value);
  }

  // handlePhoneChange
  function handlePhoneChange(event) {
    setNewPhone(event.target.value);
  }

  // handleDeleteClick function
  function handleDeleteClick(id) {
    if (window.confirm("Do you really want to delete this person?")) {
      personService
        .deletePerson(id)
        .then(() => {
          // Returns the elements of an array that meet the condition specified in a callback function.
          setPersons(persons.filter((person) => person.id !== id));

          // error message for deletion 11111111111111111111111111111111111111111111111111111111111111111111111
          const deletedName = persons.filter(
            (newDeletedPerson) => newDeletedPerson.id == id
          );
          setErrorMessage(`Deleted ${deletedName[0].name} from phonebook!`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.error(error);
          console.log(error);
        });
    } else {
      return;
    }
  }

  //addName function
  function addName(event) {
    event.preventDefault();

    // if fields are empty show message
    if (!newName || !newPhone) {
      alert("Please fill the inputs before submitting!");
      return;
    }

    // create a sameName person in the phonebook for comparison
    const sameNamePerson = persons.find((element) => {
      return element.name.toLowerCase() === newName.toLowerCase();
    });

    // check if the number of sameName person is the same
    if (
      sameNamePerson &&
      sameNamePerson.number.toLowerCase() === newPhone.toLowerCase()
    ) {
      alert(`${sameNamePerson.name} already exists in the database!`);
      setNewName("");
      setNewPhone("");
    } else if (sameNamePerson && sameNamePerson.number !== newPhone) {
      // else change the number in state and database

      // create id and changed number person
      const changedId = sameNamePerson.id;
      const changedNumber = { ...sameNamePerson, number: newPhone };

      //through axios persons.jsx service we update the new number
      personService
        .update(changedId, changedNumber)
        .then((returnedNumber) => {
          setPersons(
            persons.map((newPerson) =>
              newPerson.id !== changedId ? newPerson : returnedNumber
            )
          );
          setNewName("");
          setNewPhone("");
        })
        .catch((error) => console.log(error));
    }

    // create new person
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newPhone,
    };
    // The some method will iterate through the elements of the persons array and will return true as soon as it finds an element that satisfies the given condition. If no such element is found, it will return false.
    if (persons.some((element) => element.name == personObject.name)) {
      // alert(`${personObject.name} is already in the phonebook!`);
      console.log("Editing contact...");
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        // error message 11111111111111111111111111111111111111111111111111111
        setErrorMessage(`Added ${personObject.name} to the phonebook`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);

        setNewName("");
        setNewPhone("");
      });
    }
  }

  function handleShowSearchChange(event) {
    event.preventDefault();
    setShowSearch(event.target.value);
  }
  // condition for search show
  const whatToShow =
    showSearch !== ""
      ? // SHOW only the results that include the characters from showSearch state in persons state
        persons.filter((element) =>
          element.name.toLowerCase().includes(showSearch.toLowerCase())
        )
      : persons;

  return (
    <div className="App">
      <h2 className="main_title">Phonebook</h2>
      <hr />
      <Notification message={errorMessage} />
      {/* search input */}
      search name:{" "}
      <input value={showSearch} onChange={handleShowSearchChange} />
      <hr />
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <br />
        <div>
          <button type="sumbit">Add</button>
        </div>
      </form>
      <hr />
      <h2 className="main_numbers">Numbers:</h2>
      <ul>
        {whatToShow.map((element) => (
          <p key={element.id}>
            {element.id} {element.name} {element.number}{" "}
            {element.id ? (
              <button onClick={() => handleDeleteClick(element.id)}>
                Delete
              </button>
            ) : null}
          </p>
        ))}
      </ul>
    </div>
  );
}

export default App;
