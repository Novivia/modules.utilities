/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {
  ApplicationError,
  CommunicationError,
} from "../";
import {WError} from "verror";

describe(
  "CommunicationError",
  () => {
    const defaultError = new CommunicationError();

    it(
      "should inherit from the right Error classes",
      () => {
        expect(defaultError).toBeInstanceOf(Error);
        expect(defaultError).toBeInstanceOf(WError);
        expect(defaultError).toBeInstanceOf(ApplicationError);
      },
    );
  },
);
