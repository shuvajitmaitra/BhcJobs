const REGION_TO_CURRENCY: Record<string, string> = {
  AE: 'AED',
  AU: 'AUD',
  BD: 'BDT',
  CA: 'CAD',
  CH: 'CHF',
  CN: 'CNY',
  DE: 'EUR',
  ES: 'EUR',
  FR: 'EUR',
  GB: 'GBP',
  HK: 'HKD',
  IN: 'INR',
  IT: 'EUR',
  JP: 'JPY',
  KW: 'KWD',
  MY: 'MYR',
  NP: 'NPR',
  OM: 'OMR',
  PK: 'PKR',
  QA: 'QAR',
  SA: 'SAR',
  SE: 'SEK',
  SG: 'SGD',
  TH: 'THB',
  TR: 'TRY',
  US: 'USD',
};

export const getDeviceLocale = () => {
  // return Intl.DateTimeFormat().resolvedOptions().locale || 'en-BD';
  return 'en-BD';
};

export const getCurrencyCodeFromLocale = (locale = getDeviceLocale()) => {
  const regionMatch = locale.match(/-([A-Z]{2})(?:-|$)/i);
  const region = regionMatch?.[1]?.toUpperCase();

  if (region && REGION_TO_CURRENCY[region]) {
    return REGION_TO_CURRENCY[region];
  }

  if (locale.toLowerCase().startsWith('bn')) {
    return 'BDT';
  }

  return 'USD';
};

export const formatCurrency = (
  amount: number,
  currency: string,
  locale = getDeviceLocale(),
) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};
