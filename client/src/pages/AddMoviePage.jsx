const AddMoviePage = () => {
    return (
        <div className="flex items-start justify-center mt-8 bg-base-100 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-base-200 rounded-lg shadow-lg border border-secondary">
                <h2 className="text-2xl font-bold text-center">Add Movie</h2>
                <form className="space-y-4">
                    <label className="label mb-2" htmlFor="title">Title</label>
                    <input name="title" type="text" placeholder="Movie Title" className="input input-bordered w-full" />

                    <label className="label mb-2" htmlFor="description">Description</label>
                    <textarea name="description" placeholder="Movie Description" className="textarea textarea-bordered w-full" />

                    <label className="label mb-2" htmlFor="image_path">Image URL</label>
                    <input name="image_path" type="url" placeholder="https://..." className="input input-bordered w-full" />

                    <label className="label mb-2" htmlFor="duration">Duration (minutes)</label>
                    <input name="duration" type="number" className="input input-bordered w-full" />

                    <label className="label mb-2" htmlFor="genre">Genre</label>
                    <input name="genre" type="text" placeholder="Action, Comedy..." className="input input-bordered w-full" />

                    <label className="label mb-2" htmlFor="release_year">Release Year</label>
                    <input name="release_year" type="number" placeholder="2023" className="input input-bordered w-full" />

                    <button type="submit" className="btn btn-primary w-full">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddMoviePage;
