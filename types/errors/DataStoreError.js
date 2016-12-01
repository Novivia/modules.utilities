/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import ApplicationError from "./ApplicationError";
import {oneLine} from "common-tags";

/**
 * Represents a data store error.
 */
export default class DataStoreError extends ApplicationError {
  static defaultMessage = oneLine`
    An error occured while interacting with a data store.
  `;
}
