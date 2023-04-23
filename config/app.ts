import proxyAddr from "proxy-addr";
import Env from "@ioc:Adonis/Core/Env";
import type { ServerConfig } from "@ioc:Adonis/Core/Server";
import type { LoggerConfig } from "@ioc:Adonis/Core/Logger";
import type { ProfilerConfig } from "@ioc:Adonis/Core/Profiler";
import type { ValidatorConfig } from "@ioc:Adonis/Core/Validator";

export const appKey: string = Env.get("APP_KEY");

export const http: ServerConfig = {
  allowMethodSpoofing: false,

  subdomainOffset: 2,

  /*
  |--------------------------------------------------------------------------
  | Request Ids
  |--------------------------------------------------------------------------
  |
  | Setting this value to `true` will generate a unique request id for each
  | HTTP request and set it as `x-request-id` header.
  |
  */
  generateRequestId: false,

  /*
  |--------------------------------------------------------------------------
  | Trusting proxy servers
  |--------------------------------------------------------------------------
  |
  | Define the proxy servers that AdonisJs must trust for reading `X-Forwarded`
  | headers.
  |
  */
  trustProxy: proxyAddr.compile("loopback"),

  /*
  |--------------------------------------------------------------------------
  | Generating Etag
  |--------------------------------------------------------------------------
  |
  | Whether or not to generate an etag for every response.
  |
  */
  etag: false,

  /*
  |--------------------------------------------------------------------------
  | JSONP Callback
  |--------------------------------------------------------------------------
  */
  jsonpCallbackName: "callback",

  /*
  |--------------------------------------------------------------------------
  | Cookie settings
  |--------------------------------------------------------------------------
  */
  cookie: {
    domain: "",
    path: "/",
    maxAge: "2h",
    httpOnly: true,
    secure: false,
    sameSite: false,
  },

  /*
  |--------------------------------------------------------------------------
  | Force Content Negotiation
  |--------------------------------------------------------------------------
  |
  | The internals of the framework relies on the content negotiation to
  | detect the best possible response type for a given HTTP request.
  |
  | However, it is a very common these days that API servers always wants to
  | make response in JSON regardless of the existence of the `Accept` header.
  |
  | By setting `forceContentNegotiationTo = 'application/json'`, you negotiate
  | with the server in advance to always return JSON without relying on the
  | client to set the header explicitly.
  |
  */
  forceContentNegotiationTo: "application/json",
};

/*
|--------------------------------------------------------------------------
| Logger
|--------------------------------------------------------------------------
*/
export const logger: LoggerConfig = {
  /*
  |--------------------------------------------------------------------------
  | Application name
  |--------------------------------------------------------------------------
  |
  | The name of the application you want to add to the log. It is recommended
  | to always have app name in every log line.
  |
  | The `APP_NAME` environment variable is automatically set by AdonisJS by
  | reading the `name` property from the `package.json` file.
  |
  */
  name: Env.get("APP_NAME"),

  /*
  |--------------------------------------------------------------------------
  | Toggle logger
  |--------------------------------------------------------------------------
  |
  | Enable or disable logger application wide
  |
  */
  enabled: true,

  /*
  |--------------------------------------------------------------------------
  | Logging level
  |--------------------------------------------------------------------------
  |
  | The level from which you want the logger to flush logs. It is recommended
  | to make use of the environment variable, so that you can define log levels
  | at deployment level and not code level.
  |
  */
  level: Env.get("LOG_LEVEL", "info"),

  /*
  |--------------------------------------------------------------------------
  | Pretty print
  |--------------------------------------------------------------------------
  |
  | It is highly advised NOT to use `prettyPrint` in production, since it
  | can have huge impact on performance.
  |
  */
  prettyPrint: Env.get("NODE_ENV") === "development",
};

/*
|--------------------------------------------------------------------------
| Profiler
|--------------------------------------------------------------------------
*/
export const profiler: ProfilerConfig = {
  /*
  |--------------------------------------------------------------------------
  | Toggle profiler
  |--------------------------------------------------------------------------
  |
  | Enable or disable profiler
  |
  */
  enabled: true,

  /*
  |--------------------------------------------------------------------------
  | Blacklist actions/row labels
  |--------------------------------------------------------------------------
  |
  | Define an array of actions or row labels that you want to disable from
  | getting profiled.
  |
  */
  blacklist: [],

  /*
  |--------------------------------------------------------------------------
  | Whitelist actions/row labels
  |--------------------------------------------------------------------------
  |
  | Define an array of actions or row labels that you want to whitelist for
  | the profiler. When whitelist is defined, then `blacklist` is ignored.
  |
  */
  whitelist: [],
};

/*
|--------------------------------------------------------------------------
| Validator
|--------------------------------------------------------------------------
|
| Configure the global configuration for the validator. Here's the reference
| to the default config https://git.io/JT0WE
|
*/
export const validator: ValidatorConfig = {};
