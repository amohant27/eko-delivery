
// input route Mao
export const inputRouteMap = ['AB1', 'AC4', 'AD10', 'BE3', 'CD4', 'CF2', 'DE1', 'EB3', 'EA2', 'FD1'];
// find the nodes from src-dest
export const onlyRoutes = inputRouteMap.map((item) => { return item.substring(0, 2) });
// find the start nodes from which one can start
var sources = inputRouteMap.map((item) => { return item.substring(0, 1); });
var edgesArr = {};
// Filtering the start nodes from which one can start - no duplicates
let uniqueSources = sources.filter((item, i, ar) => ar.indexOf(item) === i);

//Creating Array from with node(src) as 'key' and  value is an array (with all edges and cost) starting from Source
uniqueSources.forEach((startPos) => {
    edgesArr[startPos] = [];
    inputRouteMap.forEach((route) => {
        if (route.charAt(0) === startPos) {
            var newObj = {};
            newObj[route.substring(1, 2)] = route.substring(2, route.length);
            edgesArr[startPos].push(newObj);
        }
    })
});

//Convert  Array into an object from with node(src) as 'key' and  value is an Object (with all edges and cost) starting from Source
const getAllNodesObject = (obj) => {
    var finalNodeObj = {};
    Object.keys(obj).map((key) => {
        var eachObj = obj[key];
        var eachPair = {};
        for (var i = 0; i < eachObj.length; i++) {
            // eslint-disable-next-line 
            Object.keys(eachObj[i]).map((key) => {
                eachPair[key] = eachObj[i][key]
            })
        }
        finalNodeObj[key] = eachPair;
        return finalNodeObj;
    })
    return finalNodeObj;
};


export const parsedInput = getAllNodesObject(edgesArr);

