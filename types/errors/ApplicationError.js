/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {WError} from "verror";

/**
 * Represents an application error.
 */
export default class ApplicationError extends WError {
  static defaultMessage = "A problem happened with the application.";

  message = (
    this.message || Object.getPrototypeOf(this).constructor.defaultMessage
  );
  name = Object.getPrototypeOf(this).constructor.name;
}
