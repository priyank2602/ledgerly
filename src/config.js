// Runtime configuration. Values come from the environment so nothing is hard-coded.
export const PORT = Number(process.env.PORT || 4000);
export const API_URL = process.env.LEDGERLY_API_URL || `http://localhost:${PORT}`;
export const TAX_RATE = 0.2; // UK VAT
export const CURRENCY = 'GBP';
