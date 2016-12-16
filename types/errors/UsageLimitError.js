/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import PermissionError from "./PermissionError";

/**
 * Represents an access denied error.
 */
export default class UsageLimitError extends PermissionError {
  static defaultMessage = "You exceeded your usage limit for a resource.";
}
