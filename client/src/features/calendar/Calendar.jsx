import { useState, useEffect, useCallback } from "react";
import { Scheduler, useScheduler } from "@aldabil/react-scheduler";
import CalendarService from "../../api/CalendarService";
import CategoryService from "../../api/CategoryService";
import EventService from "../../api/EventService";
import styles from "./Calendar.module.css";


const dayOptions = {
    startHour: 0,
    endHour: 23,
};

const weekOptions = {
    weekDays: [0, 1, 2, 3, 4, 5, 6],
    weekStartOn: 1,
    startHour: 0,
    endHour: 23,
};

const monthOptions = {
    weekDays: [0, 1, 2, 3, 4, 5, 6],
    weekStartOn: 1,
};

const useCustomEventFields = () => {
    const categoryOptions = [];
    CategoryService.getAll().then(data => {
        data.forEach(category => {
            categoryOptions.push({
                id: category.id,
                text: category.name,
                value: category.id
            });
        });
    });
    const categoryField = {
        name: 'category',
        type: 'select',
        options: categoryOptions,
        config: {
            label: 'Category',
            required: true,
            errMsg: 'Please choose a category for your new event'
        }
    };
    return [categoryField];
}

const handleConfirm = async (event, action) => {
    if (action === "edit") {
        await EventService.update(event.event_id, event.title, event.start, event.end, event.category);
    } else if (action === "create") {
        const res = await EventService.create(event.title, event.start, event.end, event.category, event.calendar);
        event.event_id = res.id;
    }
    return event;
}

const handleDelete = (deletedId) => {
    return EventService.delete(deletedId);
}

export default function Calendar({ id }) {
    const { setEvents } = useScheduler();
    const customEventFields = useCustomEventFields();

    const [isLoading, setIsLoading] = useState(false);

    const calendarEvents = useCallback((events) => {
        return events.map((event) => ({
            event_id: event.id,
            title: event.name,
            start: new Date(event.start),
            end: new Date(event.end),
            category: event.category,
            calendar: event.calendar
        }));
    });

    useEffect(() => {
        setIsLoading(true);
        CalendarService.getEvents(id).then(events => {
            setEvents(calendarEvents(events));
            setIsLoading(false);
        });
    }, [id]);

    return (
        <div className={styles.Calendar}>
            <Scheduler
                day={dayOptions}
                week={weekOptions}
                month={monthOptions}
                fields={customEventFields}
                loading={isLoading}
                onConfirm={(event, action) => handleConfirm({ ...event, calendar: id}, action)}
                onDelete={handleDelete}
            />
        </div>
    );
}