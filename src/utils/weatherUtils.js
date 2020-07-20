import moment from 'moment';
import 'moment/locale/pt-br';
import { firstDigit } from './Utils';

export function getMainTemp(temp) {
  const values = Object.values(temp);
  const totalValue = values.reduce((total, num) => total + num);
  return Math.trunc(totalValue / 4);
}

export function getIconName(id, sunrise, sunset) {
  moment.locale('pt-br');
  const now = moment().unix();
  if (id === 800) {
    return now < sunrise || now > sunset ? 'moon' : 'sun';
  }
  switch (firstDigit(id)) {
    case 2:
      return 'cloud-lightning';
    case 3:
      return 'cloud-drizzle';
    case 5:
      return 'cloud-rain';
    case 6:
      return 'cloud-snow';
    case 8:
      return 'cloud';
    default:
      return now < sunrise || now > sunset ? 'moon' : 'sun';
  }
}

export function getIconNameSimple(id) {
  switch (firstDigit(id)) {
    case 2:
      return 'cloud-lightning';
    case 3:
      return 'cloud-drizzle';
    case 5:
      return 'cloud-rain';
    case 6:
      return 'cloud-snow';
    case 8:
      return 'cloud';
    default:
      return 'sun';
  }
}
