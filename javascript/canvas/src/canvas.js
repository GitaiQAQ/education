var running = false;
var direction = 1;

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function determineDirection(boxX, canvasWidth)
{
	// Left = 0, right = 1
	if(direction === 1)
	{
		if(boxX > canvasWidth - 110)
		{
			return 0;
		}

		return 1;
	}
	else
	{
		if(boxX === 0)
		{
			return 1;
		}

		return 0;
	}

}

function moveLeft(boxX)
{
	return boxX - 1;
}

function moveRight(boxX)
{
	return boxX + 1;
}

function initAnimation()
{
	var animationCanvas = document.getElementById("animationCanvas");
	var animationContext = animationCanvas.getContext("2d");
	var boxX = 1;
	var boxY = 1;
	var boxWidth = 100;
	var boxHeight = 100;

	animationCanvas.width = boxWidth * 10;
	animationCanvas.height = boxHeight + 2;

	// Draw initial positioning
	animationContext.fillStyle = "grey";
	animationContext.fillRect(boxX, boxY, boxWidth, boxHeight);

	$("#buttonStartAnimation").click(function () {
		if(running)
		{
			running = false;
		}
		else { running = true; }

		while(running)
		{
			animationContext.clearRect(0, 0, animationCanvas.width, animationCanvas.height);

			switch(determineDirection(boxX, animationCanvas.width))
			{
				case 0:
					boxX = moveLeft(boxX);
					break;
				case 1:
					boxX = moveRight(boxX);
					break;
				default:
					break;
			}

			animationContext.fillRect(boxX, boxY, boxWidth, boxHeight);
			sleep(1000);
		}
	});
}