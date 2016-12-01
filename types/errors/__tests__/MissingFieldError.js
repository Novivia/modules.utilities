/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {
  ApplicationError,
  ValidationError,
  MissingFieldError,
} from "../";
import getErrorRootCause from "../../../errors/getErrorRootCause";
import shouldInheritFromErrors from "./util/shouldInheritFromErrors";

describe(
  "MissingFieldError",
  () => {
    const error = new MissingFieldError();

    shouldInheritFromErrors({
      error,
      errorClasses: [
        ApplicationError,
        ValidationError,
      ],
    });

    it(
      "if not specified, should have been caused by a `RangeError`",
      () => expect(getErrorRootCause(error)).toBeInstanceOf(TypeError),
    );

    it(
      "if specified, should have the right cause",
      () => {
        const errorCause = new RangeError();

        expect(getErrorRootCause(new MissingFieldError(errorCause, "invalid")))
        .toBe(errorCause);
      },
    );
  },
);
