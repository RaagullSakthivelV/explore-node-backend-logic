import { pool } from '../db_connection.js'
import polyline from '@mapbox/polyline'
import {getSearchStationsQuery} from './query.js'
import {getStationGaps,getStationsEnroute} from './helper.js'

export const getSuggestedChargeStations = async (req, res) => {
    try { 
        const {radius,encodedPolyline,initialRange,chargedRange,totalDistance} = req.body
        const coords = polyline.decode(encodedPolyline)
        const stationQuery = getSearchStationsQuery(
            coords,
            radius,
        );
        const stations = await pool.query(stationQuery)
        console.log('length of the stations',stations.rows.length)
        console.log('totol Distance',totalDistance)
        // console.log('stations',stations)
        let stationCoordinates = []
        for (let station in stations.rows) {
            // console.log('station:',station);
            stationCoordinates.push({
                "location":{
                  "latLng":{
                    "latitude":stations.rows[station]['latitude'],
                    "longitude":stations.rows[station]['longitude'],
                  }
                }
              })
        }
        // for (let stationCoordinate = 0; stationCoordinate < stationCoordinates.length; stationCoordinate++) {
        //     const element = stationCoordinates[stationCoordinate];
            
        // }
        console.log('stationCoordinates:',stationCoordinates)
        const stationGaps=await getStationGaps(stationCoordinates)
        for (let i = 0; i < stationGaps.length; i++) {
            const element = stationGaps[i];
        }
        console.log('stationGaps:',stationGaps);
        console.log('totalgaps:',stationGaps.reduce((a,b)=>{
            a=a+b
            return a
        }))

        const stationsToVisit=findStation(initialRange,chargedRange,stationGaps,stationCoordinates,totalDistance)
        const finalRoute=await getStationsEnroute(stationsToVisit)
        return res.status(200).json({
            error: 'false',
            code: 200,
            message: 'final route',
            data:{
                "allStations":stations.rows,
                finalRoute,
                stationsToVisit,

            },
        })
    }
    catch(e){
        return res.status(500).json({
            error: e.stack,
            code: 500,
            message: e.message
        })
    }
}

function findStation(initialRange, chargedRange, stationGaps, stationCoordinates,totalDistance){
    let rangeLeft = initialRange
    let stationsToVisit = []
    let distanceToNext;
    console.log('finding stations......')
    if(initialRange>totalDistance){
        console.log('No charging needed');
        return stationsToVisit;
    }
    for (let i = 0; i < stationGaps.length; i++) {
        distanceToNext = stationGaps[i]
        console.log('distanceToNext:',distanceToNext);
        console.log('rangeLeft:',rangeLeft-1000);
        // console.log('initialRange:',initialRange);
        if ((distanceToNext >= rangeLeft-1000) && i==0){
            console.log('cannot travel');
            break
        }
        else if(distanceToNext >= rangeLeft-1000){
            // console.log('rangeLeft:',rangeLeft-1000);
            stationsToVisit.push(stationCoordinates[i-1])
            rangeLeft = chargedRange
            console.log('range after charging');
            console.log('rangeLeft:',rangeLeft-1000,"distanceToNext",distanceToNext);
        } 
        rangeLeft = rangeLeft - distanceToNext
    }
    console.log('stationsToVisit:',stationsToVisit)
    return stationsToVisit;
}