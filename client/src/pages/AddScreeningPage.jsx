const AddScreeningPage = () => {
    return (
        <div className="flex items-start justify-center mt-8 bg-base-100 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-base-200 rounded-lg shadow-lg border border-secondary">
                <h2 className="text-2xl font-bold text-center">Add Screening</h2>
                <form className="space-y-4">
                    <label className="label mb-2" htmlFor="movie_id">Movie ID</label>
                    <input name="movie_id" type="text" placeholder="e.g. 12" className="input input-bordered w-full" />

                    <label className="label mb-2" htmlFor="room_id">Room ID</label>
                    <input name="room_id" type="text" placeholder="e.g. 3" className="input input-bordered w-full" />

                    <label className="label mb-2" htmlFor="date">Date</label>
                    <input name="date" type="date" className="input input-bordered w-full" />

                    <label className="label mb-2" htmlFor="start_time">Start Time</label>
                    <input name="start_time" type="time" className="input input-bordered w-full" />

                    <button type="submit" className="btn btn-primary w-full">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddScreeningPage;
