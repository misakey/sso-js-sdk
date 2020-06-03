# @misakey/sdk

Misakey SDK for integrating easy user authentication in your JS application

[![License](https://img.shields.io/:license-mit-blue.svg?style=flat)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Installation](#installation)
- [Getting started](#getting-started)
- [Configuration](#getting-started)
- [Contributing](#contributing)
- [Support & Feedback](#support-feedback)
- [What is Misakey](#what-is-misakey)
- [License](#license)

## Installation

Using [npm](https://npmjs.org):

```sh
npm install @misakey/sdk
```

Using [yarn](https://yarnpkg.com):

```sh
yarn add @auth0/sdk
```

## Getting started

### Import and intitialize the configuration

```js
import { useMisakeyAuth } from "@misakey/sdk";

/** Copy this snippet in the config part of your app */
const authConfig = {
  clientId: 'e60ee766-d285-44a6-88c0-2d6e5c4633c1',
  redirectUri: 'http://localhost:3000/callback',
  buttonPlacement: 'top-right',
  userInfoRequirement: ['email'],
}

```

### Integrate the hook in your app

```js
  const { isAuthCallback, isAuthenticated, userProfile } = useMisakeyAuth(authConfig);
  if (isAuthCallback) { return null; }

```

### Use the auth context

```js
  {isAuthenticated ? (
    // Display your logged-in interface
    `Hello ${userProfile.name}`
  ) : (
    // Display your logged-out interface
    'Hello stranger, please signin !'
  )}
```

## Contributing

We appreciate feedback and contribution to this repo! Before you get started, please see the [contribution guide](./CONTRIBUTING.md).

## Support + Feedback

For support or to provide feedback, please [raise an issue on our issue tracker](https://github.com/misakey/sso-js-sdk/issues).


## What is Misakey?

Misakey helps you to easily integrate robust user managment into your app.


[Why Misakey?](https://misakey.com/why)

## License

This project is licensed under the MIT license. See the [LICENSE](./LICENSE) file for more info.
