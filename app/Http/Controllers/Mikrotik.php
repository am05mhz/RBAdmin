<?php

namespace App\Http\Controllers;

class Mikrotik extends Controller
{
	
	protected $rb;

    public function __construct(){
		//$this->middleware('auth', ['except' => ['index', 'html']]);
		$this->middleware('auth');
		$this->rb = new \RouterosAPI();
    }

	public function index(){
		/** /
		ob_start();
		$memcache = new \Memcache;
		$memcache->connect("localhost", 11211);
		echo "Server's version: " . $memcache->getVersion() . "<br />\n";
		//$tmp_object = new \stdClass;
		//$tmp_object->str_attr = "test";
		//$tmp_object->int_attr = 123;
		//$memcache->set("key", $tmp_object, false, 600);
		//echo "Store data in the cache (data will expire in 10 minutes)<br />\n";
		echo "Data from the cache:<br />\n";
		var_dump($memcache->get("key"));
		$res = ob_get_clean();
		return $res;
		/**/
		return view('mikrotik');
	}
	
	public function boards(){
		return ['boards' => \App\Board::all()];
	}
	
	public function address_list_names(){
		return ['names' => \App\AddressListName::all()];
	}
	
	public function mac_addresses(){
		return ['macs' => \App\MacAddress::all()];
	}
	
	public function urls(){
		$urls = 'var navigation = ['
			. '{url:"' . url('/') . '", label:"Home"},' . 
			']';
		return $urls;
	}
	
}
