/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {
  ApplicationError,
  DataStoreError,
} from "../";
import shouldInheritFromErrors from "./util/shouldInheritFromErrors";

describe(
  "DataStoreError",
  () => shouldInheritFromErrors({
    error: new DataStoreError(),
    errorClasses: [ApplicationError],
  }),
);
