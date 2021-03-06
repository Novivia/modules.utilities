/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import PermissionError from "./PermissionError";

/**
 * Represents an authentication failure error.
 */
export default class AuthenticationFailureError extends PermissionError {
  static defaultMessage = "You tried to authenticate but it failed.";
}
