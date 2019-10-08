import {oregon_county_pop} from './oregon_county_pop.js'

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
  
  returnArray = returnArray.slice(0, 17)

  return (returnArray)
}

export const get_oregon_county_pop_geo = () => {
  return (oregon_county_pop)
}