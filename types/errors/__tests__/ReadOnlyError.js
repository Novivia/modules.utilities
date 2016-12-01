/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {
  ReadOnlyError,
  ApplicationError,
  PermissionError,
} from "../";
import shouldInheritFromErrors from "./util/shouldInheritFromErrors";

describe(
  "ReadOnlyError",
  () => shouldInheritFromErrors({
    error: new ReadOnlyError(),
    errorClasses: [
      ApplicationError,
      PermissionError,
    ],
  }),
);
