/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {ApplicationError} from "../../types/errors";
import {getErrorInformation} from "../";

describe(
  "getErrorInformation",
  () => {
    const error2Info = {a: 123, c: 345};

    const error2 = new ApplicationError(
      {info: error2Info},
      "error2",
    );

    it(
      "should work when no information was provided",
      () => (
        expect(getErrorInformation(new ApplicationError("error1"))).toEqual({})
      ),
    );

    it(
      "should work with simple information",
      () => expect(getErrorInformation(error2)).toEqual(error2Info),
    );

    it(
      "should work with inherited information",
      () => {
        const error3Info = {b: 123, c: 678};
        const combinedInfo = {...error2Info, ...error3Info};

        const error3 = new ApplicationError(
          {
            cause: error2,
            info: error3Info,
          },
          "error3",
        );

        expect(getErrorInformation(error3)).toEqual(combinedInfo);
      },
    );
  },
);
