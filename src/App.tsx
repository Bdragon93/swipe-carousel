import React from 'react';
import { hot } from 'react-hot-loader/root';
import Carousel from './components/Carousel';
import { MOCK_DATA } from './constants';
import styles from './App.scss';

const App: React.FC<{}> = () => {
  return (
    <div className={styles.container}>
      <h2>Scandiweb Carousel</h2>
      <Carousel slides={MOCK_DATA} />
    </div>
  );
};

export default hot(App);
