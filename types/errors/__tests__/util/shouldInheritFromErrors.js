/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {WError} from "verror";

export default function shouldInheritFromErrors({error, errorClasses = []}) {
  it(
    "should inherit from the right Error classes",
    () => {
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(WError);

      for (const ErrorClass of errorClasses) {
        expect(error).toBeInstanceOf(ErrorClass);
      }
    },
  );
}
