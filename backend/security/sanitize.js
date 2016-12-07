/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import sanitizeHtml from "sanitize-html";

const sanitizerFactory = params => text => sanitizeHtml(text, params);

/*
 * XSS sanitazation.
 */
export const all = sanitizerFactory({
  allowedTags: [],
});

/*
 * HTML content sanitization.
 */
export const html = sanitizerFactory({
  allowedAttributes: {
    a: ["href", "target"],
  },
  allowedSchemes: ["http", "https", "mailto"],
  allowedTags: [
    "b",
    "i",
    "em",
    "strong",
    "ol",
    "ul",
    "li",
    "p",
    "br",
    "a",
  ],
  selfClosing: ["br"],
});
