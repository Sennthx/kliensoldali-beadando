import { useDispatch, useSelector } from "react-redux";
import { setSelectedDay } from "../store/uiSlice";

const DaySelector = () => {
    const dispatch = useDispatch();

    const selectedDay = useSelector((state) => state.ui.selectedDay);
    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    return (
        <div className="my-6">
            <div className="flex justify-center">
                <div className="inline-flex overflow-x-auto whitespace-nowrap">
                    {days.map((day, index) => {
                        const isFirst = index === 0;
                        const isLast = index === days.length - 1;
                        const isSelected = day === selectedDay;

                        return (
                            <button
                                key={day}
                                onClick={() => dispatch(setSelectedDay(day))}
                                className={`
                  btn
                  ${isFirst ? "rounded-l-xl rounded-r-sm" : ""}
                  ${isLast ? "rounded-r-xl rounded-l-sm" : ""}
                  ${!isFirst && !isLast ? "rounded-sm" : ""}
                  ${isSelected ? "bg-secondary text-secondary-content border-2 border-secondary" : "bg-primary text-primary-content hover:bg-primary/70"}
                  text-xl mx-1 p-4 py-6
                `}
                            >
                                {day}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DaySelector;
