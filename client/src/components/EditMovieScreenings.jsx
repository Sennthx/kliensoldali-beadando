import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { X, Check } from "lucide-react";

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

const EditMovieScreenings = ({ screenings, token, onDeleteSuccess }) => {
    const [screeningsData, setScreeningsData] = useState({});
    const initializedScreenings = useRef(false);

    useEffect(() => {
        if (screenings && !initializedScreenings.current) {
            const initData = {};
            screenings.forEach((s) => {
                initData[s.id] = {
                    start_time: s.start_time || "",
                    week_day: s.week_day || "",
                };
            });
            setScreeningsData(initData);
            initializedScreenings.current = true;
        }
    }, [screenings]);

    const handleScreeningChange = (id, field, value) => {
        setScreeningsData((prev) => ({
            ...prev,
            [id]: { ...prev[id], [field]: value },
        }));
    };

    const handleScreeningSave = async (id) => {
        const screening = screeningsData[id];
        if (!screening) return;

        try {
            const res = await fetch(
                `http://localhost:8000/api/screenings/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        start_time: screening.start_time,
                        week_day: screening.week_day,
                    }),
                }
            );

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || "Failed to update screening");
            }

            toast.success(`Screening ${id} updated`);
        } catch (err) {
            toast.error(`Error updating screening ${id}: ${err.message}`);
        }
    };

    const handleScreeningDelete = async (id) => {
        try {
            const res = await fetch(
                `http://localhost:8000/api/screenings/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) {
                throw new Error("Failed to delete screening");
            }

            toast.success(`Screening ${id} deleted`);

            setScreeningsData((prev) => {
                const copy = { ...prev };
                delete copy[id];
                return copy;
            });

            if (onDeleteSuccess) onDeleteSuccess(id);
        } catch (err) {
            toast.error(`Error deleting screening ${id}: ${err.message}`);
        }
    };

    const screeningsByDay = screenings.reduce((acc, screening) => {
        const dayNum = screening.week_day;
        const dayName = days[dayNum - 1] || "Unknown";
        if (!acc[dayName]) acc[dayName] = [];
        acc[dayName].push(screening);
        return acc;
    }, {});

    return (
        <div>
            <hr />
            <h2 className="text-2xl font-bold text-center my-6">
                Edit Screenings
            </h2>
            <div className="space-y-6 mt-6">
                {days.map((day) =>
                    screeningsByDay[day] ? (
                        <div key={day}>
                            <h3 className="text-lg font-semibold mb-2">
                                {day}
                            </h3>
                            <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-2">
                                {screeningsByDay[day].map((screening) => {
                                    const screeningInfo =
                                        screeningsData[screening.id] || {};
                                    return (
                                        <div
                                            key={screening.id}
                                            className="flex items-center space-x-2 mb-2"
                                        >
                                            <input
                                                type="time"
                                                value={
                                                    screeningInfo.start_time ||
                                                    ""
                                                }
                                                onChange={(e) =>
                                                    handleScreeningChange(
                                                        screening.id,
                                                        "start_time",
                                                        e.target.value
                                                    )
                                                }
                                                className="input input-bordered input-sm w-24"
                                                aria-label={`Screening time for ${screening.id}`}
                                                placeholder="HH:mm"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleScreeningSave(
                                                        screening.id
                                                    )
                                                }
                                                className="btn btn-sm btn-success px-2"
                                                aria-label="Save screening"
                                            >
                                                <Check size={16} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleScreeningDelete(
                                                        screening.id
                                                    )
                                                }
                                                className="btn btn-sm btn-error px-2"
                                                aria-label="Delete screening"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                            <hr />
                        </div>
                    ) : null
                )}
            </div>
        </div>
    );
};

export default EditMovieScreenings;
