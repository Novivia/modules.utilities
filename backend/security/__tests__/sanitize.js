/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {
  oneLine,
  oneLineTrim,
} from "common-tags";
import {sanitize} from "../";

const {
  all: sanitizeAll,
  html: sanitizeHTML,
} = sanitize;

describe(
  "sanitize user input",
  () => {
    const withoutMarkup = `
      foo
      bar
    `;
    const withMarkup = (`
      <script>alert(String.fromCharCode(88,83,83))</script>
      <div>
        <p>
          <strong>
            <span>
              <a href="https://google.com">foo</a>
            </span>
          </strong>
          <br />
          <a href="ftp://google.com">bar</a>
        </p>
        <img src="javascript:alert('XSS');" />
      </div>
    `);

    describe(
      "sanitizeAll",
      () => {
        describe(
          "on a string without markup",
          () => it(
            "should return the original string",
            () => expect(sanitizeAll(withoutMarkup)).toBe(withoutMarkup),
          ),
        );

        describe(
          "on a string with markup",
          () => it(
            "should return original text with no markup",
            () => expect(
              oneLineTrim`${sanitizeAll(withMarkup)}`,
            ).toBe("foobar"),
          ),
        );
      },
    );

    describe(
      "sanitizeHTML",
      () => {
        describe(
          "on a string without markup",
          () => it(
            "should return the original string",
            () => expect(sanitizeHTML(withoutMarkup)).toBe(withoutMarkup),
          ),
        );

        describe(
          "on string with markup",
          () => it(
            oneLine`
              should return the original string with only the allowed markup
              left
            `,
            () => expect(
              oneLine`${sanitizeHTML(withMarkup).trim()}`,
            ).toBe(oneLine`
              <p>
                <strong>
                  <a href="https://google.com">foo</a>
                </strong>
                <br />
                <a>bar</a>
              </p>
            `),
          ),
        );
      },
    );
  },
);
