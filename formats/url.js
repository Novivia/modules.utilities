/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

/* eslint-disable filenames/match-exported */

import {join as joinPath} from "path";
import {parse as parseUrl} from "path-to-regexp";

/**
 * Format a URL string.
 *
 * @return Formatted URL string.
 */
export default function formatUrl(
  url: string,
  params?: Object = {},
): string {
  const tokens = parseUrl(url);

  // Handle absolute and relative URLs.
  return tokens.reduce(
    (fullUrl, token) => {
      if (typeof token === "string") {
        return joinPath(
          fullUrl,
          ...token.split("/").filter(subToken => subToken !== ""),
        );
      }

      return joinPath(
        fullUrl,
        params[token.name] || `:${token.name}`,
      );
    },
    (url.charAt(0) === "/") ? "/" : "",
  );
}
