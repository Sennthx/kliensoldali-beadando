import { useState } from 'react';

const SeatSelector = ({ seatMatrix, ticketCount }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelect = (seat) => {
    const key = `${seat.row}-${seat.seat}`;
    const isSelected = selectedSeats.some(s => s.row === seat.row && s.seat === seat.seat);

    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => !(s.row === seat.row && s.seat === seat.seat)));
    } else if (selectedSeats.length < ticketCount) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const rowIndexToLetter = (index) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabet[index] || String.fromCharCode(65 + index); // Handle row beyond 'Z'
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Seat Selection</h3>
      <div className="space-y-1">
        {seatMatrix.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 justify-center">
            {row.map((seat, seatIndex) => {
              const isSelected = selectedSeats.some(s => s.row === seat.row && s.seat === seat.seat);
              return (
                <button
                  key={seatIndex}
                  onClick={() => handleSeatSelect(seat)}
                  className={`btn btn-xs ${!seat.available ? 'bg-gray-400 cursor-not-allowed' : isSelected ? 'bg-green-500 text-white' : 'bg-gray-200'} 
                            rounded-none
                            text-accent text-lg font-semibold
                            `}
                  disabled={!seat.available}
                  style={{ width: '48px', height: '48px' }}
                >
                  {rowIndexToLetter(seat.row)}{seat.seat}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h4>Selected Seats:</h4>
        <ul>
          {selectedSeats.map((s, i) => (
            <li key={i}>{`Row ${rowIndexToLetter(s.row)}, Seat ${s.seat}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SeatSelector;
