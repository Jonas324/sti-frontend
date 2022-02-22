const express = require("express")
var favicon = require('serve-favicon')
var path = require('path')

const PORT = process.env.PORT || 3000

const app = express()
app.use('/healthcheck', require('./routes/healthcheck.routes'));

app.use(express.static('public'))

app.get('/', function(req, res){
    res.sendFile(__dirname + "/public/index.html")
})

app.post("/nextGeneration", function (req ,res){
    console.log("hello")
    headers={"http_status":200, "cache-control":  "no-cache"}
    body= nextGen(grid);
    
    res.set('Content-Type', 'application/json');
    res.status(200).send(body)
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