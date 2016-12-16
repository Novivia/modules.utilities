/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {
  ApplicationError,
  DataStoreError,
  DuplicateFieldError,
} from "../";
import shouldInheritFromErrors from "./util/shouldInheritFromErrors";

describe(
  "DuplicateFieldError",
  () => shouldInheritFromErrors({
    error: new DuplicateFieldError(),
    errorClasses: [
      ApplicationError,
      DataStoreError,
    ],
  }),
);
