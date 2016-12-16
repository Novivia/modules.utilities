/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

/* eslint-disable filenames/match-exported, filenames/match-regex */
export default function createFragment({
  after = "",
  before = "",
  inside = "",
}) {
  return `${before}${inside}${after}`;
}
