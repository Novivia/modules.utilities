/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import ValidationError from "./ValidationError";

/**
 * Represents an error that occured because the provided input was not as
 * expected.
 */
export default class InvalidFieldError extends ValidationError {
  static defaultMessage = "The input provided did not meet the expectations.";

  // eslint-disable-next-line camelcase
  jse_cause = this.jse_cause || new RangeError(this.message);
}
