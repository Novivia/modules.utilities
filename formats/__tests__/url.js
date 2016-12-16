/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {url} from "../";

describe(
  "URL format",
  () => {
    describe(
      "with a simple URL and no parameters",
      () => {
        describe(
          "leading slash",
          () => {
            const testUrl = "/foo/bar";

            it(
              "should return the same url",
              () => expect(url(testUrl)).toBe(testUrl),
            );
          },
        );

        describe(
          "trailing slash",
          () => it(
            "should strip the trailing slash",
            () => expect(url("foo/bar/")).toBe("foo/bar"),
          ),
        );

        describe(
          "leading and trailing slash",
          () => it(
            "should strip the trailing slash",
            () => expect(url("/foo/bar/")).toBe("/foo/bar"),
          ),
        );
      },
    );

    describe(
      "with irrelevant parameters",
      () => {
        const testUrl = "/foo/bar";

        it(
          "should ignore the irrelevant parameters",
          () => expect(url(testUrl, {foo: "bar"})).toBe(testUrl),
        );
      },
    );

    describe(
      "with relevant parameters",
      () => it(
        "should replace the relevant parameters with their value",
        () => expect(
          url("/:foo/test/bar/:foo/foo", {foo: "bar"}),
        ).toBe("/bar/test/bar/bar/foo"),
      ),
    );

    describe(
      "with relevant and irrelevant parameters",
      () => it(
        "should only replace the relevant parameters with their value",
        () => expect(
          url(
            "/:foo/test/bar/:foo/foo",
            {
              bar: "foo",
              foo: "bar",
            },
          ),
        ).toBe("/bar/test/bar/bar/foo"),
      ),
    );

    describe(
      "with missing parameters",
      () => {
        describe(
          "single",
          () => {
            const testUrl = "/foo/:bar";

            it(
              "should ignore the missing parameters",
              () => expect(url(testUrl)).toBe(testUrl),
            );
          },
        );

        describe(
          "mixed",
          () => {
            const testUrl = "/foo/:bar";

            it(
              "should ignore the missing parameters",
              () => expect(url(testUrl, {foo: "bar"})).toBe(testUrl),
            );
          },
        );
      },
    );
  },
);
