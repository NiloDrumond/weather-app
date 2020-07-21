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

const sun = ['#FF512F', '#F09819'];
const moon = ['rgb(78, 84, 200)', 'rgb(143, 148, 251)'];
const clouds = ['#2193b0', '#6dd5ed'];
const rain = ['#5b86e5', '#36d1dc'];
const snow = ['#000428', '#004e92'];
const dusk = ['rgb(44, 62, 80)', 'rgb(253, 116, 108)'];

export function getBackground(id, sunrise, sunset) {
  moment.locale('pt-br');
  const now = moment().unix();
  if (id === 800) {
    return now < sunrise || now > sunset ? moon : sun;
  }
  switch (firstDigit(id)) {
    case 2:
      return rain;
    case 3:
      return rain;
    case 5:
      return rain;
    case 6:
      return snow;
    case 7:
      return dusk;
    case 8:
      return clouds;
    default:
      return now < sunrise || now > sunset ? moon : sun;
  }
}
