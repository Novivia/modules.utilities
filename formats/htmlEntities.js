/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {AllHtmlEntities} from "html-entities";

/*
 * All HTML entitites decoding.
 */
const entities = new AllHtmlEntities();

function shallowWalk(input, options, functor) {
  if (typeof input !== "string") {
    return input;
  }

  return functor(input);
}

function walk(input, {deep}, functor) {
  if (typeof input === "string") {
    return functor(input);
  }

  const mapper = deep ? walk : shallowWalk;

  if (Array.isArray(input)) {
    return input.map(entry => mapper(entry, {deep}, functor));
  }

  if (typeof input === "object") {
    if (input === null) {
      return input;
    }

    return Object.keys(input).reduce(
      (entries, entry) => {
        entries[entry] = mapper(input[entry], {deep}, functor);

        return entries;
      },
      {},
    );
  }

  return input;
}

function mapEncoder(type) {
  switch (type) {
    case "nonUTF":
      return entities.encodeNonUTF;

    case "nonASCII":
      return entities.encodeNonASCII;

    case "all":
    default:
      return entities.encode;
  }
}

function getEncoder({type}) {
  const encoder = mapEncoder(type);

  return input => encoder(input);
}

const decoder = input => entities.decode(input);

export function encode(
  input: string | Array | Object,
  {
    deep = true,
    type = "all",
  } = {},
): string {
  return walk(input, {deep}, getEncoder({type}));
}

export function decode(
  input: string | Array | Object,
  {
    deep = true,
  } = {},
): string {
  return walk(input, {deep}, decoder);
}
