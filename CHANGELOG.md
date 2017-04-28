# Versions

## v0.2.0 - (01/05/2017)

* Added the `OperationNotPermittedError` error type. It is considered to be a
  `PermissionError`.
* The `formats.stringToReact` utility will no longer cause a crash upon loading
  if the peer dependency `react-addons-create-fragment` is not available. This
  should allow to load the root of this module everywhere, even when
  `react`/`react-addons-create-fragment` are not available.
* Now requires Node v4.5+ to work.

* Updated dependencies:
    * `base-x` to v3.
    * `flow-bin` to v0.45.
    * `stack-utils` to v1.


## v0.1.3 - (03/01/2017)

* Addressed an issue where the `formats.stringToReact` utility would not order
  the formatted nodes in the right order.


## v0.1.2 - (21/12/2016)

* Fixed `formats.htmlEntities` utilities not handling object instance
  properties correctly.


## v0.1.1 - (20/12/2016)

* Fixed `formats.htmlEntities` utilities not handling `null` properties.
* Now exposing `errors` and `formats` utilities properly from the root export.


## v0.1.0 - (19/12/2016)

* Renamed `formats.decodeEntities` utility to `formats.htmlEntities`. Added the
  ability to encode entities.


## v0.0.1 - (16/12/2016)

* Initial version.
