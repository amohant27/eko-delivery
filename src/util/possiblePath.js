// parsed inputGraph 
// A: { B: "1", C: "4", D: "10" }
// B: { E: "3" }
// C: { D: "4", F: "2" }
// D: { E: "1" }
// E: { B: "3", A: "2" }
// F: { D: "1" }

export default function getPossiblePaths(start, end, inputGraph, visitedNodes = '', cost = 0) {
    console.log(inputGraph)
    const edges = inputGraph[start]; 
    if (visitedNodes && start === end) {
        // We found the route
        console.log('we found the route'+ visitedNodes + end + '=' + cost)
        return visitedNodes + end + '=' + cost;
    }
    // if no edges are found for a node, we return
    if (!edges) {
        console.log('we hit deadend , all nodes visited')
        return '';
    }
    //take the last visited node 
    //Add to startNode to check if the new VisitNode is visited already 
    let lastNodeVisited = visitedNodes[visitedNodes.length - 1];
    let currNode = lastNodeVisited+start;
    
    if (visitedNodes.indexOf(currNode) >= 0) {
        console.log('this will go to infinite loop');
        return '';
    }

    //if  not visited , add in the curr visitNode
    visitedNodes += start;

    //Iterate through all stations and its possible edges 
    //set the edge as the new Start 
    // Filtering the  node which have deadend

    return Object.keys(edges).map((node) => {
        if (edges[node] === 0) {
            return '';
        }  
        const route = getPossiblePaths(node, end, inputGraph, visitedNodes, cost + edges[node] +':');
        return route;
    }).filter((empty) => !!empty).join(';'); 
}
