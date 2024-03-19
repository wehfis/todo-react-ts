const apiPort: string | number = process.env.API_PORT || 8000;
const apiAddress: string = process.env.API_ADDRESS || 'http://localhost';

const common = {
    apiAddress,
    apiPort,
    apiUrl: `${apiAddress}:${apiPort}`,
};

export default common;
