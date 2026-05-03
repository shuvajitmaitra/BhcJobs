import Toast from 'react-native-toast-message';
import { getDeviceLocale } from './currency';

export const withOpacity = (hexColor: string, opacity: number) => {
  let hex = hexColor.replace('#', '').trim();

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(c => c + c)
      .join('');
  }

  if (hex.length === 8) {
    hex = hex.slice(0, 6);
  }

  if (hex.length !== 6) {
    return hexColor;
  }

  const alpha = Math.round(Math.min(1, Math.max(0, opacity)) * 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase();

  return `#${hex.toUpperCase()}${alpha}`;
};

const STATIC_EXCHANGE_RATES: Record<string, Record<string, number>> = {
  SAR: {
    BDT: 33,
  },
};

type TConvertCurrencyAmountParams = {
  amount?: number | null;
  currentCurrency?: string | null;
  localCurrency?: string | null;
  dynamicRate?: number | null;
  locale?: string;
};
export const showToast = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  Toast.show({
    type: 'success',
    text1: title || 'Hello',
    text2: description,
    visibilityTime: 1000,
    position: 'bottom',
  });
};
export const formatCurrencyCodeAmount = (
  amount: number,
  currency: string,
  locale = 'en-BD',
) => {
  if (!amount) {
    return '';
  }
  return `${currency.toUpperCase()} ${Math.round(amount).toLocaleString(
    locale,
  )}`;
};

export const convertCurrencyAmount = ({
  amount,
  currentCurrency,
  localCurrency,
  dynamicRate,
  locale = 'en-BD',
}: TConvertCurrencyAmountParams) => {
  if (typeof amount !== 'number') {
    return null;
  }

  const fromCurrency = currentCurrency?.toUpperCase();
  const toCurrency = localCurrency?.toUpperCase();

  if (!fromCurrency || !toCurrency) {
    return null;
  }

  if (fromCurrency === toCurrency) {
    return formatCurrencyCodeAmount(amount, toCurrency, locale);
  }

  const rate =
    dynamicRate ?? STATIC_EXCHANGE_RATES[fromCurrency]?.[toCurrency] ?? null;

  if (!rate) {
    return null;
  }

  return formatCurrencyCodeAmount(amount * rate, toCurrency, locale);
};

export const getDeadlineText = (expiry?: string) => {
  console.log('expiry', JSON.stringify(expiry, null, 2));
  if (!expiry) {
    return 'Not specified';
  }

  const date = new Date(expiry);

  if (Number.isNaN(date.getTime())) {
    return expiry;
  }

  return new Intl.DateTimeFormat(getDeviceLocale(), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};
