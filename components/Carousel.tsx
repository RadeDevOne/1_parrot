/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { Splide, SplideSlide } from "@splidejs/react-splide";

import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";

const Carousel: FC = () => {
  return (
    <section>
      <Splide
        options={{
          type: "loop",
          gap: "1rem",
          autoplay: true,
          pauseOnHover: false,
          resetProgress: false,
          arrows: "slider",
          height: "12rem",
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
  );
};

export default Carousel;
