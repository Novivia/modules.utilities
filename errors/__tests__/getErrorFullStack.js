/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {ApplicationError} from "../../types/errors";
import {
  cleanErrorStack,
  getErrorFullStack,
  parseErrorStack,
} from "../";
import {major as getMajorVersion} from "semver";
import {oneLineTrim} from "common-tags";

// Arbitrary length, but we don't expect smaller stacks.
const MIN_STACK_LENGTH = 5;

// Error stacks don't play well with Babel on Node 7 and above.
// See https://github.com/babel/babel/issues/4923
function getStackErrorCheck(errorType, errorMessage) {
  const error = (getMajorVersion(process.version) > 6) ? "WError" : errorType;

  return `${error}: ${errorMessage}`;
}

function getStackRegExCheck(...args) {
  return new RegExp(`^${getStackErrorCheck(...args)}`);
}

function verifyIfStackSeemsLegitimate(stack) {
  const cleanedStack = cleanErrorStack(stack);
  const parsedStack = parseErrorStack(stack);

  expect(cleanedStack).toMatch(
    /\(errors\/__tests__\/getErrorFullStack\.js:[0-9]+:[0-9]+\)/,
  );
  expect(parsedStack.length).toBeGreaterThanOrEqual(MIN_STACK_LENGTH);
}

describe(
  "getErrorFullStack",
  () => {
    const typeError = new TypeError("RegularTypeError");
    const error1 = new ApplicationError("error1");
    const error2 = new ApplicationError(typeError, "error2");

    it(
      "should work on native errors",
      () => {
        const fullStack = getErrorFullStack(typeError);

        expect(fullStack).toMatch(/^TypeError: RegularTypeError/);
        verifyIfStackSeemsLegitimate(fullStack);
      },
    );

    it(
      "should work when there is no cause",
      () => {
        const fullStack = getErrorFullStack(error1);

        expect(fullStack).toMatch(
          getStackRegExCheck("ApplicationError", "error1"),
        );
        verifyIfStackSeemsLegitimate(fullStack);
      },
    );

    it(
      "should work when there is a native cause",
      () => {
        const fullStack = getErrorFullStack(error2);

        expect(fullStack).toMatch(new RegExp(oneLineTrim`
          ^${getStackErrorCheck("ApplicationError", "error2")}[^]*?
          caused by: TypeError: RegularTypeError
        `));
        verifyIfStackSeemsLegitimate(fullStack);
      },
    );

    it(
      "should work when there are many causes",
      () => {
        const fullStack = getErrorFullStack(
          new ApplicationError(error2, "error3"),
        );

        expect(fullStack).toMatch(new RegExp(oneLineTrim`
          ^${getStackErrorCheck("ApplicationError", "error3")}[^]*?
          caused by: ${getStackErrorCheck("ApplicationError", "error2")}[^]*?
          caused by: TypeError: RegularTypeError
        `));
        verifyIfStackSeemsLegitimate(fullStack);
      },
    );

    it(
      "should work when there is a non-native cause chain",
      () => {
        const fullStack = getErrorFullStack(
          new ApplicationError(error1, "error4"),
        );

        expect(fullStack).toMatch(new RegExp(oneLineTrim`
          ^${getStackErrorCheck("ApplicationError", "error4")}[^]*?
          caused by: ${getStackErrorCheck("ApplicationError", "error1")}
        `));
        verifyIfStackSeemsLegitimate(fullStack);
      },
    );
  },
);
