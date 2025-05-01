const DaySelector = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  return (
    <div className="flex justify-center my-6">
      <div className="inline-flex" role="group">
        {days.map((day, index) => {
          const isFirst = index === 0;
          const isLast = index === days.length - 1;
          
          return (
            <button
              key={day}
              className={`
                btn 
                ${isFirst ? 'rounded-l-xl rounded-r-sm' : ''}
                ${isLast ? 'rounded-r-xl rounded-l-sm' : ''}
                ${!isFirst && !isLast ? 'rounded-sm' : ''}
                bg-primary
                hover:bg-primary/70
                text-primary-content
                text-xl
                mx-1
                p-4
                py-6

              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DaySelector;