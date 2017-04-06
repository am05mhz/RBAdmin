<?php

namespace App\Http\Controllers;

class Mikrotik extends Controller
{
	
	protected $rb = null;
	protected $rb_name = null;

    public function __construct(){
		//$this->middleware('auth', ['except' => ['index', 'html']]);
		$this->middleware('auth');
    }

	public function index(){
		return view('mikrotik');
	}
	
	public function boards(){
		$boards = \App\Board::all();
		foreach($boards as $k => $v){
			$boards[$k]->checked = false;
		}
		return ['boards' => $boards];
	}
	
	public function filter_rules(){
		$filters = \App\FilterRule::all();
		foreach($filters as $k => $v){
			$filters[$k]->checked = false;
		}
		return ['filters' => $filters];
	}
	
	public function nat(){
		$nat = \App\NAT::all();
		foreach($nat as $k => $v){
			$nat[$k]->checked = false;
		}
		return ['nat' => $nat];
	}
	
	public function mangle(){
		$mangle = \App\Mangle::all();
		foreach($mangle as $k => $v){
			$mangle[$k]->checked = false;
		}
		return ['mangle' => $mangle];
	}
	
	public function address_lists(){
		$addr = \App\AddressList::all();
		foreach($addr as $k => $v){
			$addr[$k]->checked = false;
		}
		return ['address-lists' => $addr];
	}
	
	public function layer7_protocols(){
		$proto = \App\Layer7Protocol::all();
		foreach($proto as $k => $v){
			$proto[$k]->checked = false;
		}
		return ['layer7-protocols' => $proto];
	}
	
	public function import_filter_rules($rb){
		$board = \App\Board::where('name', $rb)->first();
		
		if ($board){
			if (!is_resource($this->rb) or ($this->rb_name != $rb)){
				$this->rb_name = $rb;
				$this->rb = new \am05mhz\RouterOS();
				//$this->rb->debug = true;
				$this->rb->connect($board->ip, $board->user, $board->password);
			}
			
			$filters = $this->rb->getFilterRules();
			
			foreach($filters as $f){
				//$id = $f['.id'];
				unset($f['.id']);
				unset($f['bytes']);
				unset($f['packets']);
				unset($f['packets']);
				if (!array_key_exists('comment', $f)){
					$f['comment'] = '';
				}
				$rules = json_encode($f);
				if (!($existing = \App\FilterRule::where(\DB::raw('convert(nvarchar(max), rules)'), $rules)->first())){
					$filter = new \App\FilterRule();
					$filter->chain = $f['chain'];
					$filter->action = $f['action'];
					$filter->comment = $f['comment'];
					$filter->rules = $rules;
					$filter->save();
				} else {
					$existing->chain = $f['chain'];
					$existing->action = $f['action'];
					$existing->comment = $f['comment'];
					$existing->save();
				}
			}
			return ['success' => true, 'count' => count($filters)];
		} else {
			return ['error' => 'Router board not found'];
		}
	}
	
	public function import_nat($rb){
		$board = \App\Board::where('name', $rb)->first();
		
		if ($board){
			if (!is_resource($this->rb) or ($this->rb_name != $rb)){
				$this->rb_name = $rb;
				$this->rb = new \am05mhz\RouterOS();
				//$this->rb->debug = true;
				$this->rb->connect($board->ip, $board->user, $board->password);
			}
			
			$nat = $this->rb->getNAT();
			
			foreach($nat as $n){
				//$id = $n['.id'];
				unset($n['.id']);
				unset($n['bytes']);
				unset($n['packets']);
				unset($n['packets']);
				if (!array_key_exists('comment', $n)){
					$n['comment'] = '';
				}
				$rules = json_encode($n);
				if (!($existing = \App\NAT::where(\DB::raw('convert(nvarchar(max), rules)'), $rules)->first())){
					$_nat = new \App\NAT();
					$_nat->chain = $n['chain'];
					$_nat->action = $n['action'];
					$_nat->comment = $n['comment'];
					$_nat->rules = $rules;
					$_nat->save();
				} else {
					$existing->chain = $n['chain'];
					$existing->action = $n['action'];
					$existing->comment = $n['comment'];
					$existing->save();
				}
			}
			return ['success' => true, 'count' => count($nat)];
		} else {
			return ['error' => 'Router board not found'];
		}
	}
	
	public function import_mangle($rb){
		$board = \App\Board::where('name', $rb)->first();
		
		if ($board){
			if (!is_resource($this->rb) or ($this->rb_name != $rb)){
				$this->rb_name = $rb;
				$this->rb = new \am05mhz\RouterOS();
				//$this->rb->debug = true;
				$this->rb->connect($board->ip, $board->user, $board->password);
			}
			
			$mangle = $this->rb->getMangle();
			
			foreach($mangle as $m){
				//$id = $m['.id'];
				unset($m['.id']);
				unset($m['bytes']);
				unset($m['packets']);
				unset($m['packets']);
				if (!array_key_exists('comment', $m)){
					$m['comment'] = '';
				}
				$rules = json_encode($m);
				if (!($existing = \App\Mangle::where(\DB::raw('convert(nvarchar(max), rules)'), $rules)->first())){
					$mgl = new \App\Mangle();
					$mgl->chain = $m['chain'];
					$mgl->action = $m['action'];
					$mgl->comment = $m['comment'];
					$mgl->rules = $rules;
					$mgl->save();
				} else {
					$existing->chain = $m['chain'];
					$existing->action = $m['action'];
					$existing->comment = $m['comment'];
					$existing->save();
				}
			}
			return ['success' => true, 'count' => count($mangle)];
		} else {
			return ['error' => 'Router board not found'];
		}
	}
	
	public function import_address_lists($rb){
		$board = \App\Board::where('name', $rb)->first();
		
		if ($board){
			if (!is_resource($this->rb) or ($this->rb_name != $rb)){
				$this->rb_name = $rb;
				$this->rb = new \am05mhz\RouterOS();
				//$this->rb->debug = true;
				$this->rb->connect($board->ip, $board->user, $board->password);
			}
			
			set_time_limit(1800);
			
			$addrs = $this->rb->getAddressLists(['dynamic' => 'no']);
			
			foreach($addrs as $a){
				//$id = $a['.id'];
				unset($a['.id']);
				if (!array_key_exists('timeout', $a)){
					$a['timeout'] = '';
				}
				if (!array_key_exists('comment', $a)){
					$a['comment'] = '';
				}
				if (!($existing = \App\AddressList::where('address', $a['address'])->first())){
					$addr = new \App\AddressList();
					$addr->list = $a['list'];
					$addr->address = $a['address'];
					$addr->timeout = $a['timeout'];
					$addr->comment = $a['comment'];
					$addr->save();
				} else {
					$existing->list = $a['list'];
					$existing->timeout = $a['timeout'];
					$existing->comment = $a['comment'];
					$existing->save();
				}
			}
			return ['success' => true, 'count' => count($addrs)];
		} else {
			return ['error' => 'Router board not found'];
		}
	}
	
	public function import_layer7_protocols($rb){
		$board = \App\Board::where('name', $rb)->first();
		
		if ($board){
			if (!is_resource($this->rb) or ($this->rb_name != $rb)){
				$this->rb_name = $rb;
				$this->rb = new \am05mhz\RouterOS();
				//$this->rb->debug = true;
				$this->rb->connect($board->ip, $board->user, $board->password);
			}
			
			$layers = $this->rb->getLayer7Protocols([]);
			
			foreach($layers as $l){
				//$id = $l['.id'];
				unset($l['.id']);
				if (!array_key_exists('timeout', $l)){
					$l['timeout'] = '';
				}
				if (!array_key_exists('comment', $l)){
					$l['comment'] = '';
				}
				if (!($existing = \App\Layer7Protocol::where(\DB::raw('convert(nvarchar(max), regexp)'), $l['regexp'])->first())){
					$layer = new \App\Layer7Protocol();
					$layer->name = $l['name'];
					$layer->regexp = $l['regexp'];
					$layer->comment = $l['comment'];
					$layer->save();
				} else {
					$existing->name = $l['name'];
					$existing->comment = $l['comment'];
					$existing->save();
				}
			}
			return ['success' => true, 'count' => count($layers)];
		} else {
			return ['error' => 'Router board not found'];
		}
	}
	
	public function urls(){
		$urls = 'var navigation = ['
			. '{url:"' . url('/') . '", label:"Home"},' . 
			']';
		return $urls;
	}
	
}
