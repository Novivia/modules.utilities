/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import getErrorCause from "./getErrorCause";

export default function getErrorRootCause(error) {
  let cause = error;
  let rootCause = null;

  while (cause = getErrorCause(cause)) {
    /* istanbul ignore else  */
    if (cause) {
      rootCause = cause;
    }
  }

  return rootCause;
}
