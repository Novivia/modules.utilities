/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {__DEV__} from "../backend/environment/variables";

/**
 * Compares two error instances and tries to determine if they're the same or
 * part of the same inheritance tree.
 *
 * @returns Whether the error is in the same inheritance tree as the
 *          constructor.
 */
export default function errorIsInstanceOf(
  // An Error (or descendant) instance.
  error: Error,

  // Constructor of an error or descendant to test against.
  errorConstructor: Function,
): boolean {
  if (error instanceof errorConstructor) {
    return true;
  }

  // In development, linking modules can lead to the "same" errors coming from
  // different V8 frames and thus to not pass the `instanceof` operator check.
  // As a best effort, we then compare their prototype chains and presume that
  // if they have an ancestor with the same name as the researched name, they
  // are in the same inheritance tree for all intents and purposes.
  if (__DEV__) {
    let currentError = error;

    while (currentError = Object.getPrototypeOf(currentError)) {
      if (currentError.constructor.name === errorConstructor.name) {
        return true;
      }
    }
  }

  return false;
}
