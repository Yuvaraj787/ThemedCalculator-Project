var display = $("#ans");
var nSym = [];
var stimes = 0;
const sysm = ['+',"-","*","/","=","Enter"];
const nums = ['0','1','2','3','4','5','6','7','8','9','.'];
var backSpaced = false;
var sound = new Audio("clicking.mp3");
$(".butn").on("click",function() {
    sound.play();
    var curChar = this.textContent;
    var need = display.text();
    if (curChar=='.' && display.text().slice(display.text().length-1)=='.') {
         display.text(need)
} else {
    display.text(need+curChar);
    }
})

$(".sbutn").on("click", function() {
    sound.play();
    stimes++;
    var cs = this.textContent;
    if (backSpaced) {
        display.text(display.text()+cs);
    }
    if (sysm.includes(display.text().slice(display.text().length-1))) {
        stimes--;
        nSym.pop();
        nSym.push(cs);
        display.text(display.text().slice(0,display.text().length-1)+cs);
        backSpaced = false;
    } else {
        backSpaced = false;
        nSym.push(cs);
        check();
        if (cs=="=") {
            display.text(display.text())
        } else {
        display.text(display.text()+cs);} 
}})
function check() {
    
    if (stimes!=0 && stimes!=1) {
        if (nSym[stimes-2]=='+') {
            var alist = display.text().split("+");
            var ans = parseFloat(alist[0])+parseFloat(alist[1]);
        } else if (nSym[stimes-2]=='-') {
            var alist = display.text().split("-");
            var ans = parseFloat(alist[0])-parseFloat(alist[1]);
        } else if (nSym[stimes-2]=='*') {
            var alist = display.text().split("*");
            var ans = parseFloat(alist[0])*parseFloat(alist[1]);
        } else if (nSym[stimes-2]=='/') {
            var alist = display.text().split("/");
            var ans = parseFloat(alist[0])/parseFloat(alist[1]);
        }
        display.text(ans);
    }

}
$(".del").on("click",function() {
    sound.play();
    display.text(" ");
    nSym = [];
    stimes = 0;
})
$(".back").on("click",function() {
    sound.play();
    var removed = display.text().slice(-1);
    if (sysm.includes(removed)) {
        stimes--;
        nSym.pop();
        backSpaced = true;
        display.text(display.text().slice(0,-1));
    } else {
        display.text(display.text().slice(0,-1));
    }
})

// code to operate keyboard keys
$(document).on("keypress",function() {
    sound.play();
    var curChar = event.key;
    var cs = curChar;
    if (cs==".") {
        mkAnimation("dot");
        var need = display.text();    
        if (curChar=='.' && display.text().slice(display.text().length-1)=='.') {
            display.text(need)
        } else {
       display.text(need+curChar);
       }
        }  else if (nums.includes(curChar)) {
        mkAnimation(curChar);
        var need = display.text();    
        display.text(need+curChar);
    } else if (sysm.includes(curChar)) {
    stimes++;

    if (backSpaced) {
        display.text(display.text()+cs);
    }
    
    if (sysm.includes(display.text().slice(display.text().length-1))) {
        stimes--;
        nSym.pop();
        nSym.push(curChar);
        display.text(display.text().slice(0,display.text().length-1)+cs);
        backSpaced = false;
        if (curChar=="+") {
            mkAnimation("plus");
        } else if (curChar=="-") {
            mkAnimation("minus");
        } else if (curChar=="*") {
            mkAnimation("into");
        } else if (curChar=="/") {
            mkAnimation("by");
        }
    } else {
        backSpaced = false;
        if (cs=="Enter") {
            cs="=";
        }
        nSym.push(cs);
        check();
        if (cs=="=") {
            display.text(display.text());
        } else {
        display.text(display.text()+cs);} 
}
        }
}
)

$(document).on("keydown",function() {
    sound.play();
    var bigKey = event.key;
    mkAnimation(bigKey);
    if (bigKey == "Backspace") {
        var removed = display.text().slice(-1);
        if (sysm.includes(removed)) {
            stimes--;
            nSym.pop();
            backSpaced = true;
            display.text(display.text().slice(0,-1));
        } else {
            display.text(display.text().slice(0,-1));
        }   
    } 
    if (bigKey == "Delete") {
        display.text(" ");
        nSym = [];
        stimes = 0;       
    } 
})

function mkAnimation(e) {
      $("."+e).addClass("pressed");
      setTimeout(function() {
          $("."+e).removeClass("pressed");
      },100)
}
