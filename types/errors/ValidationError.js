/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import ApplicationError from "./ApplicationError";

/**
 * Represents a validation error.
 */
export default class ValidationError extends ApplicationError {
  static defaultMessage = "Invalid input was provided.";
}
