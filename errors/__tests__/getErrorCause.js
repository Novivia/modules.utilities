/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {ApplicationError} from "../../types/errors";
import {getErrorCause} from "../";

describe(
  "getErrorCause",
  () => {
    const typeError = new TypeError("RegularTypeError");
    const error1 = new ApplicationError("error1");
    const error2 = new ApplicationError(typeError, "error2");

    it(
      "should work on native errors",
      () => expect(getErrorCause(typeError)).toBeNull(),
    );

    it(
      "should work when there is no cause",
      () => expect(getErrorCause(error1)).toBeNull(),
    );

    it(
      "should work when there is a native cause",
      () => {
        const cause = getErrorCause(error2);

        expect(cause).toBe(typeError);
        expect(getErrorCause(cause)).toBeNull();
      },
    );

    it(
      "should work when there are many causes",
      () => {
        const cause = getErrorCause(new ApplicationError(error2, "error3"));

        expect(cause).toBe(error2);
        expect(getErrorCause(cause)).toBe(typeError);
      },
    );

    it(
      "should work when there is a non-native cause chain",
      () => {
        const cause = getErrorCause(new ApplicationError(error1, "error4"));

        expect(cause).toBe(error1);
        expect(getErrorCause(cause)).toBeNull();
      },
    );
  },
);
