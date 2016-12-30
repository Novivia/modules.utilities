/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

/* eslint-disable filenames/match-exported, filenames/match-regex */
export default function createFragment(keys) {
  expect(Object.keys(keys)).toEqual(["before", "inside", "after"]);

  const {
    after = "",
    before = "",
    inside = "",
  } = keys;

  return `${before}${inside}${after}`;
}
