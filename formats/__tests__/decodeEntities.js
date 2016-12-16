/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {decodeEntities} from "../";

const {
  decodeAllEntities,
} = decodeEntities;

describe(
  "decode HTML entities",
  () => describe(
    "decodeAllEntities",
    () => {
      describe(
        "on a string with no entities",
        () => {
          const simpleString = "123 456";

          it(
            "should return the original string",
            () => expect(decodeAllEntities(simpleString)).toBe(simpleString),
          );
        },
      );

      describe(
        "on a string with entities",
        () => it(
          "should return the decoded string",
          () => expect(
            decodeAllEntities("&lt;&gt;123&quot;&amp;456&copy;&reg;"),
          ).toBe("<>123\"&456©®"),
        ),
      );
    },
  ),
);
