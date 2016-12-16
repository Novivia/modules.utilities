/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import DataStoreError from "./DataStoreError";

/**
 * Represents a resource creation error.
 */
export default class ResourceCreationError extends DataStoreError {
  static defaultMessage = "The resource creation failed.";
}
