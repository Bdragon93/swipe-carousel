import React, { useState, useEffect, useRef } from 'react';
import { THRESHOLD, TRANSITION_DURATION } from '../constants';
import CarouselIndicator from './CarouselIndicator';
import { Slide } from '../types';
import styles from './Carousel.scss';

export const Carousel: React.FC<{ slides: Slide[] }> = ({ slides }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [disableDrag, setDisableDrag] = useState(false);
  useEffect(() => {
    window.addEventListener('mouseup', onDragEndMouse);
    window.addEventListener('touchend', onDragEndTouch);

    return () => {
      window.removeEventListener('mouseup', onDragEndMouse);
      window.removeEventListener('touchend', onDragEndTouch);
    };
  }, [selectedIndex]);
  const listElement = useRef<any>(null);

  const moveSpace = useRef<number>(0);
  const dragged = useRef<boolean>(false);
  const dragStartX = useRef<number>(0);

  const perByIndex = (selectedIndex + 1) * 100;

  const delaySetHeadIndex = (index: number) => {
    listElement.current.style.transitionDuration = `${TRANSITION_DURATION}ms`;
    setDisableDrag(true);
    setTimeout(() => {
      listElement.current.style.transitionDuration = '0ms';
      setSelectedIndex(index);
      setDisableDrag(false);
    }, TRANSITION_DURATION);
  };

  const next = () => {
    if (disableDrag) return;
    if (selectedIndex === slides.length - 1) {
      listElement.current.style.transform = `translate3d(-${
        selectedIndex + 2
      }00%, 0, 0)`;
      delaySetHeadIndex(0);
    } else {
      listElement.current.style.transitionDuration = `${TRANSITION_DURATION}ms`;
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const prev = () => {
    if (disableDrag) return;
    if (selectedIndex === 0) {
      listElement.current.style.transform = 'translate3d(0, 0, 0)';
      delaySetHeadIndex(slides.length - 1);
    } else {
      listElement.current.style.transitionDuration = `${TRANSITION_DURATION}ms`;
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const onDragStartMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disableDrag) return;
    // handle right click
    if (e.button === 2) {
      return;
    }
    onDragStart(e.clientX);
    window.addEventListener('mousemove', onMouseMove);
  };

  const onDragStartTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if (disableDrag) return;
    const touch = e.targetTouches[0];
    onDragStart(touch.clientX);
    window.addEventListener('touchmove', onTouchMove);
  };

  const onDragStart = (clientX: number) => {
    dragged.current = true;
    dragStartX.current = clientX;
    requestAnimationFrame(updatePosition);
  };

  const onDragEndMouse = () => {
    window.removeEventListener('mousemove', onMouseMove);
    onDragEnd();
  };

  const onDragEndTouch = () => {
    window.removeEventListener('touchmove', onTouchMove);
    onDragEnd();
  };

  const onDragEnd = () => {
    if (dragged.current) {
      const mvSpace = moveSpace;

      if (
        mvSpace.current < 0 &&
        mvSpace.current < listElement.current.offsetWidth * THRESHOLD * -1
      ) {
        next();
      } else if (
        mvSpace.current > 0 &&
        mvSpace.current > listElement.current.offsetWidth * THRESHOLD
      ) {
        prev();
      } else {
        listElement.current.style.transitionDuration = `${TRANSITION_DURATION}ms`;
        listElement.current.style.transform = `translate3d(-${perByIndex}%, 0, 0)`;
      }

      dragged.current = false;
      dragStartX.current = 0;
      moveSpace.current = 0;
    }
  };

  const onMouseMove = (e: MouseEvent) => {
    if (dragged.current) {
      const mvSize = e.clientX - dragStartX.current;
      moveSpace.current = mvSize;
    }
  };

  const onTouchMove = (e: TouchEvent) => {
    const touch = e.targetTouches[0];
    const mvSize = touch.clientX - dragStartX.current;
    moveSpace.current = mvSize;
  };

  const updatePosition = () => {
    if (dragged.current) {
      listElement.current.style.transitionDuration = '0ms';

      const moveRatio =
        (moveSpace.current / listElement.current.offsetWidth) * 100;

      // handle over dragging
      if (moveRatio < -100) {
        listElement.current.style.transform = `translate3d(${
          (selectedIndex + 2) * -100
        }%, 0, 0)`;
      } else if (moveRatio > 100) {
        listElement.current.style.transform = `translate3d(${
          selectedIndex * 100
        }%, 0, 0)`;
      } else {
        const perTransform = moveRatio + perByIndex * -1;
        listElement.current.style.transform = `translate3d(${perTransform}%, 0, 0)`;
      }
      requestAnimationFrame(updatePosition);
    }
  };

  const goToSlide = (index: number) => {
    // handle case after delaySetHeadIndex
    listElement.current.style.transitionDuration = `${TRANSITION_DURATION}ms`;
    setSelectedIndex(index);
  };

  const transform = `translate3d(-${perByIndex}%, 0, 0)`;

  return (
    <div>
      <div
        className={styles.sliderWrapper}
        onMouseDown={onDragStartMouse}
        onMouseUp={onDragEndMouse}
        onTouchStart={onDragStartTouch}
        onTouchEnd={onDragEndTouch}
      >
        <button className={styles.prevBtn} onClick={prev} />
        <button className={styles.nextBtn} onClick={next} />
        <ul ref={listElement} className={styles.wrapper} style={{ transform }}>
          <li key={0}>
            <img src={slides[slides.length - 1].src} />
          </li>
          {slides.map(slide => (
            <li key={slide.id}>
              <img src={slide.src} />
            </li>
          ))}
          <li key={slides.length + 1}>
            <img src={slides[0].src} />
          </li>
        </ul>
        <CarouselIndicator
          type="points"
          slides={slides}
          selectedIndex={selectedIndex}
          goToSlide={goToSlide}
        />
      </div>
      <CarouselIndicator
        type="thumbs"
        slides={slides}
        selectedIndex={selectedIndex}
        goToSlide={goToSlide}
      />
    </div>
  );
};

export default Carousel;
