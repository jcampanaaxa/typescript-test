## Contributing

### Install

To install the project dependencies, run:

    npm install

It installs the `node_modules` dependencies.

### Testing

* To run all tests, use `npm run all`.
* To run units and features tests, use `npm run test`.
* To run specific features tests, use `FEATURE=$FEATURE_NAME npm run specificFeature`.
* To run units tests, use `npm run units`.
* To run acceptance tests, use `npm run acceptances`.

### Release

The normal release flow will be

```
npm install
npm prune
npm run release BUMP_TYPE=$BUMP_TYPE
```


