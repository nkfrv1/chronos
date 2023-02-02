import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Tab, Tabs, Button, Typography, Box } from "@mui/material";
import Calendar from "../calendar/Calendar"

export default function Home() {
    const [calendars] = useState(useLoaderData());

    const [tab, setTab] = useState({ calendar: calendars[0].id, index: 0 });

    const handleSwitch = (event, newValue) => {
        setTab({
            calendar: Number(event.target.attributes.calendarid.value),
            index: newValue
        });
    };
    
    return (
        <>
            <Box
                sx={{
                    width: '95%',
                    my: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}
            >
                <Tabs
                    value={tab.index}
                    onChange={handleSwitch}
                    variant={calendars.length > 3 ? 'scrollable' : 'fullWidth'}
                    scrollButtons="auto"
                    sx={{ width: '60%', my: 2 }}
                >
                    {calendars.map(calendar => (
                        <Tab
                            key={calendar.id}
                            label={calendar.name}
                            disabled={calendar.hidden ? true : false}
                            calendarid={calendar.id}
                        />
                    ))}
                </Tabs>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Button variant="contained" color="mono" sx={{ mx: 1 }}>
                        <Typography noWrap>New Event</Typography>
                    </Button>
                    <Button variant="contained" color="mono" sx={{ mx: 1 }}>
                        <Typography noWrap>New Calendar</Typography>
                    </Button>
                </Box>
            </Box>
            <Calendar id={tab.calendar} />
        </>
    );
}