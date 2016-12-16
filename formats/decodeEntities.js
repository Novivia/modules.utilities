/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {AllHtmlEntities} from "html-entities";

/*
 * All HTML entitites decoding.
 */
const entitiesDecoder = new AllHtmlEntities();

export function decodeAllEntities(text: string): string {
  return entitiesDecoder.decode(text);
}
