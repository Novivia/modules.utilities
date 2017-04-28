/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {
  ApplicationError,
  CommunicationError,
} from "../../types/errors";
import {findErrorCauseByName} from "../";

describe(
  "findErrorCauseByName",
  () => {
    const typeError = new TypeError("RegularTypeError");
    const error1 = new ApplicationError("error1");
    const error2 = new ApplicationError(typeError, "error2");

    it(
      "should work on native errors",
      () => {
        expect(findErrorCauseByName(typeError, "Error")).toBeNull();
        expect(findErrorCauseByName(typeError, "TypeError")).toBe(typeError);
      },
    );

    it(
      "should work when there is no cause",
      () => {
        expect(findErrorCauseByName(error1, "ApplicationError")).toBe(error1);
        expect(findErrorCauseByName(error1, "Error")).toBeNull();
      },
    );

    it(
      "should work when there is a native cause",
      () => {
        expect(findErrorCauseByName(error2, "ApplicationError")).toBe(error2);
        expect(findErrorCauseByName(error2, "TypeError")).toBe(typeError);
        expect(findErrorCauseByName(error2, "Error")).toBeNull();
      },
    );

    it(
      "should work when there are many causes",
      () => {
        const error3 = new CommunicationError(error2, "error3");

        expect(findErrorCauseByName(error3, "CommunicationError")).toBe(error3);
        expect(findErrorCauseByName(error3, "ApplicationError")).toBe(error2);
        expect(findErrorCauseByName(error3, "TypeError")).toBe(typeError);
        expect(findErrorCauseByName(error3, "Error")).toBeNull();
      },
    );
  },
);
