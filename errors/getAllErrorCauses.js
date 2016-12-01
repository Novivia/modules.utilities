/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import getErrorCause from "./getErrorCause";

export default function getAllErrorCauses(error) {
  const causes = [];
  let cause = error;

  while (cause = getErrorCause(cause)) {
    /* istanbul ignore else  */
    if (cause) {
      causes.push(cause);
    }
  }

  return causes;
}
