import { useState, useEffect } from "react"
import Calendars from "../calendars/Calendars"
import Header from "../header/Header"

export default function Dashboard() {
    return (
        <div className="dash-wrapper">
            <div className="dash-container">
                <Header />
                <Calendars />
            </div>
        </div>
    )
}