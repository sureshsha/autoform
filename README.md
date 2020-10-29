# Puppeteer Automation

Nodejs application for automating websites.

## Installation

Use the package manager [npm](https://nodejs.org/en/) to get started.

```bash
npm install
```

## Usage
For running app, use:
`node newsletter.js`

## For Developement
Take pull from master branch frequently to stay up to date.

`git pull origin master`

Before running app run,

`npm i`

Nodemon is installed to ease the process of running node app. To use nodemon see below:

`nodemon newsletter.js`

## Before pushing code to feature/develop branch
For maintaing code quality and staying consistent throughout the codebase, we are using combination of [eslint](https://eslint.org/) and [Prettier](https://prettier.io/)

For setting up the eslint and prettier we have used below articles as reference.
- **eslint+prettier setup:** https://indepth.dev/setting-up-efficient-workflows-with-eslint-prettier-and-typescript/

- **eslint+prettier setup:** https://sourcelevel.io/blog/how-to-setup-eslint-and-prettier-on-node

- **prettier rules:** https://prettier.io/docs/en/configuration.html

- **eslint rules:** https://eslint.org/docs/2.0.0/rules/

When you are to push code to feature branch or create PR, always perform 2 steps.

1. Run Prettier to automatically format and fix common mistakes by,

    `npm run prettier`

2. Run eslint to show linting errors by,

    `npm run eslint`

## Git Branching Stratergy
**UK/develop/**** : Branch to be merged only when completely ready with functionality

**UK/feature/**** : Branch for development work

Once developement is done on UK/feature/** branch, create PR for UK/develop/** branch.

While creating PR - Check source branch (Your feature branch) and Destination branch should be develop branch.

Refer to this article for creating PR - [How to create PR](https://opensource.com/article/19/7/create-pull-request-github)


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
