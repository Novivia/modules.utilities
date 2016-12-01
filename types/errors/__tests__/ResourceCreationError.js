/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {
  ApplicationError,
  DataStoreError,
  ResourceCreationError,
} from "../";
import shouldInheritFromErrors from "./util/shouldInheritFromErrors";

describe(
  "ResourceCreationError",
  () => shouldInheritFromErrors({
    error: new ResourceCreationError(),
    errorClasses: [
      ApplicationError,
      DataStoreError,
    ],
  }),
);
