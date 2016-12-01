/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import PermissionError from "./PermissionError";
import {oneLine} from "common-tags";

/**
 * Represents an access denied error.
 */
export default class AccessDeniedError extends PermissionError {
  static defaultMessage = oneLine`
    You tried to access a resource you weren't allowed to.
  `;
}
