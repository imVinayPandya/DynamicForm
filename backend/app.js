const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { postgraphile } = require('postgraphile');

const indexRouter = require('./routes/index');

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env;
const DB_URL = `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(
  postgraphile(process.env.DATABASE_URL || DB_URL, 'public', {
    subscriptions: true,
    watchPg: true,
    dynamicJson: true,
    setofFunctionsContainNulls: false,
    ignoreRBAC: false,
    ignoreIndexes: true,
    showErrorStack: 'json',
    extendedErrors: ['hint', 'detail', 'errcode'],
    appendPlugins: [require('@graphile-contrib/pg-simplify-inflector')],
    exportGqlSchemaPath: 'schema.graphql',
    graphiql: true,
    enhanceGraphiql: true,
    allowExplain(req) {
      // TODO: customise condition!
      return true;
    },
    enableQueryBatching: true,
    legacyRelations: 'omit',
    pgSettings(req) {
      /* TODO */
    },
  })
);

app.use('/', indexRouter);

module.exports = app;
