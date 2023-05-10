const {NODE_ENV} = process.env;

const BASE_URL = NODE_ENV === 'production' 
  ? 'https://api.mesto.nikolaykrish.nomoredomains.icu/' 
  : 'http://localhost:3001/';

export default BASE_URL;
