/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {ApplicationError} from "../../types/errors";
import {cleanErrorStack} from "../";

describe(
  "cleanErrorStack",
  () => {
    it(
      "should work on native errors",
      () => expect(cleanErrorStack((new TypeError("RegularTypeError")).stack))
      .toMatch(
        /\(errors\/__tests__\/cleanErrorStack\.js:[0-9]+:[0-9]+\)/,
      ),
    );

    it(
      "should work on custom errors",
      () => expect(cleanErrorStack((new ApplicationError("error1")).stack))
      .toMatch(
        /\(errors\/__tests__\/cleanErrorStack\.js:[0-9]+:[0-9]+\)/,
      ),
    );
  },
);
