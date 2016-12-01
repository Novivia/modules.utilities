/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {
  ApplicationError,
  PermissionError,
} from "../";
import shouldInheritFromErrors from "./util/shouldInheritFromErrors";

describe(
  "PermissionError",
  () => shouldInheritFromErrors({
    error: new PermissionError(),
    errorClasses: [ApplicationError],
  }),
);
