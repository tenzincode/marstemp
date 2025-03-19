# Marštemp

A React application that displays the latest weather data from Mars, specifically from the InSight lander at Elysium Planitia.

## Features

- Displays weather data from NASA's InSight Mars lander
- Responsive design using Bulma CSS framework
- Modern React implementation with hooks and functional components

## Technology Stack

- React 19.0.0
- React Router 6.22.2
- Axios for API requests
- Moment.js for date formatting
- Bulma CSS framework
- SASS for styling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```
git clone https://github.com/citizenofearth/marstemp.git
cd marstemp
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Build for Production

```
npm run build
```

## Project Structure

- `/public` - Static files
- `/src` - Source code
  - `/components` - React components
  - `/icons` - Icon assets
  - `/img` - Image assets
  - `App.js` - Main application component
  - `index.js` - Entry point

## API

This application uses NASA's InSight Mars Weather Service API to fetch weather data from Mars.

## License

This project is licensed under the MIT License.
