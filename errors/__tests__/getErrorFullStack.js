/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {ApplicationError} from "../../types/errors";
import {clean as cleanStack} from "stack-utils";
import {getErrorFullStack} from "../";
import {oneLineTrim} from "common-tags";
import {parse as parseStack} from "stacktrace-parser";

// Arbitrary length, but we don't expect smaller stacks.
const MIN_STACK_LENGTH = 5;

function verifyIfStackSeemsLegitimate(stack) {
  const cleanedStack = cleanStack(stack);
  const parsedStack = parseStack(stack);

  expect(cleanedStack).toMatch(
    /\(errors\/__tests__\/getErrorFullStack\.js:[0-9]+:[0-9]+\)/
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
    )

    it(
      "should work when there is no cause",
      () => {
        const fullStack = getErrorFullStack(error1);

        expect(fullStack).toMatch(/^ApplicationError: error1/);
        verifyIfStackSeemsLegitimate(fullStack);
      },
    );

    it(
      "should work when there is a native cause",
      () => {
        const fullStack = getErrorFullStack(error2);

        expect(fullStack).toMatch(new RegExp(oneLineTrim`
          ^ApplicationError: error2[^]*?
          caused by: TypeError: RegularTypeError
        `));
        verifyIfStackSeemsLegitimate(fullStack);
      },
    );

    it(
      "should work when there are many causes",
      () => {
        const fullStack = getErrorFullStack(
          new ApplicationError(error2, "error3"),
        );

        expect(fullStack).toMatch(new RegExp(oneLineTrim`
          ^ApplicationError: error3[^]*?
          caused by: ApplicationError: error2[^]*?
          caused by: TypeError: RegularTypeError
        `));
        verifyIfStackSeemsLegitimate(fullStack);
      },
    );

    it(
      "should work when there is a non-native cause chain",
      () => {
        const fullStack = getErrorFullStack(
          new ApplicationError(error1, "error4"),
        );

        expect(fullStack).toMatch(new RegExp(oneLineTrim`
          ^ApplicationError: error4[^]*?
          caused by: ApplicationError: error1
        `));
        verifyIfStackSeemsLegitimate(fullStack);
      },
    );
  },
);
