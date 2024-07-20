# Crypto Charts Dashboard

Crypto Charts Dashboard is a React-based web application that allows users to view and interact with cryptocurrency data. The dashboard provides a list of trending cryptocurrencies in a carousel format, a table with paginated cryptocurrency data, and detailed information about each cryptocurrency including a description, market cap rank, and a chart.

## Features

- **Trending Cryptocurrencies Carousel:** View a list of trending cryptocurrencies.
- **Paginated Cryptocurrencies Table:** Browse all cryptocurrencies with pagination.
- **Detailed Cryptocurrency Information:** View detailed information about each cryptocurrency including a description, market cap rank, and a chart.
- **Chart Display:** Visualize cryptocurrency data in a graphical format using Chart.js.

## Tech Stack

- **HTML**
- **CSS**
- **JavaScript**
- **React**
- **Chart.js**
- **Material-UI:** For styling and UI components.

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/crypto-charts-dashboard.git
   cd crypto-charts-dashboard
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the development server:**

   ```sh
   npm start
   ```

4. **Open the application:**
   - Navigate to `http://localhost:3000` in your web browser.

## Running the Project on Your Local PC

To run this project on your local PC, follow these steps:

1. **Ensure you have Node.js installed:**

   - Download and install Node.js from the [official website](https://nodejs.org/).

2. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/crypto-charts-dashboard.git
   cd crypto-charts-dashboard
   ```

3. **Install project dependencies:**

   ```sh
   npm install
   ```

4. **Start the development server:**

   ```sh
   npm start
   ```

5. **Access the application:**
   - Open your web browser and navigate to `http://localhost:3000`.

## API

The application fetches data from the CoinGecko API. Below are some of the endpoints used:

- **Trending Coins:**

  ```sh
  https://api.coingecko.com/api/v3/coins/markets?vs_currency={currency}&order=gecko_desc&per_page=10&page=1&sparkline=false
  ```

- **Coin List:**

  ```sh
  https://api.coingecko.com/api/v3/coins/markets?vs_currency={currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false
  ```

- **Single Coin:**
  ```sh
  https://api.coingecko.com/api/v3/coins/{id}
  ```
- **Historic Chart:**
  ```sh
  https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}
  ```

## Usage

### Viewing Trending Cryptocurrencies

- The homepage displays a carousel with the top trending cryptocurrencies.

### Viewing All Cryptocurrencies

- There's a section to view a paginated table of all available cryptocurrencies.
- Use the search bar to filter cryptocurrencies by name or symbol.

### Viewing Detailed Cryptocurrency Information

- Click on any cryptocurrency in the table to view detailed information about that cryptocurrency.
- The detailed view includes a description, market cap rank, and a chart visualizing the cryptocurrency's data.

## Contributing

1. **Fork the repository**
2. **Create a new branch:**
   ```sh
   git checkout -b feature-branch
   ```
3. **Commit your changes:**
   ```sh
   git commit -m 'Add some feature'
   ```
4. **Push to the branch:**
   ```sh
   git push origin feature-branch
   ```
5. **Submit a pull request**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [CoinGecko API](https://www.coingecko.com/en/api)
- [Chart.js](https://github.com/reactchartjs/react-chartjs-2)
- [Material-UI](https://mui.com/)
