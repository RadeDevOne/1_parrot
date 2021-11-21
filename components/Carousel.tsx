/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { Fragment } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { Splide, SplideSlide } from "@splidejs/react-splide";

import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";

const Carousel: FC = () => {
  return (
    <Fragment>
      <section tw="display[none] md:display[block]">
        Desktop
        <Splide
          options={{
            type: "loop",
            gap: "1rem",
            autoplay: true,
            pauseOnHover: false,
            resetProgress: false,
            arrows: "slider",
            height: "26rem",
          }}
          hasSliderWrapper
          // hasAutoplayControls
          hasAutoplayProgress
        >
          <SplideSlide>
            <img src="/images/placeholder.jpg" alt="product" />
          </SplideSlide>
          <SplideSlide>
            <img src="/images/placeholder.jpg" alt="product" />
          </SplideSlide>
        </Splide>
      </section>
      <section tw="display[block] md:display[none]">
        Mobile
        <Splide
          options={{
            type: "loop",
            gap: "1rem",
            autoplay: true,
            pauseOnHover: false,
            resetProgress: false,
            arrows: "slider",
            height: "14rem",
          }}
          hasSliderWrapper
          // hasAutoplayControls
          hasAutoplayProgress
        >
          <SplideSlide>
            <img src="/images/placeholder.jpg" alt="product" />
          </SplideSlide>
          <SplideSlide>
            <img src="/images/placeholder.jpg" alt="product" />
          </SplideSlide>
        </Splide>
      </section>
    </Fragment>
  );
};

export default Carousel;
