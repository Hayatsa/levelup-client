import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createEvent, getEventTypes } from './EventManager.js'


export const EventForm = () => {
    const history = useHistory()
    const [eventTypes, setEventTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        eventTypeId: 0
    })

    useEffect(() => {
        // TODO: Get the event types, then set the state
    }, [])

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentEvent.title}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        maker: currentEvent.maker,
                        title: currentEvent.title,
                        numberOfPlayers: parseInt(currentEvent.numberOfPlayers),
                        skillLevel: parseInt(currentEvent.skillLevel),
                        eventTypeId: parseInt(currentEvent.eventTypeId)
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}