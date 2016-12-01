/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {ApplicationError} from "../../types/errors";
import {parseErrorStack} from "../";

describe(
  "parseErrorStack",
  () => {
    it(
      "should work on native errors",
      () => {
        const parsedStack = parseErrorStack(
          (new TypeError("RegularTypeError")).stack,
        );

        expect(parsedStack).toBeInstanceOf(Array);
        expect(parsedStack.length).toBeGreaterThanOrEqual(1);
      },
    );

    it(
      "should work on custom errors",
      () => {
        const parsedStack = parseErrorStack(
          (new ApplicationError("error1")).stack,
        );

        expect(parsedStack).toBeInstanceOf(Array);
        expect(parsedStack.length).toBeGreaterThanOrEqual(1);
      },
    );
  },
);
