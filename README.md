### Table of Contents

* [mw-myaxa-cz][1]
* [Contributing][2]

# mw-myaxa-cz

A mw-myaxa-cz entity middleware.

* The API explorer on development mode will be exposed on http[s]://localhost:3000/[v1]/explorer
* The graphql explorer on develoment mode will be exposed on http[s]://localhost:3000/graphiql

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

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally
* Consider use [conventional commits][3]

### Contributors

* [View Contributors][4]

### License

* See [LICENSE.txt][5]

[1]: #mw-myaxa-cz
[2]: #contributing
[3]: https://github.com/pvdlg/conventional-changelog-metahub#commit-types

[4]: https://github.com/AXA-GROUP-SOLUTIONS/mw-myaxa-cz/graphs/contributors
[5]: ./LICENSE.txt
