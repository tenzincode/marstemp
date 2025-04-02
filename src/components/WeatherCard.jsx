import React from 'react';
import moment from 'moment';

const WeatherCard = ({ marsdata, isLoading }) => {
  return (
    <section className="articles">
      <div className="row columns">
        {!isLoading ? (
          marsdata.map(marstemp => {
            const { sol, date, temp } = marstemp;
            return (
              <div 
                className="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd" 
                key={sol}
              >
                <div className="card article">
                  <div className="card-content">
                    <div className="sol">
                      <h3 className="title is-5 has-text-white">Sol: {sol}</h3>
                      <p>Earth date: {date ? moment(date).format('LLLL') : 'N/A'}</p>
                      <p>Temperature: {temp ? `${temp} °Fahrenheit` : 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
};

export default WeatherCard;
