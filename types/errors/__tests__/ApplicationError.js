/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {ApplicationError} from "../";
import {
  getErrorCause,
  getErrorInformation,
} from "../../../errors";
import {WError} from "verror";

function testErrorSubClass(Constructor) {
  const defaultName = Constructor.name;
  const defaultError = new Constructor();
  const customMessage = "CustomMessage";
  const customCause = new Error("MainCause");
  const customInformation = {
    baz: true,
    foo: "bar",
  };

  it(
    "should inherit from the right Error classes",
    () => {
      expect(defaultError).toBeInstanceOf(Error);
      expect(defaultError).toBeInstanceOf(WError);
    },
  );

  it(
    "should have the right name property",
    () => expect(defaultError.name).toBe(defaultName),
  );

  it(
    "should have a default message",
    () => expect(defaultError.message).toBe(Constructor.defaultMessage),
  );

  it(
    "should accept a custom message",
    () => {
      const customMessageError = new Constructor(customMessage);

      expect(customMessageError.message).toBe(customMessage);
    },
  );

  it(
    "should accept a custom cause",
    () => {
      const customCauseError = new Constructor(
        customCause,
        customMessage,
      );

      expect(customCauseError.message).toBe(customMessage);
      expect(getErrorCause(customCauseError)).toBe(customCause);
    },
  );

  it(
    "should accept custom information but retain default name",
    () => {
      const customInformationError = new Constructor(
        {
          cause: customCause,
          info: customInformation,
          name: "MyCustomName",
        },
        customMessage,
      );

      expect(getErrorCause(customInformationError)).toBe(customCause);
      expect(customInformationError.name).toBe(defaultName);
      expect(getErrorInformation(customInformationError))
      .toEqual(customInformation);
    },
  );
}

describe(
  "ApplicationError",
  () => {
    describe(
      "Base class",
      () => testErrorSubClass(ApplicationError),
    );

    describe(
      "Subclass",
      () => {
        class CustomSubClass extends ApplicationError {
          static defaultMessage = "Custom default message.";
        }

        testErrorSubClass(CustomSubClass);
      },
    );
  },
);
