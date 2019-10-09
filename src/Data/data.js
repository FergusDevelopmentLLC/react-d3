import { oregon_county_pop } from "./oregon_county_pop.js";

export const oregon_county_pop_data = () => {
  let returnArray = [];

  for (let f of oregon_county_pop.features) {
    let returnItem = {};
    returnItem.id = f.properties.geoid;
    returnItem.type = f.properties.name;
    returnItem.count = f.properties.popsqmi;
    returnArray.push(returnItem);
  }

  returnArray.sort((a, b) => {
    return a.count - b.count;
  });

  returnArray.reverse();

  returnArray = returnArray.slice(0, 17);

  return returnArray;
};

export const oregon_county_pop_geo_data = () => {
  return oregon_county_pop;
};

const getGreatestCommonDenomOf = (x, y) => {
  if (typeof x !== 'number' || typeof y !== 'number') return false;
  x = Math.abs(x);
  y = Math.abs(y);
  while (y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
};

export const test_scatter_data = () => {

  let data = [];
  data.push({ x: 0, y: 1 });
  data.push({ y: 1, y: 1 });
  for (let i = 2; i <= 500; i++) {
    let s = {};
    s.x = i;
    let gcd = getGreatestCommonDenomOf(s.x, data[i - 1].y);
    if (gcd > 1) s.y = data[i - 1].y / gcd;
    else s.y = data[i - 1].y + i + 1;
    data.push(s);
  }
  return data;

} 

export const test_bar_data = () => {

  let barData = [
    {"id":1,"type":"Apples","count":50},
    {"id":2,"type":"Oranges","count":30},
    {"id":3,"type":"Pears","count":70},
    {"id":4,"type":"Bananas","count":50},
    {"id":5,"type":"Lemons","count":90},
    {"id":6,"type":"Olives","count":50},
    {"id":7,"type":"Avocados","count":60},
    {"id":8,"type":"Grapes","count":120}
  ]
  
  return barData

}