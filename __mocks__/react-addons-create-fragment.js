/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

export default function createFragment({
  after = "",
  before = "",
  inside = "",
}) {
  return `${before}${inside}${after}`;
}
