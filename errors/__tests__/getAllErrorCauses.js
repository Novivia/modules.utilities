/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {ApplicationError} from "../../types/errors";
import {getAllErrorCauses} from "../";

describe(
  "getAllErrorCauses",
  () => {
    const typeError = new TypeError("RegularTypeError");
    const error1 = new ApplicationError("error1");
    const error2 = new ApplicationError(typeError, "error2");

    it(
      "should work on native errors",
      () => expect(getAllErrorCauses(typeError)).toEqual([]),
    );

    it(
      "should work when there is no cause",
      () => expect(getAllErrorCauses(error1)).toEqual([]),
    );

    it(
      "should work when there is a native cause",
      () => expect(getAllErrorCauses(error2)).toEqual([typeError]),
    );

    it(
      "should work when there are many causes",
      () => expect(getAllErrorCauses(new ApplicationError(error2, "error3")))
      .toEqual([error2, typeError]),
    );

    it(
      "should work when there is a non-native cause chain",
      () => expect(getAllErrorCauses(new ApplicationError(error1, "error4")))
      .toEqual([error1]),
    );
  },
);
