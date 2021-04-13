import React from 'react';
import styles from './CarouselIndicator.scss';

export const CarouselIndicator: React.FC<{
  type: string;
  slides: React.ReactElement<any>[];
  selectedIndex: number;
  goToSlide: Function;
}> = ({ type, slides, selectedIndex, goToSlide }) => {
  const isThumbs = type === 'thumbs';
  const itemStyle = isThumbs ? styles.thumbItem : styles.pointItem;
  return (
    <div className={isThumbs ? styles.thumbs : styles.points}>
      <ul>
        {slides.map((item, index) => (
          <li
            key={item.key}
            onClick={() => goToSlide(index)}
            className={`${itemStyle} ${
              index === selectedIndex ? styles.selected : ''
            }`}
          >
            {isThumbs && item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarouselIndicator;
