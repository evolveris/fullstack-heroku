# Fullstack Heroku Template

## Local Development

Because this app is made of two npm projects, there are two places to run `npm/yarn` commands:

1. **Node API server** at the root `./`
1. **React UI** in `react-ui/` directory.

### Run the API server

In a terminal:

```bash
# Initial setup
npm install

# Start the server
npm start
```

#### Install new npm packages for Node

```bash
npm install package-name --save
```

### Run the React UI

The React app is configured to proxy backend requests to the local Node server using a custom proxy package.

In a separate terminal from the API server, start the UI:

```bash
# Always change directory, first
cd react-ui/

# Initial setup
yarn install

# Start the server
yarn start
```

#### Install new npm packages for React UI

```bash
# Always change directory, first
cd react-ui/

npm install package-name --save
```

#### Running tests

```
npm run test
```

#### Deploy to Heroku

```bash
heroku login
heroku apps:create --region eu
git push heroku main
```