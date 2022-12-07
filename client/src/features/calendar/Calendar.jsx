import { Scheduler } from "@aldabil/react-scheduler";
import styles from "./Calendar.module.css";

const weekOptions = {
    weekDays: [1, 2, 3, 4, 5, 6, 7],
    weekStartOn: 0,
    startHour: 0,
    endHour: 23,
    step: 60,
    navigation: true
};

export default function Calendar() {
    return (
        <div className={styles.Calendar} >
            <Scheduler
                events={[]}
                week={weekOptions}
            />
        </div>
    );
}