/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import ApplicationError from "./ApplicationError";

/**
 * Represents a communication error.
 */
export default class CommunicationError extends ApplicationError {
  static defaultMessage = "An error occured during the communication process.";
}
