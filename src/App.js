import './App.css';
import {useState} from "react";

function App() {
    const [people, setPeople] = useState([{name: "Jan", surName: "Kowalski"}])
    const [hover, setHover] = useState({})
    const [isError, setError] = useState(false)
    const [inputNameValue, setInputNameValue] = useState('')
    const [inputSurNameValue, setInputSurNameValue] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        if(!inputNameValue || !inputSurNameValue) {
            setError(true)
            return
        }
        setPeople([...people, {name: inputNameValue, surName: inputSurNameValue}])
        setInputNameValue('')
        setInputSurNameValue('')
        setError(false)

    }
    const handleDeletePerson = (name, surName) => {
        setPeople(people.filter(person=> person.name !== name && person.surName !== surName))
    }

    const onMouseEnterHandler = (name, surName) => {
        setHover(people.find(person => person.name === name && person.surName === surName))
    }
    const onMouseLeaveHandler = () => {
        setHover({})
    }
console.log('hover', hover)
  return (
    <div className="container">
        <div className="a" >A</div>
        <div className="b" >B</div>
        <div className="c" >C
            <div className="e" >E</div>
        </div>
        <div className="f">
            <div className="row">Pracownicy</div>
            <ul className="peopleList">
                {people.map(({name, surName, id}) => {
                    const isHover = name === hover.name && surName === hover.surName
                    return (
                        <li className={`name row ${isHover && 'hovered'}`}>
                            {`${name} ${surName}`}
                            <button onMouseEnter={() => onMouseEnterHandler(name,surName)}
                                    onMouseLeave={() => onMouseLeaveHandler(name,surName)}
                                    onClick={() => handleDeletePerson(name,surName)}>X</button>
                        </li>
                    )
                })}
            </ul>
            <form className="form"  onSubmit={handleSubmit}>
                <label>
                    Imię:
                    <input className="input" type="text" value={inputNameValue} onChange={(ev) => setInputNameValue(ev.target.value)} />
                </label>
                <label>
                    Nazwisko:
                    <input className="input" type="text" value={inputSurNameValue} onChange={(ev) => setInputSurNameValue(ev.target.value)} />
                </label>
                {isError && <p>wypelnij poprawnie formularz</p>}
                <input disabled={people.length > 5} type="submit" value="Wyślij" />
            </form>
        </div>
        <div className="d" >D</div>
    </div>
  );
}

export default App;
