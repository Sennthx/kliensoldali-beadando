const HomePage = () => {
    return (
      <div className="space-y-8 max-w-6xl mx-auto">
        <section className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">Tikera 🎬</h1>
          <p className="text-lg text-gray-600">
            A simple movie booking system built with React and DaisyUI.
          </p>
        </section>
  
        <section className="bg-base-200 p-6 rounded-box shadow">
          <h2 className="text-2xl font-semibold mb-4">Project Description</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Users can browse movies by day, and see screening times on each movie card.</li>
            <li>After selecting a screening, the booking interface with the seating layout appears.</li>
            <li>Users can choose how many regular, student, or senior tickets to book.</li>
            <li>After entering the number of tickets, users can select their seats and submit the booking.</li>
          </ul>
        </section>
  
        <section className="bg-base-100 border border-base-300 p-6 rounded-box">
          <h2 className="text-xl font-semibold mb-2">Technology Stack</h2>
          <div className="flex flex-wrap gap-2">
            <span className="badge badge-primary badge-lg">Vite</span>
            <span className="badge badge-secondary badge-lg">React</span>
            <span className="badge badge-accent badge-lg">TailwindCSS</span>
            <span className="badge badge-info badge-lg">DaisyUI</span>
          </div>
        </section>
      </div>
    );
  };
  
  export default HomePage;
  