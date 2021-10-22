export const toFeet = (n) => {
  const realFeet = (n * 0.3937) / 12;

  const feet = Math.floor(realFeet);
  const inches = (realFeet - feet) * 12;
  let add = '';
  let realInches = Math.floor(inches);
  const fraction = inches - realInches;
  if (fraction > 0.25 && fraction < 0.75) {
    add = ' 1/2';
  }
  if (fraction >= 0.75) {
    realInches++;
  }
  return `${feet}′ ${realInches ? `${realInches}″` : ''} ${add}`;
};

export const scrollTo = (target, block = 'center') => {
  const section = document.querySelector(target);
  if (section) section.scrollIntoView({ behavior: 'smooth', block, inline: 'nearest' });
};
export const debounce = (func, timeout = 1500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};
