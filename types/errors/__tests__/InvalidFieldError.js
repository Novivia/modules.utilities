/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {
  ApplicationError,
  ValidationError,
  InvalidFieldError,
} from "../";
import getErrorRootCause from "../../../errors/getErrorRootCause";
import shouldInheritFromErrors from "./util/shouldInheritFromErrors";

describe(
  "InvalidFieldError",
  () => {
    const error = new InvalidFieldError();

    shouldInheritFromErrors({
      error,
      errorClasses: [
        ApplicationError,
        ValidationError,
      ],
    });

    it(
      "if not specified, should have been caused by a `RangeError`",
      () => expect(getErrorRootCause(error)).toBeInstanceOf(RangeError),
    );

    it(
      "if specified, should have the right cause",
      () => {
        const errorCause = new TypeError();

        expect(getErrorRootCause(new InvalidFieldError(errorCause, "invalid")))
        .toBe(errorCause);
      },
    );
  },
);
