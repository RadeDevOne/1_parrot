/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

const ShipmentPaymentOrderBreadcrumbs: FC = () => {
  return (
    <section
      id="crumbs"
      css={[
        // tw`bg-gray-200`, tw`hover:text-indigo-600`

        css`
          $crumbs-back: #f3f5fa;
          $text-color: #8093a7;

          body {
            margin: 100px auto;
            font-family: Helvetica;
            background: #fff;
          }

          #crumbs {
            text-align: center;
            h1 {
              padding: 0 0 30px;
              text-transform: uppercase;
              font-size: 0.9rem;
              font-weight: 600;
              letter-spacing: 0.01rem;
              color: $text-color;
            }
            ul {
              list-style: none;
              display: inline-table;
              li {
                display: inline;

                a {
                  display: block;
                  float: left;
                  height: 50px;
                  background: #f3f5fa;

                  text-align: center;
                  padding: 30px 20px 0 60px;
                  position: relative;
                  margin: 0 10px 0 0;

                  font-size: 20px;
                  text-decoration: none;
                  color: $text-color;

                  &:after {
                    content: "";
                    border-top: 40px solid transparent;
                    border-bottom: 40px solid transparent;
                    border-left: 40px solid #f3f5fa;
                    position: absolute;
                    right: -40px;
                    top: 0;
                    z-index: 1;
                  }
                  &:before {
                    content: "";
                    border-top: 40px solid transparent;
                    border-bottom: 40px solid transparent;
                    border-left: 40px solid #fff;
                    position: absolute;
                    left: 0;
                    top: 0;
                  }
                }
              }
            }
          }

          #crumbs ul li:first-child a {
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
          }
          #crumbs ul li:first-child a:before {
            display: none;
          }

          #crumbs ul li:last-child a {
            padding-right: 40px;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
          }
          #crumbs ul li:last-child a:after {
            display: none;
          }

          #crumbs ul li a:hover {
            background: #357dfd;
            color: #fff;
          }
          #crumbs ul li a:hover:after {
            border-left-color: #357dfd;
            color: #fff;
          }
        `,
      ]}
    >
      {/*  */}
      <h1>Breadcrumbs</h1>
      <ul>
        <li>
          <a href="#1">
            <i className="fa fa-home" aria-hidden="true"></i>
          </a>
        </li>
        <li>
          <a href="#2">
            <i className="fa fa-shopping-bag" aria-hidden="true"></i> Shop
          </a>
        </li>
        <li>
          <a href="#3">
            <i className="fa fa-cart-plus" aria-hidden="true"></i> Cart
          </a>
        </li>
        <li>
          <a href="#4">
            <i className="fa fa-credit-card-alt" aria-hidden="true"></i>{" "}
            Checkout
          </a>
        </li>
      </ul>
    </section>
  );
};

export default ShipmentPaymentOrderBreadcrumbs;
