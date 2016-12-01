/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import DataStoreError from "./DataStoreError";

/**
 * Represents a resource not found error.
 */
export default class ResourceNotFoundError extends DataStoreError {
  static defaultMessage = "The resource could not be found.";
}
