/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {
  AuthenticationFailureError,
  ApplicationError,
  PermissionError,
} from "../";
import shouldInheritFromErrors from "./util/shouldInheritFromErrors";

describe(
  "AuthenticationFailureError",
  () => shouldInheritFromErrors({
    error: new AuthenticationFailureError(),
    errorClasses: [
      ApplicationError,
      PermissionError,
    ],
  }),
);
