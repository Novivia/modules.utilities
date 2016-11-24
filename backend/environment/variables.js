/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

const NODE_ENV = process.env.NODE_ENV || "development";

// In development.
export const __DEV__ = (NODE_ENV === "development");

// In production.
export const __PROD__ = (NODE_ENV === "production");

// In staging.
export const __STAGE__ = (NODE_ENV === "staging");
