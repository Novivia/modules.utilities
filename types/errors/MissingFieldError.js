/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import ValidationError from "./ValidationError";

/**
 * Represents an error that occured because the expected input wasn't provided
 * or because the provided input did not have the expected type.
 */
export default class MissingFieldError extends ValidationError {
  static defaultMessage = "The expected input wasn't provided.";

  // eslint-disable-next-line camelcase
  jse_cause = this.jse_cause || new TypeError(this.message);
}
