/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import PermissionError from "./PermissionError";

/**
 * Represents a read-only error.
 */
export default class ReadOnlyError extends PermissionError {
  static defaultMessage = "You tried to write to a resource that is read-only.";
}
