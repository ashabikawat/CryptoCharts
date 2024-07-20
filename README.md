## API

The application fetches data from the CoinGecko API. Below are some of the endpoints used:

- **Trending Coins:**

  https://api.coingecko.com/api/v3/coins/markets?vs_currency={currency}&order=gecko_desc&per_page=10&page=1&sparkline=false

- **Coin List:**

  https://api.coingecko.com/api/v3/coins/markets?vs_currency={currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false

- **Single Coin:**
  https://api.coingecko.com/api/v3/coins/{id}

- **Historical Chart :**
  https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}

## Usage

### Viewing Trending Cryptocurrencies

- The homepage displays a carousel with the top trending cryptocurrencies.

### Viewing All Cryptocurrencies

- There is a section to view a paginated table of all available cryptocurrencies.
- Use the search bar to filter cryptocurrencies by name or symbol.

### Viewing Detailed Cryptocurrency Information

- Click on any cryptocurrency in the table to view detailed information about that cryptocurrency.
- The detailed view includes a description, market cap rank, and a chart visualizing the cryptocurrency's data.

## Contributing

1. **Fork the repository**
2. **Create a new branch:**

   git checkout -b feature-branch

3. **Commit your changes:**

   git commit -m 'Add some feature'

4. **Push to the branch:**

   git push origin feature-branch

5. **Submit a pull request**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [CoinGecko API](https://www.coingecko.com/en/api)
- [Chart.js](https://www.chartjs.org/)
- [Material-UI](https://mui.com/)
