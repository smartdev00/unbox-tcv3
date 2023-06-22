fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## Android

### android push_firebase_release

```sh
[bundle exec] fastlane android push_firebase_release
```

Submit to Firebase App Distribution

### android bump_version_android

```sh
[bundle exec] fastlane android bump_version_android
```

Bump version code Android

### android version_number

```sh
[bundle exec] fastlane android version_number
```

Bump version number Android

----


## iOS

### ios version_number

```sh
[bundle exec] fastlane ios version_number
```

Increment version number to AppStore

### ios build_version

```sh
[bundle exec] fastlane ios build_version
```

Increments patch build version

### ios push_testflight_release

```sh
[bundle exec] fastlane ios push_testflight_release
```

Push a new build to Testflight

### ios match_mobileprovision

```sh
[bundle exec] fastlane ios match_mobileprovision
```

Match mobile provision

### ios beta

```sh
[bundle exec] fastlane ios beta
```

Build new .ipa file

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
