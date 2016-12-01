/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import DataStoreError from "./DataStoreError";
import {oneLine} from "common-tags";

/**
 * Represents a duplicate field error.
 */
export default class DuplicateFieldError extends DataStoreError {
  static defaultMessage = oneLine`
    Another field with the same unique information already exists.
  `;
}
