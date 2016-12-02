/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {Enum} from "../";

describe(
  "Enum type",
  () => {
    describe(
      "when instanciating",
      () => {
        describe(
          "with no argument",
          () => it(
            "should throw an error",
            () => expect(() => new Enum()).toThrowError(TypeError),
          ),
        );

        describe(
          "with something else than an array",
          () => it(
            "should throw an error",
            () => expect(
              () => new Enum(1),
            ).toThrowError(TypeError),
          ),
        );

        describe(
          "with an empty array",
          () => it(
            "should return an Enum instance",
            () => expect(new Enum([])).toBeInstanceOf(Enum),
          ),
        );

        describe(
          "with an array of strings",
          () => it(
            "should return an Enum instance",
            () => expect(new Enum(["A", "B", "C"])).toBeInstanceOf(Enum),
          ),
        );
      },
    );

    const myEnumKeys = ["A", "B", "C"];
    const myEnumMapping = myEnumKeys.reduce(
      (values, value, index) => {
        values[value] = index;

        return values;
      },
      {},
    );
    const myEnumIndexes = myEnumKeys.map((value, index) => index);
    const myEnum = new Enum(myEnumKeys);

    describe(
      "when accessing",
      () => {
        describe(
          "the count of values",
          () => it(
            "should be the same as the length of the list used to instanciate",
            () => expect(myEnum.length).toEqual(myEnumKeys.length),
          ),
        );

        describe(
          "the maximum possible value",
          () => it(
            "should be the last entry in the list of keys",
            () => expect(myEnum.getMax()).toEqual(myEnumKeys.length - 1),
          ),
        );

        describe(
          "a specific value",
          () => {
            it(
              "should return the appropriate index if it exists",
              () => {
                expect(myEnum.B).toEqual(myEnumMapping.B);
                expect(myEnum.B).not.toEqual(myEnumMapping.A);
                expect(myEnum.B).not.toEqual(myEnum.A);
                expect(myEnum.B).not.toEqual(myEnumMapping.C);
                expect(myEnum.B).not.toEqual(myEnum.C);
              },
            );

            it(
              "should return undefined if it doesn't exist",
              () => expect(myEnum.D).toEqual(undefined),
            );
          },
        );

        describe(
          "the possible values",
          () => it(
            "should be the sequence from 0 to length - 1",
            () => expect(myEnum.getValues()).toEqual(myEnumIndexes),
          ),
        );

        describe(
          "the list of keys",
          () => it(
            "should be the same as the list used to instanciate",
            () => expect(myEnum.getList()).toEqual(myEnumKeys),
          ),
        );

        describe(
          "the mapping from keys to values",
          () => it(
            "should be the keys provided associated with their value",
            () => expect(myEnum.getMapping()).toEqual(myEnumMapping),
          ),
        );
      },
    );

    describe(
      "when mutating",
      () => {
        describe(
          "to modify an existing key",
          () => it(
            "should throw an error",
            () => expect(() => (myEnum.C = 1337)).toThrowError(TypeError),
          ),
        );

        describe(
          "to add a new key",
          () => it(
            "should throw an error",
            () => expect(() => (myEnum.D = 1337)).toThrowError(TypeError),
          ),
        );

        it(
          "should not have an effect",
          () => {
            expect(myEnum.C).toEqual(myEnumMapping.C);
            expect(myEnum.D).toEqual(undefined);
            expect(myEnum.getList()).toEqual(myEnumKeys);
            expect(myEnum.getValues()).toEqual(myEnumIndexes);
          },
        );
      },
    );
  },
);
