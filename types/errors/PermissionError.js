/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import ApplicationError from "./ApplicationError";
import {oneLine} from "common-tags";

/**
 * Represents a permission error.
 */
export default class PermissionError extends ApplicationError {
  static defaultMessage = oneLine`
    An error occured because of insufficient permissions.
  `;
}
