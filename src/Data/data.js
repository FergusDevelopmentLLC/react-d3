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
      {"type":"Apples","count":50},
      {"type":"Oranges","count":30},
      {"type":"Pears","count":70},
      {"type":"Bananas","count":50},
      {"type":"Lemons","count":90},
      {"type":"Olives","count":50},
      {"type":"Avocados","count":60},
      {"type":"Grapes","count":120}
    ]
    setBarData(barData)
  }, []);
  
  return barData;
};

