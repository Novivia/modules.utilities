/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

/**
 * Enumeration of values. Often used to describle possible values of a state
 * variable.
 */
export default class Enum {
  constructor(values: string[]) {
    this._values = values;
    this.length = this._values.length;
    this._values.forEach((value, index) => (this[value] = index));

    Object.freeze(this);
  }

  /**
   * Returns the maximum possible value for the Enum.
   * @return Biggest value in the Enum. (Last one)
   */
  getMax(): number {
    return this.length - 1;
  }

  /**
   * Get the strings that constitute the Enum.
   * @return The original Array provided to create the Enum.
   */
  getList(): string[] {
    return this._values;
  }

  /**
   * Returns the mapping between the original Array provided to create the Enum
   * and the associated numerical value.
   * @return A map from strings to numbers.
   */
  getMapping(): {[id:string]: number} {
    return this._values.reduce(
      (values, value) => {
        values[value] = this[value];

        return values;
      },
      {},
    );
  };

  /**
   * Returns the list of possible numerical values for the Enum.
   * @return All possible numerical value for the Enum.
   */
  getValues(): number[] {
    return this._values.map(value => this[value]);
  };
}
