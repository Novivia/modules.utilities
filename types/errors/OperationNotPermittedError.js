/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import PermissionError from "./PermissionError";

/**
 * Represents an operation that is not permitted due to specific conditions.
 */
export default class OperationNotPermittedError extends PermissionError {
  static defaultMessage = "You currently cannot effectuate this operation.";
}
