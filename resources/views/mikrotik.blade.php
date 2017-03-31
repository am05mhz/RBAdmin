@extends('layout')

@section('style')
<link rel="stylesheet" href="{{ url('css/mikrotik.css') }}"/>
@endsection

@section('script')
<script src="{{ route('urls') }}"></script>
<script src="{{ url('js/components.js') }}"></script>
<script src="{{ url('js/mikrotik.js') }}"></script>
@endsection

@section('content')
<div id="app">
	<navigation :items="navigation"></navigation>
	<mikrotik :tabs="tabs" :active-tab="activeTab" :items="items" @tab-click="tabClick"></mikrotik>
</div>
@endsection