export const getSearchStationsQuery = (
  coords,
  radius
) => {
  if (!coords || coords.length < 1) {
    return;
  }

  const lineStr = getLineString(coords);
  let query = 
  `SELECT DISTINCT
    scs.id,
    scs.latitude,
    scs.longitude,
    scs.name 
  FROM saev_charge_station scs
  WHERE 
  ST_Within(
    ST_SetSRID(ST_MakePoint(scs.latitude, scs.longitude), 4326),
    (SELECT ST_Buffer(ST_MakePolygon('${lineStr}')::geography, ${radius})::geometry)
  );`
  return query;
};

const getLineString = (coords) => {
  let lineStr = coords.map((co, i) => {
    return (i === 0 ? "" : " ") + co[0] + " " + co[1];
  });
  lineStr = `LINESTRING(${lineStr}, ${coords[0][0]} ${coords[0][1]})`;
  return lineStr;
};
