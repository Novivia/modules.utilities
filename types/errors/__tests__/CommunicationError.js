/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {
  ApplicationError,
  CommunicationError,
} from "../";
import shouldInheritFromErrors from "./util/shouldInheritFromErrors";

describe(
  "CommunicationError",
  () => shouldInheritFromErrors({
    error: new CommunicationError(),
    errorClasses: [ApplicationError],
  }),
);
