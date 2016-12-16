/* @flow */
/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

/* eslint-disable filenames/match-exported */

import {
  v1 as generateUUIDV1,
  v4 as generateUUIDV4,
} from "uuid";
import getBaseX from "base-x";
import InvalidFieldError from "../types/errors/InvalidFieldError";
import padStart from "lodash/padStart";
import trimStart from "lodash/trimStart";
import validateUUID from "uuid-validate";

type UUIDVersion = 1 | 4;

type UUIDTranscodeOptions = {
  base?: {
    decode: Function,
    encode: Function,
  },
  basePreset?: number,
  encoding?: string,
  length?: number,
};

type Base = {decode: Function, encode: Function};

const defaultLength = 22;
const defaultPreset = 62;
const defaultUuidVersion = 4;

const generators = {
  1: generateUUIDV1,
  4: generateUUIDV4,
};

const basePresets = {};

// https://github.com/cryptocoinjs/base-x#alphabets
const basePresetMappings = {
  2: "01",
  8: "01234567",
  11: "0123456789a",
  16: "0123456789abcdef",
  32: "0123456789ABCDEFGHJKMNPQRSTVWXYZ",
  36: "0123456789abcdefghijklmnopqrstuvwxyz",
  58: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
  62: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  64: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_",
  66: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.!",
};


// Inspired by https://github.com/dmarcelino/uuid-base62
function decodeUUID(
  input: string,
  {
    base,
    encoding = "hex",
  }: UUIDTranscodeOptions,
): string {
  const output = Buffer.from(
    base.decode(trimStart(input, "0")),
  ).toString(encoding);

  // Re-add the dashes so the result looks like an UUID.
  return (
    // eslint-disable-next-line no-magic-numbers
    [8, 13, 18, 23]
    .reduce(
      (finalValue, value) => {
        finalValue.splice(value, 0, "-");

        return finalValue;
      },
      output.split(""),
    )
    .join("")
  );
};

// Inspired by https://github.com/dmarcelino/uuid-base62
function encodeUUID(
  input: string,
  {
    base,
    encoding = "hex",
    length = defaultLength,
  }: UUIDTranscodeOptions,
): string {
  let output = input;

  if (typeof input === "string") {
    // Remove the dashes to save some space.
    output = Buffer.from(input.replace(/-/g, ""), encoding);
  }

  return ensureLength(base.encode(output), length);
};

// Inspired by https://github.com/dmarcelino/uuid-base62
function ensureLength(input: string, maximumLength?: number): string {
  const output = input.toString();

  if (output.length < maximumLength) {
    return padStart(output, maximumLength, "0");
  }

  if (output.length > maximumLength) {
    return trimStart(output, "0");
  }

  return output;
};

function makeTranscodeFunction(transcodeFunction: () => string): () => string {
  return function transcode(
    input: Buffer | string,
    {
      base,
      basePreset = defaultPreset,
      ...extraOptions
    }: UUIDTranscodeOptions = {},
  ): string {
    const baseToUse = base || getBase(basePreset);

    return transcodeFunction(
      input,
      {
        base: baseToUse,
        ...extraOptions,
      },
    );
  };
}

export function getBase(basePreset: number): Base {
  const baseMapping = basePresetMappings[basePreset];

  if (!baseMapping) {
    throw new InvalidFieldError(
      "The base you provided matches no preloaded base.",
      {info: {base: basePreset}},
    );
  }

  const base = basePresets[baseMapping];

  if (!base) {
    return (basePresets[baseMapping] = getBaseX(baseMapping));
  }

  return base;
}

export function decode(input: string, ...args: []): string {
  if (validate(input, {version: false})) {
    return input;
  }

  return makeTranscodeFunction(decodeUUID)(input, ...args);
}

export const encode = makeTranscodeFunction(encodeUUID);

export default class UUID {
  constructor(maybeOptions: UUIDTranscodeOptions | string = {}) {
    let uuid;
    let options = maybeOptions;

    if (typeof maybeOptions === "string") {
      uuid = maybeOptions;
      options = {};
    }

    const {
      base,
      basePreset = defaultPreset,
      encoding,
      length,
      version,
      ...generationOptions
    } = options;


    this.base = base || getBase(basePreset);
    this.encoding = encoding;
    this.internalVersion = version;
    this.length = length;
    this.originalUUID = uuid || options.uuid || generate({
      base: this.base,
      encoding,
      length,
      version,
      ...generationOptions,
    });
  }

  // Lazy first decode.
  get fullUUID(): string {
    if (this.internalFullUUID) {
      return this.internalFullUUID;
    }

    this.internalFullUUID = this.originalUUID;

    return (this.internalFullUUID = this.decode());
  }

  // Lazy first encode.
  get shortUUID(): string {
    if (this.internalShortUUID) {
      return this.internalShortUUID;
    }

    return (this.internalShortUUID = this.encode());
  }

  get version(): number {
    if (this.internalVersion !== undefined) {
      return this.internalVersion;
    }

    return (this.internalVersion = getVersion(this.fullUUID));
  }

  toString(): string {
    return this.fullUUID;
  }

  transcode(
    transcodeFunction: Function,
    extraOptions: Object = {},
  ): string {
    return transcodeFunction(
      this.fullUUID,
      {
        base: this.base,
        encoding: this.encoding,
        length: this.length,
        ...extraOptions,
      },
    );
  }

  decode(): string {
    return this.transcode(decode);
  }

  encode(options?: Object = {}): string {
    const {
      base,
      basePreset,
      encoding,
      length,
      ...extraOptions
    } = options;

    this.base = (
      base ||
      (basePreset && getBase(basePreset)) ||
      this.base
    );
    this.encoding = encoding || this.encoding;
    this.length = length || this.length;

    return this.transcode(encode, extraOptions);
  }

  validate(
    {version = this.version}: {version: UUIDVersion | boolean} = {},
  ): boolean {
    return validate(this.fullUUID, {version});
  }
}
export {UUID};

export function generate(
  {
    base,
    basePreset,
    encoding,
    forceEncode,
    length,
    version = defaultUuidVersion,
    ...normalOptions
  }: {
    encodeOptions: boolean | UUIDTranscodeOptions,
    version: UUIDVersion,
  } = {},
  ...args: []
): string {
  const uuid = generators[version](normalOptions, ...args);

  if (base || basePreset || encoding || length || forceEncode) {
    const encodeOptions = forceEncode === true ? {} : {
      base,
      basePreset,
      encoding,
      length,
    };

    return encode(uuid, encodeOptions);
  }

  return uuid;
}

export function getVersion(uuid: string): number {
  return validateUUID.version(uuid);
}

export function validate(
  uuid: string,
  {version = defaultUuidVersion}: {version: UUIDVersion | boolean} = {},
): boolean {
  // If `version` is explicitly false, we let the underlying module detect the
  // version.
  return validateUUID(uuid, version === false ? undefined : version);
}
