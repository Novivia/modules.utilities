/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {
  ApplicationError,
  ValidationError,
} from "../";
import shouldInheritFromErrors from "./util/shouldInheritFromErrors";

describe(
  "ValidationError",
  () => shouldInheritFromErrors({
    error: new ValidationError(),
    errorClasses: [ApplicationError],
  }),
);
