# gatsby-source-bokadirekt

A Gatsby source plugin for retrieving reviews from BokaDirekt.

## Installation

With npm:

```bash
npm install gatsby-source-bokadirekt
```

Or with Yarn:

```bash
yarn add gatsby-source-bokadirekt
```

## Usage

Configure the plugin in your gatsby-config.js file:

```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-bokadirekt',
      options: {
        placeId: 'YOUR_PLACE_ID',  // String, number, or array (if sourcing from multiple places)
      },
    },
  ],
}
```

## Query data with GraphQL:

Query the data sourced by this plugin using GraphQL. For example, to retrieve all reviews and their score:

```graphql
query {
  allBokaDirektReview {
    edges {
      node {
        review {
          text
          score
        }
      }
    }
  }
}
```

Result:
```json
{
  "data": {
    "allBokaDirektReview": {
      "edges": [
        {
          "node": {
            "review": {
              "text": "Very good service. Will come back!",
              "score": 5
            }
          }
        }
      ]
    }
  }
}

```

## Options

- placeId (required): The ID of the place in BokaDirekt you want to source data from. Multiple placeId:s is possible if placed in array.

## Limitations

- Only written reviews are available. This means that the overall score can not be retrieved.

## Contributing

Contributions are more than welcome! Please feel free to submit a Pull Request.

## License
MIT