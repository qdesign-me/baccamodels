export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const convertMetric = (n, metric = 'feet') => {
  switch (metric) {
    case 'feet': {
      const realFeet = (n * 0.3937) / 12;

      const feet = Math.floor(realFeet);
      const inches = (realFeet - feet) * 12;
      let add = '';
      let realInches = Math.floor(inches);
      const fraction = inches - realInches;
      if (fraction > 0.25 && fraction < 0.75) {
        add = ' ½';
      }
      if (fraction >= 0.75) {
        realInches++;
      }
      return `${feet}′ ${realInches ? `${realInches}″` : ''} ${add}`;
    }
    case 'shoes': {
      const converter = {
        34: '4',
        35: '4 ½',
        36: '5',
        37: '6',
        38: '7 ½',
        39: '8',
        40: '8 ½',
        41: '9 ½',
        42: '10',
        43: '10 ½',
      };
      return converter[n] ?? n;
    }
  }
};

export const errorHandler = (cb) => {
  try {
    return cb();
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export const scrollTo = (target, block = 'center') => {
  const section = document.querySelector(target);
  if (section) section.scrollIntoView({ behavior: 'smooth', block, inline: 'nearest' });
};
