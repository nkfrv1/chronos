import { useState } from "react";
import Scheduler from "react-mui-scheduler";

function ReactMuiCalendar() {
    const [state] = useState({
        options: {
            transitionMode: "zoom", // or fade
            startWeekOn: "mon",     // or sun
            defaultMode: "week",    // or week | day | timeline
            minWidth: 540,
            maxWidth: 800,
            minHeight: 540,
            maxHeight: 600
        },
        alertProps: {
            open: false,
            color: "info",          // info | success | warning | error
            severity: "info",       // info | success | warning | error
            message: "🚀 Let's start with awesome react-mui-scheduler 🔥 🔥 🔥",
            showActionButton: true,
            showNotification: true,
            delay: 1500
        },
        toolbarProps: {
            showSearchBar: true,
            showSwitchModeButtons: true,
            showDatePicker: true
        }
    });

    return (
        <Scheduler
            locale="en"
            events={[]}
            legacyStyle={false}
            options={state?.options}
            alertProps={state?.alertProps}
            toolbarProps={state?.toolbarProps}
        // onEventsChange={handleEventsChange}
        // onCellClick={handleCellClick}
        // onTaskClick={handleEventClick}
        // onAlertCloseButtonClicked={handleAlertCloseButtonClicked}
        />
    );
}

export default ReactMuiCalendar;