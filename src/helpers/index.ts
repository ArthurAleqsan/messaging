import accounting from 'accounting';
import configs, { currencySymbols } from './configs';

export const getCurrencySymbol: any = (currency: string): string => currencySymbols[currency] || '';

export const formatCurrency: any = (amount: string, currency: string) => {
  if (currency === 'FPP' && Number(amount) >= 0) {
    return amount;
  }
  return accounting.formatMoney(
    amount,
    configs.currencySymbol ? configs.currencySymbol + ' ' : getCurrencySymbol(currency) + ' '
  );
};

export const formatBalance = (amount: string, currency: string): string => {
  return getCurrencySymbol(currency) + ' ' + parseFloat(parseFloat(amount).toFixed(2));
};

export const getMissionPrize = (data: any, t: any): string => {
  if (!data) return '';
  const { amount, currency, type, message } = data;
  switch (type) {
    case 'tourTicket':
      return t('wonTournamentTicket', { tournament: message?.params?.tourInstanceName || 'tournament' });
    case 'money':
      return formatCurrency(amount, currency);
    case 'freespins':
      return t('freespins');
    default:
      return '';
  }
};
