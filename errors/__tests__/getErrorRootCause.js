/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {ApplicationError} from "../../types/errors";
import {getErrorRootCause} from "../";

describe(
  "getErrorRootCause",
  () => {
    const typeError = new TypeError("RegularTypeError");
    const error1 = new ApplicationError("error1");
    const error2 = new ApplicationError(typeError, "error2");

    it(
      "should work on native errors",
      () => expect(getErrorRootCause(typeError)).toBeNull(),
    );

    it(
      "should work when there is no cause",
      () => expect(getErrorRootCause(error1)).toBeNull(),
    );

    it(
      "should work when there is a native cause",
      () => expect(getErrorRootCause(error2)).toBe(typeError),
    );

    it(
      "should work when there are many causes",
      () => expect(getErrorRootCause(new ApplicationError(error2, "error3")))
      .toBe(typeError),
    );

    it(
      "should work when there is a non-native cause chain",
      () => expect(getErrorRootCause(new ApplicationError(error1, "error4")))
      .toBe(error1),
    );
  },
);
