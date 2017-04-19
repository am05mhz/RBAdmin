<html>
<head>
<style>
	canvas{
		width:100vw;
		height:100vh;
		object-fit: contain;
	}
	body{margin:0}
</style>
<script src="{{ url('js/lib/docready.js') }}"></script>
<script>

var cvs, ctx;

function draw(ctx){
	ctx.fillStyle = 'rgb(255, 0, 0)';
	ctx.fillRect(10, 10, 50, 50);

	ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
	ctx.fillRect(30, 30, 50, 50);
}

docReady(function(){
	cvs = document.querySelector('#canvas');
	if (cvs){
		ctx = cvs.getContext('2d');
		
		draw(ctx);
	}
})
</script>
</head>
<body>
<canvas id="canvas" width="1920" height="1080"></canvas>
</body>
</html>