import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getGameTypes } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    useEffect(() => {
        getGameTypes().then(setGameTypes)
    }, [])

    const changeGameState = (domEvent) => {
        const newGameState = {...currentGame}
        newGameState[domEvent.target.name] = domEvent.target.value
        setCurrentGame(newGameState)
    }

    const handleSubmit = e => {
        e.preventDefault()

        const game = {
            maker: currentGame.maker,
            title: currentGame.title,
            number_of_players: currentGame.numberOfPlayers,
            skill_level: currentGame.skillLevel,
            game_type: parseInt(currentGame.gameTypeId)
        }

        createGame(game)
            .then(() => history.push("/games"))
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of players: </label>
                    <input type="number" name="numberOfPlayers" required autofocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>    
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="number" min="1" max="5" name="skillLevel" required autofocus className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>    
            </fieldset>
            <fieldset>
                <div class="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select name="gameTypeId" required className="form-control"
                        value={currentGame.gameTypeId}
                        onChange={changeGameState}
                    >
                        {
                            gameTypes.map(gT => <option key={gT.id} value={gT.id}>{gT.label}</option>)
                        }
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={handleSubmit}
                className="btn btn-primary">Create</button>
        </form>
    )
}