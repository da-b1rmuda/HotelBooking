//
// Field is empty check
//
export const isEmpty = (value, checkZero = false) => {
  if (value === '' || value === null || value === undefined) {
    return true;
  }
  if (checkZero) {
    if (value === 0) {
      return true;
    }
  }
  return false;
};

//
// Get color for tag
//
export const getColorTag = (status, field, allStatus) => {
  let color;
  // eslint-disable-next-line
  allStatus.map((item) => {
    if (item[field] === status) {
      color = item.color;
    }
  });
  return color;
};

//
// Get converted date
//
export const getConvertedDate = (date) => {
  let day = date.substr(8, 2);
  let month = date.substr(5, 2);
  let year = date.substr(0, 4);
  return day + '.' + month + '.' + year;
};

//
// Get list filter
//
// data - откуда берутся данные (ex. statusDeal)
// dataField - какое поле брать для листа фильтров (ex. status_deal)
export const getListFilter = (data, DataField) => {
  let tempFilter = [];
  let dataField = DataField;
  // eslint-disable-next-line
  data.map((item) => {
    tempFilter.push({ text: item[dataField], value: item[dataField] });
  });
  return tempFilter;
};

export const getEndingWords = (num) => {
  if (num % 10 === 1 && num % 10 !== 11 && num !== 11) {
    return 'комната';
  } else if (
    (num % 10 === 2 || num % 10 === 3 || num % 10 === 4) &&
    (num % 100 < 10 || num % 100 >= 20)
  ) {
    return 'комнаты';
  } else {
    return 'комнат';
  }
};
