import React from 'react';
import { hot } from 'react-hot-loader/root';
import Carousel from './components/Carousel';
import { MOCK_DATA } from './constants';
import { Slide } from './types';
import styles from './App.scss';

const App: React.FC<{}> = () => {
  return (
    <div className={styles.container}>
      <h2>Scandiweb Carousel</h2>
      <Carousel>
        {MOCK_DATA.map(({ id, src }: Slide) => (
          <img key={id} src={src} alt={src} />
          // For simple html content
          // <div key={id}>{src}</div>
        ))}
      </Carousel>
    </div>
  );
};

export default hot(App);
