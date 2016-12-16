/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {
  ApplicationError,
  CommunicationError,
  SendingError,
} from "../";
import shouldInheritFromErrors from "./util/shouldInheritFromErrors";

describe(
  "SendingError",
  () => shouldInheritFromErrors({
    error: new SendingError(),
    errorClasses: [
      ApplicationError,
      CommunicationError,
    ],
  }),
);
