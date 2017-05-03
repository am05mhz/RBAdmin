@extends('layout')

@section('style')
<link rel="stylesheet" href="{{ url('css/icons.css') }}"/>
<link rel="stylesheet" href="{{ url('css/mikrotik.css') }}"/>
@endsection

@section('script')
<script src="{{ route('urls') }}"></script>
<script src="{{ url('js/lib/vuex.js') }}"></script>
<script src="{{ url('js/lib/vue-router.js') }}"></script>
<script src="{{ url('js/components.js') }}"></script>
<script src="{{ url('js/mikrotik.js') }}"></script>
@endsection

@section('content')
<div id="app">
	<navigation></navigation>
	<mikrotik @tool-click="toolClick" @save="save" @process="process"></mikrotik>
</div>
@endsection