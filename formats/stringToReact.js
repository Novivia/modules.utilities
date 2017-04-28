/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

let createFragment;

try {
  // Peer dependency. Stubbed out for tests.
  // eslint-disable-next-line import/no-unresolved
  createFragment = require("react-addons-create-fragment");
} catch (e) {
  // We'll load the `react-addons-create-fragment` dependency only if this file
  // is required and it exists.
}

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
        before: before ? before : undefined,
        inside: tokenMap[matchedToken](match(part)),

        // Order is important here. See
        // https://facebook.github.io/react/docs/create-fragment.html
        //
        // "and the order of the object's keys is used to determine the order of
        // the rendered children […] Note also that we're relying on the
        // JavaScript engine preserving object enumeration order here, which is
        // not guaranteed by the spec but is implemented by all major browsers
        // and VMs for objects with non-numeric keys."
        //
        // eslint-disable-next-line sort-keys
        after: after ? match(after) : undefined,
      });
    }

    // No token found in that phrase, simply return it
    return subPhrase;
  }

  return match(phrase);
};
