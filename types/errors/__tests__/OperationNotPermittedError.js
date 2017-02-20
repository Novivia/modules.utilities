/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {
  OperationNotPermittedError,
  ApplicationError,
  PermissionError,
} from "../";
import shouldInheritFromErrors from "./util/shouldInheritFromErrors";

describe(
  "OperationNotPermittedError",
  () => shouldInheritFromErrors({
    error: new OperationNotPermittedError(),
    errorClasses: [
      ApplicationError,
      PermissionError,
    ],
  }),
);
