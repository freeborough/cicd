# Research: GitHub Webhooks

Author(s):
  Andy Freeborough <andy@freeborough.com>

## Introduction

We wish to use GitHub Webhooks as an input for the CI/CD system.  Specifically we want to know:

* How they work.
* What hooks are available.
* What protocol they use.
* What security mechanisms are used.
* What information they pass.
* What format the information they pass is in.
* What limits, if any, there are.

## How They Work

When a GitHub event is triggered, for example there is a push made into a repository, all configured webhooks will be checked to see if any are listening to that event.  If so, they will be run, which means a POST request will be made over HTTP(S) to the configured URL.

## Available Webhooks

There are a lot which cover everything from pushes to github issues and stars.  GitHub provide a document, [Webhooks Events and Payloads](https://docs.github.com/en/free-pro-team@latest/developers/webhooks-and-events/webhook-events-and-payloads#ping) that details them all.

## Protocol and Payload

Webhooks are done by making a POST request over HTTP/HTTPS.  You can choose when configuring the webhook to have the payload delivered as application/x-www-form-encoded or json.

What information is specifically included varies based on the event, and is extensively detailed in the GitHub document [Webhooks Events and Payloads](https://docs.github.com/en/free-pro-team@latest/developers/webhooks-and-events/webhook-events-and-payloads#ping).  Essentially, everything you could possibly want and more.

If we use JSON then the data comes across as an object which is perfect for most use-cases.

## Security

There are the following security measures available that we need to support, which are detailed in the GitHub document [Securing Your Webhooks](https://docs.github.com/en/free-pro-team@latest/developers/webhooks-and-events/securing-your-webhooks).

* Each webhook can be configured with a shared secret token between GitHub and the endpoint.  They recommend using a random string with high entropy.
* The POST request can be made over HTTPS, so we'll need to ensure that our endpoint supports HTTPS.
* The POST request headers include a hash of the payload, which is calculated using a *HMAC hex digest* and passed in the header with the key X-Hub-Signature-256.
* The IP addresses that GitHub use can be obtained from [this API](https://api.github.com/meta) which we can use to limit access.

## Limits

This is far from an exhaustive list of limits, simply those come across when looking at the initial specific use-case we're looking at (push):

* A webhook push event will not be triggered if you push more than three tags at once.
* The list of commit descriptions provided in the payload is limited to 20, another API will be needed to 

## Configuring a Webhook

Webhooks can be done at the repository, organisation, or github app level.  Of particular note is the organisation level, which would allow us to easily setup an organisation-wide system for testing, staging, and releasing software.

The following information is required when setting-up a webhook via the repo/settings/webhooks:

* URL to POST to.
* Content type (x-www-form-encoded or json).
* Secret - per hook secret to ensure that we only accept POSTs from verified sources.
* Events - The list of events you'd like to subscribe to (defaults to just push).

When a webhook is configured, it will send out a 'ping' event to that endpoint to ensure that the webhook is configured correctly.

## Conclusion

GitHub Webhooks seem very straight-forward.  Some key take-a-way points:

* The endpoint needs to be configured before the webhook.
* There are a lot of events, so let's start with the ping and push events.
* We can manually configure a shared secret for now, but it could be something that we have our system automatically generate - perhaps as part of a configuration UI.
* At a minimum we need to support HTTPS, verify the shared secret, and validate the payload using the hash before processing the hook.
* Using the JSON format will be very convenient.

## Future Considrations

There are really are a lot of GitHub Webhooks, so supporting more would be useful.  Is it something that we could just pass-through to the next level?  e.g. accept all, then we let the users configuration specify how it should be dealt with.

## References

* [GitHub: About Webhooks](https://docs.github.com/en/free-pro-team@latest/developers/webhooks-and-events/about-webhooks)
* [GitHub: Webhook Events and Payloads](https://docs.github.com/en/free-pro-team@latest/developers/webhooks-and-events/webhook-events-and-payloads#ping)
* [GitHub: Securing Your Webhooks](https://docs.github.com/en/free-pro-team@latest/developers/webhooks-and-events/securing-your-webhooks)