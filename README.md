# crispEmber

![CI](https://img.shields.io/github/actions/workflow/status/trsavjfq/crispEmber/ci.yml?branch=main&label=CI) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6) ![License](https://img.shields.io/github/license/trsavjfq/crispEmber?color=blue) ![Version](https://img.shields.io/badge/version-0.5.3-green)

crispEmber is a TypeScript SDK for REST API integration -- a typed Client class with get/post/put/delete methods, configurable base URL, max retries with exponential backoff, and full TypeScript type definitions for responses. Zero runtime dependencies (uses native fetch). Tested with Vitest and mocked responses.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

## Features

- Full TypeScript type definitions: ApiResponse<T> and PaginatedResponse<T>
- Works in both Node.js and browser environments
- Built with tsup for CJS + ESM dual output with .d.ts files
- Vitest test suite with mocked responses
- Tree-shakeable and side-effect free for bundlers
- Automatic retry with exponential backoff (configurable maxRetries, default 3)
- Zero runtime dependencies -- uses native fetch

## Philosophy

crispEmber was built with the following principles:

- **Simplicity**: Minimal dependencies, clear code, easy to understand and modify
- **Correctness**: Comprehensive tests, type safety, and proper error handling
- **Performance**: Efficient algorithms, minimal overhead, fast startup
- **Maintainability**: Clean structure, documentation, and consistent code style

The goal is to provide a solid foundation that you can build upon, not a black box you have to work around.

## Prerequisites

- Node.js 16 or higher
- TypeScript 5.0 or higher
- npm, yarn, or pnpm

## Installation

```bash
npm install crispEmber
# or
yarn add crispEmber
# or
pnpm add crispEmber
```

## Usage

```typescript
import { Client } from 'crispEmber';
import type { ApiResponse } from 'crispEmber';

const client = new Client({
  apiKey: process.env.API_KEY!,
  baseUrl: 'https://api.example.com',
  maxRetries: 3,
});

// GET request with typed response
const data = await client.get<ApiResponse<{ id: string; name: string }>>('/items/1');
console.log(data.data.name);

// POST request
const created = await client.post('/items', { name: 'New Item', value: 42 });

// Automatic retry with exponential backoff on failure
// The client retries up to maxRetries times with 2^attempt * 1000ms delay
```

## Project Structure

```
crispEmber/
├── src/
│   ├── client.ts
│   └── index.ts
├── tests/client.test.ts
├── package.json  tsconfig.json  tsup.config.ts
├── README.md  LICENSE  CHANGELOG.md  CONTRIBUTING.md  CODE_OF_CONDUCT.md
├── .github/
│   ├── workflows/ci.yml
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── PULL_REQUEST_TEMPLATE.md
└── .gitignore
```

## Running Tests

```bash
npm test
# watch mode
npm test -- --watch
```

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

Quick start:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes and run tests (see [Running Tests](#running-tests) above)
4. Commit with a clear message: `git commit -am 'Add: my feature'`
5. Push to your fork: `git push origin feature/my-feature`
6. Open a Pull Request

Please ensure all tests pass before submitting a pull request.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.

## License

This project is licensed under the GPL-3.0 -- see the [LICENSE](LICENSE) file for details.

Copyright (c) 2026 maya ruiz.
