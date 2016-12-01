/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {
  UsageLimitError,
  ApplicationError,
  PermissionError,
} from "../";
import shouldInheritFromErrors from "./util/shouldInheritFromErrors";

describe(
  "UsageLimitError",
  () => shouldInheritFromErrors({
    error: new UsageLimitError(),
    errorClasses: [
      ApplicationError,
      PermissionError,
    ],
  }),
);
