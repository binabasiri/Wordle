import React from 'react';

function Row({ guesses }) {
  return (
    <div className="table">
      {guesses.map((row) => {
        return (
          <div className="row">
            {row.map((letter) => {
              return (
                <div className={`block ${letter?.class}`}>
                  {letter?.value ?? ''}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Row;
