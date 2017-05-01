/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import getBaseX from "base-x";
import {InvalidFieldError} from "../../types/errors";
import {oneLine, oneLineTrim} from "common-tags";
import {uuid} from "../";

const {
  decode,
  encode,
  generate,
  getBase,
  getVersion,
  UUID,
  validate,
} = uuid;

describe(
  "UUID",
  () => {
    describe(
      "functions",
      () => {
        describe(
          "base presets",
          () => {
            it(
              "should throw if provided with a preset that doesn't exist",
              () => {
                expect(() => getBase()).toThrowError(InvalidFieldError);
                expect(() => getBase("string")).toThrowError(InvalidFieldError);
                expect(() => getBase(327)).toThrowError(InvalidFieldError);
              },
            );

            it(
              oneLine`
                should return a valid base when provided with an existing preset
              `,
              () => {
                const base = getBase(2);
                const sample = [1, 3, 3, 7];

                expect(base.decode).toBeDefined();
                expect(base.encode).toBeDefined();
                expect(
                  base.decode(base.encode(sample)),
                ).toEqual(Buffer.from(sample));

                // Bases are cached when they're first acquired, this ensures
                // getting the same one twice and thrice doesn't break anything.
                expect(
                  getBase(2).decode(getBase(2).encode(sample)),
                ).toEqual(Buffer.from(sample));
              },
            );
          },
        );

        describe(
          "generation",
          () => {
            describe(
              "default",
              () => it(
                "should be a valid UUID",
                () => expect(validate(generate())).toBe(true),
              ),
            );

            describe(
              "v1",
              () => {
                const seed = {
                  clockseq: 0,
                  msecs: new Date(),
                  node: [3, 1, 3, 3, 7, 5],
                  nsecs: 1234,
                };
                const myUuid = generate({
                  ...seed,
                  version: 1,
                });

                it(
                  "should be different than another version with the same seed",
                  () => expect(myUuid).not.toBe(generate(seed)),
                );

                it(
                  "should be different than the same version with another seed",
                  () => expect(myUuid).not.toBe(generate({version: 1})),
                );

                it(
                  "should be the same as the same version with the same seed",
                  () => expect(myUuid).toBe(generate({
                    ...seed,
                    version: 1,
                  })),
                );
              },
            );

            describe(
              "v4",
              () => {
                const seed = {
                  random: [3, 1, 3, 3, 7, 5, 0, 2, 0, 2, 3, 1, 3, 3, 7, 5],
                  rng: () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2],
                };
                const myUuid = generate({
                  ...seed,
                  version: 4,
                });

                it(
                  "should be different than another version with the same seed",
                  () => expect(myUuid).not.toBe(generate({
                    ...seed,
                    version: 1,
                  })),
                );

                it(
                  "should be different than the same version with another seed",
                  () => expect(myUuid).not.toBe(generate({version: 4})),
                );

                it(
                  "should be the same as the same version with the same seed",
                  () => {
                    expect(myUuid).toBe(generate({
                      ...seed,
                      version: 4,
                    }));
                    expect(myUuid).toBe(generate(seed));
                  },
                );
              },
            );

            describe(
              "force encode",
              () => {
                it(
                  "should generate and encode",
                  () => expect(
                    validate(decode(generate({forceEncode: true}))),
                  ).toBe(true),
                );
              },
            );
          },
        );

        describe(
          "encoding",
          () => {
            const myUuid = "9bb32180-7e23-4495-a830-3c68656a0baf";

            it(
              "should encode a UUID to its base62 representation by default",
              () => expect(encode(myUuid)).toBe("4JNFLLQ9GMPJQcATeuBRWn"),
            );

            it(
              "should encode a UUID using a custom base",
              () => expect(
                encode(myUuid, {base: getBaseX("01234567")}),
              ).toBe("2335462060037421504453240601706414532405657"),
            );

            it(
              oneLine`
                should throw when trying to encode a UUID using an invalid
                custom base preset
              `,
              () => expect(
                () => encode(myUuid, {basePreset: 7}),
              ).toThrowError(InvalidFieldError),
            );

            it(
              "should encode a UUID using a custom base preset",
              () => expect(
                encode(myUuid, {basePreset: 11}),
              ).toBe("677105745151756305a15813181aa52007a13"),
            );

            it(
              oneLine`
                should 0-pad when encoding a UUID and asking for a longer length
              `,
              () => expect(
                encode(myUuid, {length: 30}),
              ).toBe("000000004JNFLLQ9GMPJQcATeuBRWn"),
            );

            it(
              oneLine`
                should trim when encoding a UUID and asking for a shorter length
              `,
              () => expect(
                encode("00000000-0000-0000-0000-000000000baf", {length: 10}),
              ).toBe("Mf"),
            );

            it(
              "should encode a UUID using a custom encoding",
              () => expect(
                encode(myUuid, {encoding: "ascii"}),
              ).toBe("dBFz7vQYNBNSiCk34Mq6KMtDSv3cEJQP7PKf5s5UO7s"),
            );

            it(
              "should encode a UUID that is a buffer",
              () => expect(
                encode(Buffer.from(myUuid.replace(/-/g, ""), "hex")),
              ).toBe("4JNFLLQ9GMPJQcATeuBRWn"),
            );
          },
        );

        describe(
          "decoding",
          () => {
            const myUuid = "9bb32180-7e23-4495-a830-3c68656a0baf";

            it(
              "should decode a UUID from its base62 representation by default",
              () => expect(decode("4JNFLLQ9GMPJQcATeuBRWn")).toBe(myUuid),
            );

            it(
              "should return the input if given a UUID",
              () => expect(decode(myUuid)).toBe(myUuid),
            );

            it(
              "should decode a UUID using a custom base",
              () => expect(decode(
                "2335462060037421504453240601706414532405657",
                {base: getBaseX("01234567")},
              )).toBe(myUuid),
            );

            it(
              oneLine`
                should throw when trying to decode a UUID using an invalid
                custom base preset
              `,
              () => expect(
                () => decode("4JNFLLQ9GMPJQcATeuBRWn", {basePreset: 7}),
              ).toThrowError(InvalidFieldError),
            );

            it(
              "should decode a UUID using a custom base preset",
              () => expect(decode(
                "677105745151756305a15813181aa52007a13",
                {basePreset: 11},
              )).toBe(myUuid),
            );

            it(
              "should decode a UUID using a custom encoding",
              () => expect(decode(
                "dBFz7vQYNBNSiCk34Mq6KMtDSv3cEJQP7PKf5s5UO7s",
                {encoding: "ascii"},
              )).toBe(myUuid),
            );
          },
        );

        describe(
          "version introspection",
          () => {
            it(
              "should detect the right version",
              () => {
                expect(
                  getVersion("000004d2-0000-1000-8000-030103030705"),
                ).toBe(1);
                expect(
                  getVersion("9bb32180-7e23-4495-a830-3c68656a0baf"),
                ).toBe(4);
                expect(getVersion("00000000-0000-9")).toBe(9);
              },
            );

            it(
              "should return 0 when it can't detect the right version",
              () => {
                expect(getVersion("")).toBe(0);
                expect(getVersion("000004d2-0000")).toBe(0);
                expect(getVersion("000004d2-0000-0000-0000-3c68656a0baf"))
                .toBe(0);
              },
            );
          },
        );

        describe(
          "validation",
          () => {
            const myV1Uuid = "000004d2-0000-1000-8000-030103030705";
            const myV4Uuid = "9bb32180-7e23-4495-a830-3c68656a0baf";

            it(
              "should validate v1 UUIDs correctly",
              () => {
                expect(validate(myV1Uuid, {version: 1})).toBe(true);
                expect(validate(myV4Uuid, {version: 1})).toBe(false);
                expect(validate("garbage", {version: 1})).toBe(false);
                expect(validate(
                  "garbages-garb-1ges-garb-agesgarb",
                  {version: 1},
                )).toBe(false);
              },
            );

            it(
              "should validate v4 UUIDs correctly",
              () => {
                expect(validate(myV4Uuid)).toBe(true);
                expect(validate(myV4Uuid, {version: 4})).toBe(true);
                expect(validate(myV1Uuid)).toBe(false);
                expect(validate("garbage")).toBe(false);
                expect(
                  validate("garbages-garb-4ges-garb-agesgarb"),
                ).toBe(false);
              },
            );

            it(
              "should auto-validate UUIDs correctly",
              () => {
                expect(validate(myV1Uuid, {version: false})).toBe(true);
                expect(validate(myV4Uuid, {version: false})).toBe(true);
                expect(validate("garbage", {version: false})).toBe(false);
                expect(validate(
                  "garbages-garb-1ges-garb-agesgarb",
                  {version: false},
                )).toBe(false);
              },
            );

            it(
              "should not validate an invalid UUID version",
              () => {
                expect(validate(myV1Uuid, {version: 9})).toBe(false);
                expect(validate(myV4Uuid, {version: 9})).toBe(false);
                expect(validate("garbage", {version: 9})).toBe(false);
                expect(validate(
                  "garbages-garb-9ges-garb-agesgarb",
                  {version: 9},
                )).toBe(false);
              },
            );
          },
        );
      },
    );

    describe(
      "class",
      () => {
        describe(
          "using existing UUID",
          () => {
            it(
              "should accept to be provided with an existing UUID",
              () => {
                const myV1Uuid = "000004d2-0000-1000-8000-030103030705";
                const myV4Uuid = "9bb32180-7e23-4495-a830-3c68656a0baf";

                expect(`${new UUID(myV1Uuid)}`).toBe(myV1Uuid);
                expect(`${new UUID({uuid: myV1Uuid})}`).toBe(myV1Uuid);
                expect(`${new UUID(myV4Uuid)}`).toBe(myV4Uuid);
                expect(`${new UUID({uuid: myV4Uuid})}`).toBe(myV4Uuid);
              },
            );

            it(
              "should accept to be provided with an existing encoded UUID",
              () => {
                const myUuid = "9bb32180-7e23-4495-a830-3c68656a0baf";
                const myBase62Uuid = "4JNFLLQ9GMPJQcATeuBRWn";

                expect(`${new UUID(myBase62Uuid)}`).toBe(myUuid);
                expect(`${new UUID({uuid: myBase62Uuid})}`).toBe(myUuid);
                expect(`${new UUID({
                  base: getBaseX("01234567"),
                  uuid: "2335462060037421504453240601706414532405657",
                })}`).toBe(myUuid);
                expect(`${new UUID({
                  basePreset: 11,
                  uuid: "677105745151756305a15813181aa52007a13",
                })}`).toBe(myUuid);
                expect(`${new UUID({
                  encoding: "ascii",
                  uuid: "dBFz7vQYNBNSiCk34Mq6KMtDSv3cEJQP7PKf5s5UO7s",
                })}`).toBe(myUuid);
                expect(() => new UUID({
                  basePreset: 7,
                  uuid: "4JNFLLQ9GMPJQcATeuBRWn",
                })).toThrowError(InvalidFieldError);
              },
            );
          },
        );

        describe(
          "generation",
          () => {
            describe(
              "default",
              () => it(
                "should be a valid UUID",
                () => expect(validate(new UUID().toString())).toBe(true),
              ),
            );

            describe(
              "v1",
              () => {
                const seed = {
                  clockseq: 0,
                  msecs: new Date(),
                  node: [3, 1, 3, 3, 7, 5],
                  nsecs: 1234,
                };
                const myUuid = new UUID({
                  ...seed,
                  version: 1,
                }).toString();

                it(
                  "should be different than another version with the same seed",
                  () => expect(myUuid).not.toBe(`${new UUID(seed)}`),
                );

                it(
                  "should be different than the same version with another seed",
                  () => expect(myUuid).not.toBe(`${new UUID({version: 1})}`),
                );

                it(
                  "should be the same as the same version with the same seed",
                  () => expect(myUuid).toBe(`${new UUID({
                    ...seed,
                    version: 1,
                  })}`),
                );
              },
            );

            describe(
              "v4",
              () => {
                const seed = {
                  random: [3, 1, 3, 3, 7, 5, 0, 2, 0, 2, 3, 1, 3, 3, 7, 5],
                  rng: () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2],
                };
                const myUuid = new UUID({
                  ...seed,
                  version: 4,
                }).toString();

                it(
                  "should be different than another version with the same seed",
                  () => expect(myUuid).not.toBe(`${new UUID({
                    ...seed,
                    version: 1,
                  })}`),
                );

                it(
                  "should be different than the same version with another seed",
                  () => expect(myUuid).not.toBe(`${new UUID({version: 4})}`),
                );

                it(
                  "should be the same as the same version with the same seed",
                  () => {
                    expect(myUuid).toBe(`${new UUID({
                      ...seed,
                      version: 4,
                    })}`);
                    expect(myUuid).toBe(`${new UUID(seed)}`);
                  },
                );
              },
            );
          },
        );

        describe(
          "encoding",
          () => {
            const myUuid = "9bb32180-7e23-4495-a830-3c68656a0baf";

            it(
              "should remember encoding changes",
              () => {
                const myUuidInstance = new UUID(myUuid);
                const base = getBaseX("01234567");
                const encoding = "ascii";
                const length = 100;

                expect(myUuidInstance.encode({
                  base,
                  encoding,
                  length,
                })).toBe(oneLineTrim`
                  00000000000000034542304314621423406015662462146320641623254116
                  03146014661466160330651546046030460546
                `);
                expect(myUuidInstance.base).toBe(base);
                expect(myUuidInstance.encoding).toBe(encoding);
                expect(myUuidInstance.length).toBe(length);
                expect(myUuidInstance.decode()).toBe(myUuid);
              },
            );

            it(
              "should encode a UUID to its base62 representation by default",
              () => {
                const myUuidInstance = new UUID(myUuid);
                const myUuidInstanceB = new UUID(myUuid);

                expect(myUuidInstance.shortUUID).toBe("4JNFLLQ9GMPJQcATeuBRWn");

                // We try to access it twice because the first time is
                // lazy-loaded and redefines the property.
                expect(myUuidInstance.shortUUID).toBe("4JNFLLQ9GMPJQcATeuBRWn");
                expect(myUuidInstance.encode()).toBe("4JNFLLQ9GMPJQcATeuBRWn");
                expect(myUuidInstanceB.encode()).toBe("4JNFLLQ9GMPJQcATeuBRWn");
                expect(myUuidInstanceB.shortUUID).toBe(
                  "4JNFLLQ9GMPJQcATeuBRWn",
                );
                expect(myUuidInstanceB.shortUUID).toBe(
                  "4JNFLLQ9GMPJQcATeuBRWn",
                );
              },
            );

            it(
              "should encode a UUID using a custom base",
              () => expect(new UUID(myUuid).encode(
                {base: getBaseX("01234567")},
              )).toBe("2335462060037421504453240601706414532405657"),
            );

            it(
              oneLine`
                should throw when trying to encode a UUID using an invalid
                custom base preset
              `,
              () => expect(
                () => new UUID(myUuid).encode({basePreset: 7}),
              ).toThrowError(InvalidFieldError),
            );

            it(
              "should encode a UUID using a custom base preset",
              () => expect(new UUID(myUuid).encode(
                {basePreset: 11},
              )).toBe("677105745151756305a15813181aa52007a13"),
            );

            it(
              oneLine`
                should 0-pad when encoding a UUID and asking for a longer length
              `,
              () => expect(new UUID(myUuid).encode(
                {length: 30},
              )).toBe("000000004JNFLLQ9GMPJQcATeuBRWn"),
            );

            it(
              oneLine`
                should trim when encoding a UUID and asking for a shorter length
              `,
              () => expect(
                new UUID("00000000-0000-1000-0000-000000000000").encode(
                  {length: 15},
                ),
              ).toBe("nq0VrtuDllBf2"),
            );

            it(
              "should encode a UUID using a custom encoding",
              () => expect(new UUID(myUuid).encode(
                {encoding: "ascii"},
              )).toBe("dBFz7vQYNBNSiCk34Mq6KMtDSv3cEJQP7PKf5s5UO7s"),
            );
          },
        );

        describe(
          "decoding",
          () => {
            const myUuid = "9bb32180-7e23-4495-a830-3c68656a0baf";

            it(
              "should decode a UUID from its base62 representation by default",
              () => expect(
                new UUID("4JNFLLQ9GMPJQcATeuBRWn").decode(),
              ).toBe(myUuid),
            );

            it(
              "should return the input if given a UUID",
              () => expect(new UUID(myUuid).decode()).toBe(myUuid),
            );

            it(
              "should decode a UUID using a custom base",
              () => expect(new UUID({
                base: getBaseX("01234567"),
                uuid: "2335462060037421504453240601706414532405657",
              }).decode()).toBe(myUuid),
            );

            it(
              oneLine`
                should throw when trying to decode a UUID using an invalid
                custom base preset
              `,
              () => expect(() => new UUID({
                basePreset: 7,
                uuid: "4JNFLLQ9GMPJQcATeuBRWn",
              }).decode()).toThrowError(InvalidFieldError),
            );

            it(
              "should decode a UUID using a custom base preset",
              () => expect(new UUID({
                basePreset: 11,
                uuid: "677105745151756305a15813181aa52007a13",
              }).decode()).toBe(myUuid),
            );

            it(
              "should decode a UUID using a custom encoding",
              () => expect(new UUID({
                encoding: "ascii",
                uuid: "dBFz7vQYNBNSiCk34Mq6KMtDSv3cEJQP7PKf5s5UO7s",
              }).decode()).toBe(myUuid),
            );
          },
        );

        describe(
          "version introspection",
          () => {
            it(
              "should detect the right version",
              () => {
                expect(
                  new UUID("000004d2-0000-1000-8000-030103030705").version,
                ).toBe(1);
                expect(
                  new UUID("9bb32180-7e23-4495-a830-3c68656a0baf").version,
                ).toBe(4);
                expect(new UUID("4JNFLLQ9IFVOtpYmpdlS9x").version).toBe(9);
                expect(new UUID({
                  base: getBaseX("01234567"),
                  encoding: "ascii",
                  length: 100,
                }).version).toBe(4);
              },
            );

            it(
              "should return 0 when it can't detect the right version",
              () => {
                expect(new UUID("0000000000000000000000").version).toBe(0);
                expect(new UUID("000000000000000005tklO").version).toBe(0);
                expect(new UUID("0000x4OT7iRkmtBgjdzgrd").version).toBe(0);
              },
            );
          },
        );

        describe(
          "validation",
          () => {
            const myV1Uuid = "000004d2-0000-1000-8000-030103030705";
            const myV4Uuid = "9bb32180-7e23-4495-a830-3c68656a0baf";
            const encodedGarbageUuid = "00000000000007MHfUseCy";

            it(
              "should validate v1 UUIDs correctly",
              () => {
                expect(new UUID({
                  uuid: myV1Uuid,
                  version: 1,
                }).validate()).toBe(true);
                expect(new UUID({
                  uuid: myV1Uuid,
                  version: 1,
                }).validate({version: 4})).toBe(false);
                expect(new UUID({
                  uuid: myV4Uuid,
                  version: 1,
                }).validate()).toBe(false);
                expect(new UUID(myV1Uuid).validate({version: 1})).toBe(true);
                expect(new UUID({
                  uuid: encodedGarbageUuid,
                  version: 1,
                }).validate()).toBe(false);
                expect(
                  new UUID(encodedGarbageUuid).validate({version: 1}),
                ).toBe(false);
              },
            );

            it(
              "should validate v4 UUIDs correctly",
              () => {
                expect(new UUID(myV4Uuid).validate()).toBe(true);
                expect(new UUID(myV4Uuid).validate({version: 1})).toBe(false);
                expect(new UUID({
                  uuid: myV4Uuid,
                  version: 4,
                }).validate()).toBe(true);
                expect(new UUID({
                  uuid: myV4Uuid,
                  version: 4,
                }).validate({version: 1})).toBe(false);
                expect(new UUID({
                  uuid: myV1Uuid,
                  version: 4,
                }).validate()).toBe(false);
                expect(new UUID({
                  uuid: myV1Uuid,
                  version: 4,
                }).validate({version: 1})).toBe(true);
                expect(new UUID(encodedGarbageUuid).validate()).toBe(false);
                expect(new UUID({
                  uuid: encodedGarbageUuid,
                  version: 4,
                }).validate()).toBe(false);
                expect(
                  new UUID(encodedGarbageUuid).validate({version: 4}),
                ).toBe(false);
              },
            );

            it(
              "should not validate an invalid UUID version",
              () => {
                expect(new UUID(myV1Uuid).validate({version: 9})).toBe(false);
                expect(new UUID({
                  uuid: myV1Uuid,
                  version: 9,
                }).validate()).toBe(false);
                expect(new UUID({
                  uuid: myV1Uuid,
                  version: 9,
                }).validate({version: 9})).toBe(false);
                expect(new UUID(myV4Uuid).validate({version: 9})).toBe(false);
                expect(new UUID({
                  uuid: myV4Uuid,
                  version: 9,
                }).validate()).toBe(false);
                expect(new UUID({
                  uuid: myV4Uuid,
                  version: 9,
                }).validate({version: 9})).toBe(false);
                expect(new UUID(myV4Uuid).validate({version: 9})).toBe(false);
                expect(new UUID({
                  uuid: encodedGarbageUuid,
                  version: 9,
                }).validate()).toBe(false);
                expect(
                  new UUID(encodedGarbageUuid).validate({version: 9}),
                ).toBe(false);
                expect(new UUID({
                  uuid: encodedGarbageUuid,
                  version: 9,
                }).validate({version: 9})).toBe(false);
              },
            );
          },
        );
      },
    );
  },
);
