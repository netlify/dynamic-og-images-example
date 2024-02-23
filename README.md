![Netlify Examples](./docs/netlify-examples.png)

# Dynamic OG Images with Netlify Edge Functions

This is an example of how to use [Netlify Edge Functions](https://docs.netlify.com/edge-functions/overview/) to generate dynamic OpenGraph images for your site.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/netlify/dynamic-og-images-example)

[![Demo](./docs/dynamic-og-images.png)](https://dynamic-og-images-example.netlify.app/)

## Setup

To use this project locally, first clone the repository:

    git clone git@github.com:netlify/dynamic-og-images-example.git
    cd dynamic-og-images-example

Install the dependencies:

    yarn

Install the Netlify CLI:

    npm install -g netlify-cli

Start the development server:

    ntl dev --command "yarn dev" --target-port 3000

This will open a browser window at `http://localhost:8888` with the example site.
