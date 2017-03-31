@extends('layout')

@section('style')
<link rel="stylesheet" href="{{ url('css/login.css') }}"/>
@endsection

@section('script')
<script src="{{ url('js/login.js') }}"></script>
@endsection

@section('content')
<div id="login">
	<login-form url="{{ route('login') }}" method="post" title="Login Mikrotik"></login-form>
</div>
@endsection