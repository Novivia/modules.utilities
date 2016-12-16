/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {join as joinPath} from "path";

const MODULE_PATH = joinPath("..", "..", "..");

describe(
  "Environment variables",
  () => {
    const NODE_ENV = process.env.NODE_ENV;

    describe(
      "default values",
      () => {
        let variables;

        beforeAll(() => {
          delete process.env.NODE_ENV;
          jest.resetModules();
          variables = require(MODULE_PATH).backend.environment.variables;
        });

        it(
          "should be in development",
          () => {
            expect(variables.__DEV__).toBe(true);
            expect(variables.__PROD__).toBe(false);
            expect(variables.__STAGE__).toBe(false);
          },
        );

        afterAll(() => (process.env.NODE_ENV = NODE_ENV));
      },
    );

    describe(
      "when NODE_ENV is in development",
      () => {
        let variables;

        beforeAll(() => {
          process.env.NODE_ENV = "development";
          jest.resetModules();
          variables = require(MODULE_PATH).backend.environment.variables;
        });

        it(
          "variables should have corresponding values",
          () => {
            expect(variables.__DEV__).toBe(true);
            expect(variables.__PROD__).toBe(false);
            expect(variables.__STAGE__).toBe(false);
          },
        );

        afterAll(() => (process.env.NODE_ENV = NODE_ENV));
      },
    );

    describe(
      "when NODE_ENV is in staging",
      () => {
        let variables;

        beforeAll(() => {
          process.env.NODE_ENV = "staging";
          jest.resetModules();
          variables = require(MODULE_PATH).backend.environment.variables;
        });

        it(
          "variables should have corresponding values",
          () => {
            expect(variables.__DEV__).toBe(false);
            expect(variables.__PROD__).toBe(false);
            expect(variables.__STAGE__).toBe(true);
          },
        );

        afterAll(() => (process.env.NODE_ENV = NODE_ENV));
      },
    );

    describe(
      "when NODE_ENV is in production",
      () => {
        let variables;

        beforeAll(() => {
          process.env.NODE_ENV = "production";
          jest.resetModules();
          variables = require(MODULE_PATH).backend.environment.variables;
        });

        it(
          "variables should have corresponding values",
          () => {
            expect(variables.__DEV__).toBe(false);
            expect(variables.__PROD__).toBe(true);
            expect(variables.__STAGE__).toBe(false);
          },
        );

        afterAll(() => (process.env.NODE_ENV = NODE_ENV));
      },
    );
  },
);
