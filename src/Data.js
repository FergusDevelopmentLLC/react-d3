import { useState, useEffect } from 'react';

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
};

export const barData = () => {
  
  const [barData, setBarData] = useState(null);
  
  useEffect(() => {
    let barData = [
      {"type":"Apples","count":1453},
      {"type":"Oranges","count":3638},
      {"type":"Pears","count":6963}
    ]
    setBarData(barData)
  }, []);
  
  return barData;
};

// {"type":"Apples","count":5},
// {"type":"Oranges","count":3},
// {"type":"Pears","count":7},
// {"type":"Bananas","count":5},
// {"type":"Tangerines","count":9},
// {"type":"Strawberries","count":5},
// {"type":"Avocados","count":6},
// {"type":"Eggs","count":12}