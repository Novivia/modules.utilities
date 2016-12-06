/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {stringToReact} from "../";

jest.mock("react-addons-create-fragment");

describe(
  "stringToReact",
  () => {
    // Basic transforms.
    /* eslint-disable id-length */
    const a = text => `aa${text}aa`;
    const b = text => `bb${text}bb`;
    const c = () => "cc";
    const d = () => "dd";
    /* eslint-enable id-length */

    it(
      "should let a simple string fall through",
      () => {
        const sentence = "A simple sentence";

        expect(stringToReact(sentence, {})).toBe(sentence);
      },
    );

    it(
      "should modify one token",
      () => expect(stringToReact(
        "A simple <a>sentence</a>",
        {a},
      )).toBe("A simple aasentenceaa"),
    );

    it(
      "should not modify mixed tokens",
      () => {
        const sentence = "A simple <a>sentence</b>";

        expect(stringToReact(
          sentence,
          {
            a,
            b: "unused",
          },
        )).toBe(sentence);
      },
    );

    it(
      "should modify sibling tokens",
      () => expect(stringToReact(
        "A <a>simple</a> small <b>sentence</b> right",
        {a, b},
      )).toBe("A aasimpleaa small bbsentencebb right"),
    );

    it(
      "should modify nested tokens",
      () => expect(stringToReact(
        "A <a>simple <b>sentence</b> right</a>",
        {a, b},
      )).toBe("A aasimple bbsentencebb rightaa"),
    );

    it(
      "should ignore missing tokens",
      () => expect(stringToReact(
        "A <a>simple <b>sentence</b> right</a>",
        {a},
      )).toBe("A aasimple <b>sentence</b> rightaa"),
    );

    it(
      "should handle multiple occurences of a token",
      () => expect(stringToReact(
        "<a>A <a>simple <a><b>sentence</b></a> right</a></a>",
        {a, b},
      )).toBe("aaA aasimple aabbsentencebbaa rightaaaa"),
    );

    it(
      "should replace self-closed tokens",
      () => expect(stringToReact(
        "A simple <c /> sentence with self-closed tags <c />.",
        {c},
      )).toBe("A simple cc sentence with self-closed tags cc."),
    );

    it(
      "should replace self-closed tokens without a space",
      () => expect(stringToReact(
        "A simple <c/> sentence with self-closed tags <c/>.",
        {c},
      )).toBe("A simple cc sentence with self-closed tags cc."),
    );

    it(
      "should replace many self-closed tokens",
      () => expect(stringToReact(
        "A <d />simple <c /><c /> sentence <c /><d /><c /><d />",
        {c, d},
      )).toBe("A ddsimple cccc sentence ccddccdd"),
    );

    it(
      "should replace sibling tokens and self-closed tokens",
      () => expect(stringToReact(
        "A <c />simple <a>sentence</a><c />",
        {a, c},
      )).toBe("A ccsimple aasentenceaacc"),
    );

    it(
      "should replace nested tokens and self-closed tokens",
      () => expect(stringToReact(
        "A <a>simple<d />sentence</a> <b><d /><c><d /></c></b>",
        {
          a: text => `ax${text}xa`,
          b: text => `by${text}yb`,
          c: text => `cz${text}zc`,
          d,
        },
      )).toBe("A axsimpleddsentencexa byddczddzcyb"),
    );

    it(
      "should replace a token which is also self-closed",
      () => expect(stringToReact(
        "Simple <a>sentence</a> with a self-closed tags <a />.",
        {a: text => (text ? `ab${text}ba` : "cd")},
      )).toBe("Simple absentenceba with a self-closed tags cd."),
    );
  },
);
