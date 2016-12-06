/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

// Peer dependency. Stubbed out for tests.
// eslint-disable-next-line import/no-unresolved
import createFragment from "react-addons-create-fragment";

type ObjectMap<X> = {[key: string]: X};

/**
 * Transform a string with token to react component.
 *
 * @return Renderable node in React.
 */
export default function stringToReact(
  // String containing the tokens to transform.
  phrase: string,

  // Token list and transformer.
  tokenMap: ObjectMap<string>,
): Object {
  // Get a list of tokens to transform
  const tokens = Object.keys(tokenMap);

  // Nothing to do, early exit
  if (!tokens.length) {
    return phrase;
  }

  // Create the regular expression, see http://regexr.com/3eqmg for example and
  // reference.
  const matcher = new RegExp(
    `^(.*?)<(${tokens.join("|")})(?:(?: ?\\/>)|(?:>(.*)<\\/\\2>))(.*)$`,
  );

  function match(subPhrase) {
    const result = matcher.exec(subPhrase);

    if (result) {
      const [
        ,
        before,
        matchedToken,
        part,
        after,
      ] = result;

      // An empty group returns an empty string, optimize by not fragmenting
      // empty strings.
      return createFragment({
        after: after ? match(after) : undefined,
        before: before ? before : undefined,
        inside: tokenMap[matchedToken](match(part)),
      });
    }

    // No token found in that phrase, simply return it
    return subPhrase;
  }

  return match(phrase);
};
