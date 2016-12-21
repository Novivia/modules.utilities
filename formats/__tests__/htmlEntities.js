/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {htmlEntities} from "../";
import {oneLine} from "common-tags";

const {
  decode,
  encode,
} = htmlEntities;

describe(
  "HTML entities",
  () => {
    describe(
      "decode",
      () => {
        describe(
          "on a string with no entities",
          () => {
            const simpleString = "123 456";

            it(
              "should return the original string",
              () => expect(decode(simpleString)).toBe(simpleString),
            );
          },
        );

        describe(
          "on a string with entities",
          () => it(
            "should return the decoded string",
            () => expect(
              decode("&lt;&gt;123&quot;&amp;456&copy;&reg;"),
            ).toBe("<>123\"&456©®"),
          ),
        );

        describe(
          "on a simple object with entities",
          () => {
            const myDate = new Date();

            it(
              "should return the decoded object",
              () => expect(decode({
                a: "&quot;&amp;456&copy;",
                b: "&lt;&gt;&reg;",
                c: null,
                d: myDate,
              })).toEqual({
                a: "\"&456©",
                b: "<>®",
                c: null,
                d: myDate,
              }),
            );
          },
        );

        describe(
          "on a simple array with entities",
          () => it(
            "should return the decoded array",
            () => expect(decode([
              "&quot;&amp;456&copy;",
              "&lt;&gt;&reg;",
            ])).toEqual([
              "\"&456©",
              "<>®",
            ]),
          ),
        );

        describe(
          "on a complex nested object with entities",
          () => {
            const complexNestedObject = {
              a: "&quot;&amp;456&copy;",
              b: "&lt;&gt;&reg;",
              c: [
                {
                  d: [
                    "&copy;&amp;",
                    "&quot;&gt;",
                  ],
                  e: "&quot;&amp;",
                },
                {
                  f: {
                    g: "&gt;&gt;",
                  },
                  h: "&lt;&gt;",
                },
              ],
              i: 1234,
            };

            it(
              "should return the decoded object",
              () => expect(decode(complexNestedObject)).toEqual({
                a: "\"&456©",
                b: "<>®",
                c: [
                  {
                    d: [
                      "©&",
                      "\">",
                    ],
                    e: "\"&",
                  },
                  {
                    f: {
                      g: ">>",
                    },
                    h: "<>",
                  },
                ],
                i: 1234,
              }),
            );

            it(
              oneLine`
                should return the partially decoded object if not using the deep
                option
              `,
              () => expect(decode(complexNestedObject, {deep: false})).toEqual({
                a: "\"&456©",
                b: "<>®",
                c: [
                  {
                    d: [
                      "&copy;&amp;",
                      "&quot;&gt;",
                    ],
                    e: "&quot;&amp;",
                  },
                  {
                    f: {
                      g: "&gt;&gt;",
                    },
                    h: "&lt;&gt;",
                  },
                ],
                i: 1234,
              }),
            );
          },
        );
      },
    );

    describe(
      "encode",
      () => {
        describe(
          "on a string with no entities",
          () => {
            const simpleString = "123 456";

            it(
              "should return the original string",
              () => expect(encode(simpleString)).toBe(simpleString),
            );
          },
        );

        describe(
          "on a string with entities",
          () => it(
            "should return the encoded string",
            () => expect(
              encode("<>123\"&456©®"),
            ).toBe("&lt;&gt;123&quot;&amp;456&copy;&circledR;"),
          ),
        );

        describe(
          "on a string with special characters",
          () => {
            const specialCharacters = "èabc𐍈123€456é";

            it(
              oneLine`
                should return the encoded string by ignoring the UTF characters
                with no entity representation by default
              `,
              () => expect(
                encode(specialCharacters),
              ).toBe("&egrave;abc𐍈123&euro;456&eacute;"),
            );

            it(
              oneLine`
                should return the encoded string by using numeric entities for
                UTF characters
              `,
              () => expect(
                encode(specialCharacters, {type: "nonUTF"}),
              ).toBe("&egrave;abc&#55296;&#57160;123&euro;456&eacute;"),
            );

            it(
              oneLine`
                should return the encoded string by using numeric entities for
                non-ASCII characters
              `,
              () => expect(
                encode(specialCharacters, {type: "nonASCII"}),
              ).toBe("èabc&#55296;&#57160;123&#8364;456é"),
            );
          },
        );

        describe(
          "on a simple object with entities",
          () => {
            const myDate = new Date();

            it(
              "should return the decoded object",
              () => expect(encode({
                a: "\"&456©",
                b: "<>®",
                c: null,
                d: myDate,
              })).toEqual({
                a: "&quot;&amp;456&copy;",
                b: "&lt;&gt;&circledR;",
                c: null,
                d: myDate,
              }),
            );
          },
        );

        describe(
          "on a simple array with entities",
          () => it(
            "should return the encoded array",
            () => expect(encode([
              "\"&456©",
              "<>®",
            ])).toEqual([
              "&quot;&amp;456&copy;",
              "&lt;&gt;&circledR;",
            ]),
          ),
        );

        describe(
          "on a complex nested object with entities",
          () => {
            const complexNestedObject = {
              a: "\"&456©",
              b: "<>®",
              c: [
                {
                  d: [
                    "©&",
                    "\">",
                  ],
                  e: "\"&",
                },
                {
                  f: {
                    g: ">>",
                  },
                  h: "<>",
                },
              ],
              i: 1234,
            };

            it(
              "should return the encoded object",
              () => expect(encode(complexNestedObject)).toEqual({
                a: "&quot;&amp;456&copy;",
                b: "&lt;&gt;&circledR;",
                c: [
                  {
                    d: [
                      "&copy;&amp;",
                      "&quot;&gt;",
                    ],
                    e: "&quot;&amp;",
                  },
                  {
                    f: {
                      g: "&gt;&gt;",
                    },
                    h: "&lt;&gt;",
                  },
                ],
                i: 1234,
              }),
            );

            it(
              oneLine`
                should return the partially encoded object if not using the deep
                option
              `,
              () => expect(encode(complexNestedObject, {deep: false})).toEqual({
                a: "&quot;&amp;456&copy;",
                b: "&lt;&gt;&circledR;",
                c: [
                  {
                    d: [
                      "©&",
                      "\">",
                    ],
                    e: "\"&",
                  },
                  {
                    f: {
                      g: ">>",
                    },
                    h: "<>",
                  },
                ],
                i: 1234,
              }),
            );
          },
        );
      },
    );
  },
);
