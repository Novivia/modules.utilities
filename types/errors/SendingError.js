/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import CommunicationError from "./CommunicationError";
import {oneLine} from "common-tags";

/**
 * Represents a communication sending error.
 */
export default class SendingError extends CommunicationError {
  static defaultMessage = oneLine`
    An error occured while attempting to send the communication.
  `;
}
