import polyline from '@mapbox/polyline'
const getLineString = (coords) => {
    console.log(coords.length)
    let lineStr = coords.map((co, i) => {
      return (i === 0 ? "" : " ") + co[0] + ", " + co[1];
    });
    console.log(lineStr)
    console.log(lineStr.length)
    lineStr = `LINESTRING(${lineStr})`;
    return lineStr;
  };


console.log(getLineString(polyline.decode('o}ecAmjmvMAsZVa@BiZFqDVqDZqDz@eLD{EG{JD_BH_BLgBT}AzBaJt@wCIk@nGwV')));