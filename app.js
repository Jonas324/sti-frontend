const express = require("express")
var favicon = require('serve-favicon')
var path = require('path')
var bodyParser = require('body-parser')


const PORT = process.env.PORT || 3000

const app = express()

let COLS = 0
let ROWS = 0

/* function buildGrid() {
    return new Array(COLS).fill(null)
    .map(() => new Array(ROWS).fill(null)
    .map(() => Math.floor(Math.random() * 2)));
}

let grid = buildGrid(); */

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/healthcheck', require('./routes/healthcheck.routes'));

app.use(express.static('public'))

app.get("/healthcheck", function (req ,res){
    headers={"http_status":200, "cache-control":  "no-cache"}
    body = nextGen(grid)
    res.set('Content-Type', 'application/json');
    res.status(200).send(body)
 })

 app.post("/nextgen", function (req ,res){
    headers={"http_status":200, "cache-control":  "no-cache"}
    res.set('Content-Type', 'application/json');
    console.log("******************************************")
    console.log(req.body)

    COLS =  req.query.COLS
    ROWS = req.query.ROWS

    console.log(COLS)
    console.log(ROWS)

    grid =  JSON.parse(req.body)

    console.log(grid)

    let data = nextGen(grid)

    console.log("**********")

    
    res.status(200).send(JSON.stringify(data))
 })

app.listen(PORT, function(){
    console.log(`Server stated on port ${PORT}`)
})

function nextGen(grid) {
    const nextGen = grid.map(arr => [...arr]);

    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];
            let numNeighbours = 0;
            for (let i = -1; i < 2; i++){
                for(let j = -1; j < 2; j++){
                    if (i=== 0 && j === 0){
                        continue;
                    }
                    const x_cell = col + i;
                    const y_cell = row + j;

                    if(x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {
                        const currentNeighbour = grid[col + i][row + j];
                        numNeighbours += currentNeighbour;

                    }
                }
            }
            //rules
            if (cell === 1 && numNeighbours < 2) {
                nextGen[col][row] = 0;
            } else if  (cell === 1 && numNeighbours > 3) {
                nextGen[col][row] = 0;
            } else if (cell === 0 && numNeighbours === 3) {
                nextGen[col][row] = 1;
            }
        }
    }
    return nextGen;
}
