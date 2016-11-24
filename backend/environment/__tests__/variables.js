/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

describe(
  "Environment variables",
  () => {
    var env = process.env,
        NODE_ENV = env.NODE_ENV;

    describe("default values", function () {
      var variables = require("../variables");

      beforeAll(function () {
        delete process.env.NODE_ENV;
      });

      it("should be in development", function () {
        expect(variables).to.have.property("__DEV__")
          .that.is.a("boolean")
          .that.equals(true);
        expect(variables).to.have.property("__PROD__")
          .that.is.a("boolean")
          .that.equals(false);
      });

      afterAll(function () {
        process.env.NODE_ENV = NODE_ENV;
      });
    });

    describe("when NODE_ENV is in development", function () {
      var variables = require("../variables");

      beforeAll(function () {
        process.env.NODE_ENV = "development";
        variables = vars();
      });

      it("variables should have corresponding values", function () {
        expect(variables).to.have.property("__DEV__")
          .that.is.a("boolean")
          .that.equals(true);
        expect(variables).to.have.property("__PROD__")
          .that.is.a("boolean")
          .that.equals(false);
      });

      afterAll(function () {
        process.env.NODE_ENV = NODE_ENV;
      });
    });

    describe("when NODE_ENV is in production", function () {
      var variables = require("../variables");

      beforeAll(function () {
        process.env.NODE_ENV = "production";
      });

      it("variables should have corresponding values", function () {
        expect(variables).to.have.property("__DEV__")
          .that.is.a("boolean")
          .that.equals(false);
        expect(variables).to.have.property("__PROD__")
          .that.is.a("boolean")
          .that.equals(true);
      });

      afterAll(function () {
        process.env.NODE_ENV = NODE_ENV;
      });
    });
  },
);
