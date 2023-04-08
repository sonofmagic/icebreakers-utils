# @icebreakers/rollup

## Usage

### Install

```sh
yarn add -D rollup @icebreakers/rollup
```

### Rollup Config

create a file named `rollup.config.mjs`

```js
import { createRollupConfig } from '@icebreakers/rollup'

export default createRollupConfig()
```

### Script

package.json

```json
  "scripts": {
    "dev": "cross-env NODE_ENV=development rollup -cw",
    "build": "cross-env NODE_ENV=production rollup -c"
  },
```
