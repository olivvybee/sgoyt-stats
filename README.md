# SGOYT stats

A web-based tool for scraping monthly
[solo gaming threads on BoardGameGeek](https://boardgamegeek.com/thread/986303/solitaire-games-on-your-table-monthly-geeklist-sub),
analysing data, and displaying statistics.

This is still very much a work in progress.

## Tooling

The repo contains two node.js packages, `api` which collects and analyses the
data, and `frontend` which is the website for viewing the data. They're both
written in typescript. There's also a `scripts` directory which contains the
worker scripts for actually scraping BGG.

The backend is a [hono](https://hono.dev/) server using the
[prisma ORM](https://www.prisma.io/docs/orm) to interface with an sqlite
database.

The frontend is a [next.js](https://nextjs.org/) website (and therefore a react
app) which uses an internal api to fetch data from the backend.

The entire repo is a [turbo](https://turborepo.com/) repo, which simply serves
to make it easier to run the app locally during development.

## Developing

First set up local `.env` files in each of the packages by copying
`.env.example` and filling in the values. Be sure to use the same api key in
both!

You'll need node.js v22 and [pnpm](https://pnpm.io/) installed. Install
dependencies with `pnpm i`, then run the app using `pnpm dev` in the root of the
repo. This will simultaneously start both the backend and frontend in
development mode.

The repo has [prettier](https://prettier.io/) installed to maintain code style,
particularly the use of single/double quotes and trailing commas.

Editors like VSCode should pick up the `.prettierrc` config file automatically
and allow you to format the code according to the rules, but if not you can run
`pnpm prettier:format` in the root of the repo to format the code before
committing.

There are no tests configured for this project, nor any linting.
