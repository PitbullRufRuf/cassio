var canvas = document.getElementById("mycanvas");
var context = canvas.getContext("2d");
context.beginPath()

window.addEventListener('keydown', this.inputs);

keeper_image = document.getElementById("keeper");
ball_image = document.getElementById("ball");
goal_image = document.getElementById("goal");
diegosouza_image = document.getElementById("diegosouza")

win_image = document.getElementById("win");
vasco_image = document.getElementById("vasco");

score = 0;

keeperX = (canvas.width/2)-70;
keeperY = 150;

ballX = (canvas.width/2)-35;
ballY = 500;
ballSpeedY = 0;
ballSpeedX = 0;

timer = 0;

function draw()
{
	context.clearRect(0, 0, 1000, 600)

	if(score >= 10)
	{
		context.drawImage(win_image, 50, 50,);
	}

	if(score < 10){
		context.drawImage(goal_image, 200, 20, 600, 300);
		context.drawImage(keeper_image, keeperX, keeperY, 120, 180);
		context.drawImage(ball_image, ballX, ballY, 100, 100);
		context.drawImage(diegosouza_image, 550, 400, 300, 250)

		context.font = "20px Tahoma";
		context.fillText(score, 30, 30);
		context.fillText(timer/1000, 50, 50);
	}
	if(timer > 10000)
	{
		context.drawImage(vasco_image, 50, 50);
	}
}

function update()
{
	draw();
	setTimeout(update, 10);
	timer = timer + 10;

	// ball movement
	ballY = ballY + ballSpeedY;
	ballX = ballX + ballSpeedX;

	checkCollision();
}

function inputs(event)
{
	console.log(event.keyCode);
	// L -> 76
	// J -> 74
	// move to the left (decrease x)
	if (event.keyCode == 74)
	{
		keeperX = keeperX-5;
	}

	// move to the right (increase x)
	if(event.keyCode == 76)
	{
		keeperX = keeperX+5;
	}

	// kicking the ball
	if(event.keyCode == 32)
	{
		ballSpeedY = -5;
		ballSpeedX = (Math.random() * 2 - 1) * 5;
	}

	if(event.keyCode == 27)
	{
		ballY = 500;
		ballSpeedY = 0;
		ballX = (canvas.width/2)-35; // sends to the middle again
		ballSpeedX = 0;
	}
}

function checkCollision()
{
	if((ballX >= keeperX && ballX <= keeperX+120) || (keeperX >= ballX && keeperX <= ballX+100))
	{
		if((ballY >= keeperY && ballY <= keeperY+150) || (keeperY >= ballY && keeperY <= ballY+100))
		{
			reset();
			score = score + 1;
		}
	}
}

function reset()
{
	ballY = 500;
	ballSpeedY = 0;
	ballX = (canvas.width/2)-35; // sends to the middle again
	ballSpeedX = 0;
}

update();