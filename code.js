/* var ran = Math.floor(Math.random()*5);
var loc1 = ran;
var loc2 = loc1+1;
var loc3 = loc1+2;
var guess;
var hit = 0;
var guesses = 0;
var isShunk = false;
while (isShunk == false){
	guess = prompt("San sang , nham (go 0 - 7)");
	if (guess<0 || guess>7){
		alert("Vui long nhan so hop le");
	}	else {
		guesses = guesses + 1;
	}
	if (guess == loc1){
		alert("HIT");
		hit = hit + 1;
	} else if (guess == loc2){
		alert("HIT");
		hit = hit + 1;
	} else if (guess == loc3){
		alert("HIT");
		hit = hit + 1;
	}
	console.log(loc1);
	if (hit == 3){
		isShunk = true;
		alert("Thuyen da bi ha");
	}
} */

var view={
	DispMes: function(msg){
		var mesArea= document.getElementById("mesArea");
		mesArea.innerHTML= msg;
	},
	DispHit: function(hit){
		var cell= document.getElementById(hit);
		cell.setAttribute("class","hit");
	},
	DispMiss: function(miss){
		var cell= document.getElementById(miss);
		cell.setAttribute("class","miss");
	}
};
var mis=[];
var model={
	boardSize: 7,
	numShip: 3,
	shipSunk: 0,
	ShipLeng: 3,
	ships: [ {loc:[0,0,0],	hit:["","",""]},
			{loc:[0,0,0],	hit:["","",""]},
			{loc:[0,0,0],	hit:["","",""]}],
	fire:function(guess){
		var isHit=0;
		for (var i=0;i<this.numShip;i++){
			var ship=this.ships[i];
			var index = ship.loc.indexOf(guess);
			/* for (var j=0;j<this.ShipLeng;j++){
				if (ship.loc[j]===guess){
					ship.hit[j]="hit";
					view.DispMes("Da trung muc tieu");
					isHit=1;
				} 
			} */
			if (index>=0){
				ship.hit[index]="hit";
				view.DispMes("Da trung muc tieu");
				isHit=1;
				//this.Shows();
				view.DispHit(guess);
				return;
			}
		}
		if (isHit===0)
			mis.push(guess);
		//this.Shows();
		view.DispMes("Trat lat");
		view.DispMiss(guess);
	},
	Shows:function(){
		for (var i=0;i<this.numShip;i++){
			var ship=this.ships[i];
			for (var j=0;j<this.ShipLeng;j++){
				if(ship.hit[j]==="hit")
				view.DispHit(ship.loc[j]);
			}
		}
		//for(var i=0;i<mis.length;i++){
		//	view.DispMiss(mis[i]);
		//}
		
	},
	genShip:function(){
		var dir=Math.floor(Math.random()*2);
		var row,col;
		var newShip=[];
		if (dir===1){
			row= Math.floor(Math.random()*(this.boardSize-this.ShipLeng+1));
			col= Math.floor(Math.random()*this.boardSize);
			for (var i=0;i<this.ShipLeng;i++)
				newShip.push((row+i)+""+col);
		} else {
			col= Math.floor(Math.random()*(this.boardSize-this.ShipLeng+1));
			row= Math.floor(Math.random()*this.boardSize);
			for (var i=0;i<this.ShipLeng;i++)
				newShip.push(row+""+(col+i));
		}
		return newShip;
	},
	
	coli:function(loc){
		for (var i=0;i<this.numShip;i++){
			var ship=this.ships[i];
			for (var j=0;j<loc.length;j++)
				if (ship.loc.indexOf(loc[j])>=0)
					return true;
		}
		return false;
	},
	genShipLoc:function(){
		for(var i=0;i<this.numShip;i++){
			var ship=this.genShip();
			var test =this.coli(ship);
			console.log(test+"...ship thu "+i);
			while(this.coli(ship)){
				ship=this.genShip();
			}
			this.ships[i].loc=ship;
			console.log(ship);
		}
	}
};


var control={
	NumGuess: 0,
	process:function(guess){
		var loc=tranGuess(guess);
		if (loc){
			model.fire(loc);
			this.NumGuess ++; 
		}
		//console.log(this.NumGuess);
	}
};

function tranGuess(guess){
	var apha=["A","B","C","D","E","F","G"];
	if (guess===null || guess.length !== 2){
		view.DispMes("Hay nhap tai toa do");
	} else {
		var column = guess.charAt(0);
		column = column.toUpperCase();
		var row=apha.indexOf(column);
		if (guess.charAt(1)>=0 && guess.charAt(1)<model.boardSize && row>=0 && row<model.boardSize){
			return column=row+guess.charAt(1);
		} else {
			view.DispMes("Nhap lai toa do: !!!");
			return null;
		}
	}
};

function handleFB(){
	var guessInput=document.getElementById("guessInput");
	var guess= guessInput.value;
	control.process(guess);
	guessInput.value= "";
};

function handleKB(e){
	var fireButton= document.getElementById("fire");
	if (e.keyCode===13){
		fireButton.click();
		return false;
	}
};

function init(){
	var fireButton= document.getElementById("fire");
	fireButton.onclick= handleFB;
	var guessInput= document.getElementById("guessInput");
	guessInput.onkeypress= handleKB;
	model.genShipLoc();
};

window.onload= init;




/* mis.push("31");
	
Show(ship1);
Show(ship2);
Show(ship3); */
/* view.DispHit("15");
view.DispHit("36");
view.DispMiss("51");
view.DispMiss("43");
view.DispMiss("32"); */
