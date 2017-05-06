<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name', 'Lumen') }}</title>
	
	<link rel="stylesheet" href="{{ url('css/lib/ground.css') }}"/>
	@yield('style')
	
	<script src="{{ url('js/lib/essentials.min.js') }}"></script>
	<script src="{{ url('js/lib/moment.min.js') }}"></script>
	<script src="{{ url('js/lib/numeral.min.js') }}"></script>
	<script src="{{ url('js/lib/vue.js') }}"></script>
	@yield('script')
</head>
<body>
	@yield('content')
</body>
</html>