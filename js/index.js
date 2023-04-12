
function main(){

    //DOM References and Global variables
    let squares = [];
    const width = 4;
    let scoreval = 0 ;
    const score = document.querySelector("#score");
    const scoreContainer = document.querySelector(".score-container")
    const gameContainer = document.querySelector(".game-container");
    
    //Moves value towards right
    function moveRight(){
        for(let i = 0; i < 16;i++){
            if(i % 4 === 0){
                
                //Get all columns in a row separately
                let one = squares[i].innerHTML;
                let two = squares[i+1].innerHTML;
                let three = squares[i+2].innerHTML;
                let four = squares[i+3].innerHTML;
                let row = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)];
                
                //filter row having values for summation and fill rest with 0's  
                let filteredRow = row.filter(num=>num);
                let missingCount = 4 - filteredRow.length;
                let zeros = Array(missingCount).fill(0);
                let newRow = zeros.concat(filteredRow);
                
                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
    }

    function moveLeft(){
        
        for(let i = 0; i < 16;i++)
        {
            if(i % 4 === 0){
                //Get all columns in a row separately
                let one = squares[i].innerHTML;
                let two = squares[i+1].innerHTML;
                let three = squares[i+2].innerHTML;
                let four = squares[i+3].innerHTML;
                let row = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)];
                
                //filter row having values for summation and fill rest with 0's  
                let filteredRow = row.filter(num=>num);
                let missingCount = 4 - filteredRow.length;
                let zeros = Array(missingCount).fill(0);
                let newRow = filteredRow.concat(zeros);
                
                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
    }
    
    function moveDown(){
        
        for(let i = 0;i < width;i++){
            //store values of each set of columns
            let colOne = squares[i].innerHTML;
            let colTwo = squares[i + width].innerHTML;
            let colThree = squares[i+ (width * 2)].innerHTML;
            let colFour = squares[i+ (width * 3)].innerHTML;
            let column = [parseInt(colOne),parseInt(colTwo),parseInt(colThree),parseInt(colFour)];
            
            let filteredColumn = column.filter(num=>num);
            let missingCount = 4 - filteredColumn.length;
            let zeros = Array(missingCount).fill(0);
            let newColumn = zeros.concat(filteredColumn);
            
            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i+ (width * 2)].innerHTML = newColumn[2];
            squares[i+ (width * 3)].innerHTML = newColumn[3];
        }
    }
    
    function moveUp(){
        
        for(let i = 0;i < width;i++){
            //store values of each set of columns
            let colOne = squares[i].innerHTML;
            let colTwo = squares[i + width].innerHTML;
            let colThree = squares[i+ (width * 2)].innerHTML;
            let colFour = squares[i+ (width * 3)].innerHTML;
            let column = [parseInt(colOne),parseInt(colTwo),parseInt(colThree),parseInt(colFour)];
            
            let filteredColumn = column.filter(num=>num);
            let missingCount = 4 - filteredColumn.length;
            let zeros = Array(missingCount).fill(0);
            let newColumn = filteredColumn.concat(zeros);
            
            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i+ (width * 2)].innerHTML = newColumn[2];
            squares[i+ (width * 3)].innerHTML = newColumn[3];
        }
    }
    
    function generate(){
        
        //This Function will generate 2 at random places on the board
        let random = Math.floor(Math.random()* squares.length);
        if(squares[random].innerHTML == 0){
            squares[random].innerHTML = 2;
            checkForGameOver();
        }
        
        else{
            generate(squares);
        }
    }
    
    function combineColumn(){
        // Add columns together if they are equal
        for(let i = 0; i < 12; i++){
            if(squares[i].innerHTML === squares[i+width].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i+width].innerHTML = 0;
                scoreval+=combinedTotal; 
                score.innerHTML = scoreval;
            }
        }
        checkForWin();
    }
    
    function combineRow(){
        //Add Rows if they are equal
        for(let i = 0;i < 15;i++){
            if(squares[i].innerHTML === squares[i+1].innerHTML)
            {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i+1].innerHTML = 0;
                scoreval+=combinedTotal;
                score.innerHTML =scoreval;

            }
        }
        checkForWin();
    }
    
    function createBoard(gameContainer){
        // Creates Gameboard with values.  
        for(let i = 1;i <= width*width;i++){
            valueDiv = document.createElement("div");
            valueDiv.innerHTML = 0;
            gameContainer.appendChild(valueDiv);
            squares.push(valueDiv);
        }
        //Place 2's on random places on the board
        generate(squares);
        generate(squares);
    }
    
    //Event handler for keyboard events.
    function control(e){
        if(e.keyCode == 39){
            keyRight();
        }
        
        else if(e.keyCode == 37){
            keyLeft();
        }
        else if(e.keyCode == 38){
            keyUp();
        }
        
        else if(e.keyCode == 40){
            keyDown();
        }}

        function keyUp(){
            moveUp();
            combineColumn();
            moveUp();
            generate();
        }
        
        function keyRight(){
            moveRight();
            combineRow();
            moveRight();
            generate();
        }
        
        function keyLeft(){
            moveLeft();
            combineRow();
            moveLeft();
            generate();
        }
        
        function keyDown(){
            moveDown();
            combineColumn();
            moveDown();
            generate();
        }
        
        function checkForGameOver(){
            //Checks whether all rows are filled or not.
            let zeros = 0;
            for(let i = 0;i < squares.length;i++){
                if(squares[i].innerHTML ==0){
                    zeros++;
                }
            }
            if(zeros == 0){
                alert("Game Over!!!");    
                scoreContainer.innerHTML = "Game Over,Refresh page to restart";
                document.removeEventListener('keyup',control);
            }
        }

        function checkForWin(){
            //Check For Game Win!!
            for(let i = 0;i < squares.length;i++)
            {
                if(squares[i].innerHTML == 2048)
                {
                    scoreContainer.innerHTML = "You Won!!!";
                    document.removeEventListener("keyup",control);
                }
            }


        }
        document.addEventListener('keyup',control)
        createBoard(gameContainer);
}

// Main function should be called when page is fully loaded.
document.addEventListener('DOMContentLoaded',main);