fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew install fastlane`

# Available Actions
## Android
### android validate_play_store_service_account
```
fastlane android validate_play_store_service_account
```
Validate PlayStore Service Account
### android bump_version_android
```
fastlane android bump_version_android
```
Bump version code Android
### android version_patch
```
fastlane android version_patch
```
Bump version number Android
### android push_play_store_internal_testing
```
fastlane android push_play_store_internal_testing
```
Submit to Play Console Internal Testing

----

## iOS
### ios version_number
```
fastlane ios version_number
```
Increment version number to AppStore
### ios build_version
```
fastlane ios build_version
```
Increments patch build version
### ios push_testflight_release
```
fastlane ios push_testflight_release
```
Push a new build to Testflight
### ios push_appstore_release
```
fastlane ios push_appstore_release
```
Push a new build to App Store
### ios match_mobileprovision
```
fastlane ios match_mobileprovision
```
Match mobile provision
### ios beta
```
fastlane ios beta
```
Build new .ipa file

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
