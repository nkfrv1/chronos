import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import MainCalendar from "../maincalendar/MainCalendar"
function Calendars() {
    const [calendars] = useState(useLoaderData());

    return (
        <>
            <h1>Calendars:</h1>
            <MainCalendar />
            {/* {calendars.map(calendar => (
                <div key={calendar.id}>
                    <p>Name: {calendar.name}</p>
                    <p>Description: {calendar.description}</p>
                    <p>Author: {calendar.author}</p>
                    <p>Main: {calendar.main.toString()}</p>
                </div>
            ))} */}
        </>
    );
}

export default Calendars;