import React from 'react';
import { Slide } from '../types';
import styles from './CarouselIndicator.scss';

export const CarouselIndicator: React.FC<{
  type: string;
  slides: Slide[];
  selectedIndex: number;
  goToSlide: Function;
}> = ({ type, slides, selectedIndex, goToSlide }) => {
  const isThumbs = type === 'thumbs';
  const itemStyle = isThumbs ? styles.thumbItem : styles.pointItem;
  return (
    <div className={isThumbs ? styles.thumbs : styles.points}>
      <ul>
        {slides.map((slide, index) => (
          <li
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`${itemStyle} ${
              index === selectedIndex ? styles.selected : ''
            }`}
          >
            {isThumbs && <img src={slide.src} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarouselIndicator;
