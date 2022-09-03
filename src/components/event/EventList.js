import React, { useEffect } from "react"
import { getEvents } from "./EventManager.js"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
              <button className="btn btn-2 btn-sep icon-create" onClick={() => {history.push({ pathname: "/events/new" })}}>Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="game__title">{event.title} by {event.maker}</div>
                        <div className="game__players">{event.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {event.skill_level}</div>
                    </section>
                })
            }
        </article>
    )
}