# manGoweb npm packages

This is a monorepo for all npm packages published under the manGoweb organization. For information about the individual packages, please refer to their respective readme files.


## Monorepo basics

We use [Lerna](https://github.com/lerna/lerna) to help us with the monorepo related operations.

### Boostrap

Bootstrap the packages in the current Lerna repo. Installing all their dependencies and linking any cross-dependencies.

```
lerna bootstrap
```

### Publish to npm

Create a new release of the packages that have been updated. Prompts for a new version and updates all the packages on git and npm.

```
lerna publish
```

### List packages

List all of the public packages in the current Lerna repo.

```
lerna ls
```