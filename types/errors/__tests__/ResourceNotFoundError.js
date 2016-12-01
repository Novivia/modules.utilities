/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {
  ApplicationError,
  DataStoreError,
  ResourceNotFoundError,
} from "../";
import shouldInheritFromErrors from "./util/shouldInheritFromErrors";

describe(
  "ResourceNotFoundError",
  () => shouldInheritFromErrors({
    error: new ResourceNotFoundError(),
    errorClasses: [
      ApplicationError,
      DataStoreError,
    ],
  }),
);
