# online-lightbulb-api

A REST API demonstration of controlling light bulbs with simple on/off switches.

By default the application creates ten virtual light bulbs.

You can see a grid of them at: http://{home_url}/bulbs/

Each of the bulbs can be viewed individually at http://{home_url}/bulbs/{bulbId} (where the bulbId is between 1 and 10 inclusive)

# The REST API works as follows:

## Retrieve state

You can GET the state of each bulb from ALL the urls above in HTML, CSV and JSON.

You can use extensions (.csv & .json) or content negotiation (text/csv & application/json)

## Turning bulbs on and off

You can GET or PUT an empty request to the following URLs:

http://{home_url}/bulbs/{bulbID}/on

http://{home_url}/bulbs/{bulbID}/off

# Installing your own

1) Clone this repository

2) npm install 

3) node index.js