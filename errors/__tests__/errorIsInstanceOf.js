/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {ApplicationError} from "../../types/errors";

describe(
  "errorIsInstanceOf",
  () => {
    const NODE_ENV = process.env.NODE_ENV;

    class NotError {};
    class CustomError extends ApplicationError {};

    const customError = new CustomError();
    const error = new ApplicationError();
    let errorIsInstanceOf;

    beforeAll(() => {
      delete process.env.NODE_ENV;
      jest.resetModules();
      errorIsInstanceOf = require("../errorIsInstanceOf");
    });

    it(
      "should expect an error",
      () => expect(errorIsInstanceOf(new NotError(), ApplicationError))
      .toThrowError(TypeError),
    );

    it(
      "should work on the same type",
      () => expect(errorIsInstanceOf(error, ApplicationError)).toBe(true),
    );

    it(
      "should work on simple inheritance",
      () => expect(errorIsInstanceOf(error, Error)).toBe(true),
    );

    it(
      "should try to match errors with the same name in development",
      () => {
        // eslint-disable-next-line no-shadow
        class ApplicationError extends Error {};

        expect(errorIsInstanceOf(error, ApplicationError)).toBe(true);
        expect(errorIsInstanceOf(customError, ApplicationError)).toBe(true);
      },
    );

    afterAll(() => {
      process.env.NODE_ENV = NODE_ENV;
      jest.resetModules();
    });

    describe(
      "when not in development",
      () => {
        let productionErrorIsInstanceOf;

        beforeAll(() => {
          delete process.env.NODE_ENV;
          process.env.NODE_ENV = "__NOT_DEVELOPMENT__";
          jest.resetModules();
          productionErrorIsInstanceOf = require("../errorIsInstanceOf");
        });

        it(
          "should not try to match errors with the same name",
          () => {
            // eslint-disable-next-line no-shadow
            class ApplicationError extends Error {};

            expect(productionErrorIsInstanceOf(error, ApplicationError))
            .toBe(false);
            expect(productionErrorIsInstanceOf(customError, ApplicationError))
            .toBe(false);
          },
        );

        afterAll(() => (process.env.NODE_ENV = NODE_ENV));
      },
    );
  },
);
