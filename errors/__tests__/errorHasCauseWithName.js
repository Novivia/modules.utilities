/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {ApplicationError} from "../../types/errors";
import {errorHasCauseWithName} from "../";

describe(
  "errorHasCauseWithName",
  () => {
    const typeError = new TypeError("RegularTypeError");
    const error1 = new ApplicationError("error1");
    const error2 = new ApplicationError(typeError, "error2");

    it(
      "should work on native errors",
      () => {
        expect(errorHasCauseWithName(typeError, "Error")).toBe(false);
        expect(errorHasCauseWithName(typeError, "TypeError")).toBe(true);
      },
    );

    it(
      "should work when there is no cause",
      () => {
        expect(errorHasCauseWithName(error1, "ApplicationError")).toBe(true);
        expect(errorHasCauseWithName(error1, "Error")).toBe(false);
      },
    );

    it(
      "should work when there is a native cause",
      () => {
        expect(errorHasCauseWithName(error2, "ApplicationError")).toBe(true);
        expect(errorHasCauseWithName(error2, "TypeError")).toBe(true);
        expect(errorHasCauseWithName(error2, "Error")).toBe(false);
      },
    );

    it(
      "should work when there are many causes",
      () => {
        const error3 = new ApplicationError(error2, "error3");

        expect(errorHasCauseWithName(error3, "ApplicationError")).toBe(true);
        expect(errorHasCauseWithName(error3, "TypeError")).toBe(true);
        expect(errorHasCauseWithName(error3, "Error")).toBe(false);
      },
    );
  },
);
