import { useSelector } from "react-redux";
import Calendar from "../calendar/Calendar"
import ReactMuiCalendar from "../calendar/ReactMuiCalendar";

export default function Home() {
    const { isAuth, user } = useSelector(state => state.auth);
    
    return (
        <>
            {isAuth && <h3 style={{ textAlign: 'center' }}>Current user: {user.username}</h3>}
            <Calendar />
        </>
    );
}