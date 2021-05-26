const scrape =require('./scrape.js')
const colors = require('colors');
var keypress = require('keypress');
var clear = require("cli-clear");
function terminalMenu(){
  scrape().then((content)=>{
    let index=0;
    
    function printContents(content){
      process.stdout.write('\033[2J');
      process.stdout.write('\u001b[H\u001b[2J\u001b[3J');
      console.log("EKSI GUNDEM [arrow keys]  [enter]");
      for(var i =0 ; i<content.length;i++){
           if(index===i){
            console.log(content[i].topic.blue) ;
           }else{
            console.log(content[i].topic);
           }
        }
    }
    printContents(content);
    
    keypress(process.stdin);

    // listen for the "keypress" event
    process.stdin.on('keypress', function (ch, key) {
        
      if ( key.name == 'down') {
        if(index<content.length){
          index=index+1;
        }else{
          index=0;
        }
        
       
        printContents(content);
      }
      if ( key.name == 'up') {
        if(index>0){
          index=index-1;
        }else{
          index=content.length-1;
        }
        
       
        printContents(content);
      }
      if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
      }


    });
    
    process.stdin.setRawMode(true);
    process.stdin.resume();



});
}
 terminalMenu();

