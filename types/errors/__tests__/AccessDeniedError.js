/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {
  AccessDeniedError,
  ApplicationError,
  PermissionError,
} from "../";
import shouldInheritFromErrors from "./util/shouldInheritFromErrors";

describe(
  "AccessDeniedError",
  () => shouldInheritFromErrors({
    error: new AccessDeniedError(),
    errorClasses: [
      ApplicationError,
      PermissionError,
    ],
  }),
);
