import { useState, useEffect } from 'react';
const oregon_county_pop = require('./oregon_county_pop.json');

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

export const scatterData = () => {
  
  const [data, setData] = useState(null);
  
  useEffect(() => {
    let data = [];
    data.push({ n: 0, a: 1 });
    data.push({ n: 1, a: 1 });
	  for (let i = 2; i <= 850; i++) {
      let s = {};
      s.n = i;
      let gcd = getGreatestCommonDenomOf(s.n, data[i - 1].a);
      if (gcd > 1) s.a = data[i - 1].a / gcd;
      else s.a = data[i - 1].a + i + 1;
      data.push(s);
    }
    setData(data)
  }, []);
  
  return data;
}

export const barData = () => {
  
  const [barData, setBarData] = useState(null);
  
  useEffect(() => {
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
    setBarData(barData)
  }, []);
  
  return barData;
}

export const scatterDataNoEffect = () => {
  
  let data = [];
  data.push({ n: 0, a: 1 });
  data.push({ n: 1, a: 1 });
  for (let i = 2; i <= 500; i++) {
    let s = {};
    s.n = i;
    let gcd = getGreatestCommonDenomOf(s.n, data[i - 1].a);
    if (gcd > 1) s.a = data[i - 1].a / gcd;
    else s.a = data[i - 1].a + i + 1;
    data.push(s);
  }
  return data;
}

export const get_oregon_county_pop = () => {
  
  let returnArray = []

  for(let f of oregon_county_pop.features) {
    let returnItem = {}
    returnItem.id = f.properties.geoid
    returnItem.type = f.properties.name
    returnItem.count = f.properties.popsqmi
    returnArray.push(returnItem)
  }

  returnArray.sort((a, b) => {
    return a.count - b.count
  })

  returnArray.reverse()
  
  //returnArray = returnArray.slice(0, 15)

  return (returnArray)
}

export const get_oregon_county_pop_geo = () => {
  return (oregon_county_pop)
}