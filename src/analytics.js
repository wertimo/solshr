import ReactGA from 'react-ga';

export const initGA = () => {
  const trackingID = process.env.REACT_APP_GA_TRACKING_ID;
  if (trackingID) {
    ReactGA.initialize(trackingID);
  } else {
    console.warn('Google Analytics tracking ID is not set');
  }
}; 