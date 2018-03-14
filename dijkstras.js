const dijkstras = function (s, f, graph) {
    let costs = {
        [s]: 0,
        [f]: 100000000
    }
    let parents = {
        [s]: null,
        [f]: null
    }
    let fringe = []

    for (let child in graph[s]) {
        if (graph[s].hasProperty(child)){
            let distance = graph[s][child]
            costs[child] = distance
            fringe.push(child)
        }
    }

    while (fringe.length > 0) {
        let min = findMin(fringe, costs)
        let m = min[0]
        let mCost = min[1]
        fringe.splice(fringe.indexOf(m), 1)

        for (let neighbor in graph[m]) {
            if (!costs[neighbor]) {
                costs[neighbor] = mCost + graph[m][neighbor]
                fringe.push(neighbor)
                parents[neighbor] = m
            }
            else {
                costs[neighbor] = Math.min(costs[neighbor], mCost + graph[m][neighbor])
                parents[neighbor] = m
            }
        }
        console.log(costs)
    }

    let notFinished = true
    let node = f
    let path = []
    while (notFinished) {
        console.log(path, node)
        if (node === s) notFinished = false
        path.push(node)
        node = parents[node]
    }
    return [costs[f], path.reverse()]
}

function findMin(arr, costs) {
    let min = ['', 100000000]
    for (let i = 0; i < arr.length; i++) {
        if (costs[arr[i]] < min[1]) min = [arr[i], costs[arr[i]]]
    }
    return min
}
const problem = {
    Q: { A: 1, B: 10 },
    A: { Q: 1, C: 1, D: 1, B: 1 },
    B: { A: 8, D: 7 },
    C: { D: 4, T: 3 },
    D: { T: 1 },
    T: {}
};
dijkstras('Q', 'T', problem)