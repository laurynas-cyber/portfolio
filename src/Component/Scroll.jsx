import { useScroll, animated, useSpring } from "@react-spring/web";

import styles from "./styles.module.scss";
import { useRef } from "react";

const X_LINES = 40;

const PAGE_COUNT = 3;

const INITIAL_WIDTH = 20;

export default function Scroll() {
  const containerRef = useRef(null);
  const barContainerRef = useRef(null);

  const [textStyles, textApi] = useSpring(() => ({
    y: "100%",
  }));

  const { scrollYProgress } = useScroll({
    container: containerRef,
    onChange: ({ value: { scrollYProgress } }) => {
      if (scrollYProgress > 0.7) {
        textApi.start({ y: "0" });
      } else {
        textApi.start({ y: "100%" });
      }
    },
    default: {
      immediate: true,
    },
  });
  console.log(Array.from({ length: 20 }));
  return (
    <div ref={containerRef} className={styles.body}>
      <div className={styles.animated__layers}>
        <animated.div
          ref={barContainerRef}
          className={styles.ScrollBar_container}
        >
          <div className={styles.pipe}></div>
        </animated.div>
        <animated.div
          ref={barContainerRef}
          className={styles.ScrollBar_container_inverted}
        >
          <div className={styles.pipe}></div>
        </animated.div>
        <animated.div ref={barContainerRef} className={styles.bar__container}>
          {Array.from({ length: X_LINES }).map((_, i) => (
            <animated.div
              key={i}
              className={styles.bar}
              style={{
                width: scrollYProgress.to((scrollP) => {
                  const percentilePosition = (i + 1) / X_LINES;

                  return (
                    INITIAL_WIDTH / 4 +
                    40 *
                      Math.cos(
                        ((percentilePosition - scrollP) * Math.PI) / 1.5
                      ) **
                        32
                  );
                }),
              }}
            />
          ))}
        </animated.div>
        <animated.div className={styles.bar__container__inverted}>
          {Array.from({ length: X_LINES }).map((_, i) => (
            <animated.div
              key={i}
              className={styles.bar}
              style={{
                width: scrollYProgress.to((scrollP) => {
                  const percentilePosition = 1 - (i + 1) / X_LINES;

                  return (
                    INITIAL_WIDTH / 4 +
                    40 *
                      Math.cos(
                        ((percentilePosition - scrollP) * Math.PI) / 1.5
                      ) **
                        32
                  );
                }),
              }}
            />
          ))}
        </animated.div>
        <animated.div
          className={styles.dot}
          style={{
            clipPath: scrollYProgress.to((val) => `circle(${val * 100}%)`),
          }}
        >
          <h1 className={styles.title}>
            <span>
              <animated.span style={textStyles}>Aha!</animated.span>
            </span>
            <span>
              <animated.span style={textStyles}>You found me!</animated.span>
            </span>
          </h1>
        </animated.div>
      </div>
      {new Array(PAGE_COUNT).fill(null).map((_, index) => (
        <div className={styles.full__page} key={index} />
      ))}
    </div>
  );
}
