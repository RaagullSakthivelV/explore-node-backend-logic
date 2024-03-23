import express from 'express';

let response={
    "routes": [
        {
            "legs": [
                {
                    "distanceMeters": 9357
                },
                {
                    "distanceMeters": 417
                },
                {
                    "distanceMeters": 1870
                }
            ],
            "distanceMeters": 11644,
            "duration": "829s"
        }
    ]
}
const gapsMap = response['routes']['0']['legs']
function getGaps(){
    let gapsList = []
    for (let gapNumber = 0; gapNumber < gapsMap.length; gapNumber++) {
        gapsList.push(gapsMap[gapNumber]['distanceMeters']);
    }
    return gapsList;
}

console.log(getGaps())