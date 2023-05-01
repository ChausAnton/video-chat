import moment from 'moment';

export const range = (start, end) => {
  const result = [];

  for (let i = start; i < end; i++) {
    result.push(i);
  }

  return result;
};

export const formatDate = (
  date,
  formatTo = 'DD.MM.YYYY',
  formatFrom = 'YYYY-MM-DD HH:mm:ss',
) => {
  return !date ? '' : moment(date, formatFrom).format(formatTo);
};

export const formatDateForEvent = date => {
  return moment(formatDate(date, 'YYYY-MM-DD HH:mm', ''), 'YYYY-MM-DD HH:mm');
};
