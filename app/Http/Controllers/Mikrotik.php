<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
			$filters[$k]->rules = $filters[$k]->rules ? json_decode($filters[$k]->rules) : [];
		}
		return ['filters' => $filters];
	}
	
	public function nat(){
		$nat = \App\NAT::all();
		foreach($nat as $k => $v){
			$nat[$k]->checked = false;
			$nat[$k]->rules = $nat[$k]->rules ? json_decode($nat[$k]->rules) : [];
		}
		return ['nat' => $nat];
	}
	
	public function mangle(){
		$mangle = \App\Mangle::all();
		foreach($mangle as $k => $v){
			$mangle[$k]->checked = false;
			$mangle[$k]->rules = $mangle[$k]->rules ? json_decode($mangle[$k]->rules) : [];
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
				$chiper = base64_decode($board->password);
				$iv = substr($chiper, 0, 16);
				$chiper = substr($chiper, 16);
				$pwd = openssl_decrypt($chiper, 'AES-128-CTR', config('app.key'), OPENSSL_RAW_DATA, $iv);
				if ($pwd){
					$board->password = $pwd;
				}
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
				$chain = $f['chain'];
				unset($f['chain']);
				$action = $f['action'];
				unset($f['action']);
				$comment = array_key_exists('comment', $f) ? $f['comment'] : '';
				if (!array_key_exists('comment', $f)){
					$comment = '';
				} else {
					$comment = $f['comment'];
					unset($f['comment']);
				}
				$rules = json_encode($f);
				if (!($existing = \App\FilterRule::where([
							'chain' => $chain, 
							'action' => $action,
						])->where(
							\DB::raw('convert(nvarchar(max), comment)'), $comment
						)->where(
							\DB::raw('convert(nvarchar(max), rules)'), $rules
						)->first())){
					$filter = new \App\FilterRule();
					$filter->chain = $chain;
					$filter->action = $action;
					$filter->comment = $comment;
					$filter->rules = $rules;
					$filter->save();
				} else {
					$existing->chain = $chain;
					$existing->action = $action;
					$existing->comment = $comment;
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
				$chiper = base64_decode($board->password);
				$iv = substr($chiper, 0, 16);
				$chiper = substr($chiper, 16);
				$pwd = openssl_decrypt($chiper, 'AES-128-CTR', config('app.key'), OPENSSL_RAW_DATA, $iv);
				if ($pwd){
					$board->password = $pwd;
				}
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
				$chain = $n['chain'];
				unset($n['chain']);
				$action = $n['action'];
				unset($n['action']);
				$comment = array_key_exists('comment', $n) ? $n['comment'] : '';
				if (!array_key_exists('comment', $n)){
					$comment = '';
				} else {
					$comment = $n['comment'];
					unset($n['comment']);
				}
				$rules = json_encode($n);
				if (!($existing = \App\NAT::where([
							'chain' => $chain, 
							'action' => $action,
						])->where(
							\DB::raw('convert(nvarchar(max), comment)'), $comment
						)->where(
							\DB::raw('convert(nvarchar(max), rules)'), $rules
						)->first())){
					$_nat = new \App\NAT();
					$_nat->chain = $chain;
					$_nat->action = $action;
					$_nat->comment = $comment;
					$_nat->rules = $rules;
					$_nat->save();
				} else {
					$existing->chain = $chain;
					$existing->action = $action;
					$existing->comment = $comment;
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
				$chiper = base64_decode($board->password);
				$iv = substr($chiper, 0, 16);
				$chiper = substr($chiper, 16);
				$pwd = openssl_decrypt($chiper, 'AES-128-CTR', config('app.key'), OPENSSL_RAW_DATA, $iv);
				if ($pwd){
					$board->password = $pwd;
				}
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
				$chain = $m['chain'];
				unset($m['chain']);
				$action = $m['action'];
				unset($m['action']);
				$comment = array_key_exists('comment', $m) ? $m['comment'] : '';
				if (!array_key_exists('comment', $m)){
					$comment = '';
				} else {
					$comment = $m['comment'];
					unset($m['comment']);
				}
				$rules = json_encode($m);
				if (!($existing = \App\Mangle::where([
							'chain' => $chain, 
							'action' => $action,
						])->where(
							\DB::raw('convert(nvarchar(max), comment)'), $comment
						)->where(
							\DB::raw('convert(nvarchar(max), rules)'), $rules
						)->first())){
					$mgl = new \App\Mangle();
					$mgl->chain = $chain;
					$mgl->action = $action;
					$mgl->comment = $comment;
					$mgl->rules = $rules;
					$mgl->save();
				} else {
					$existing->chain = $chain;
					$existing->action = $action;
					$existing->comment = $comment;
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
				$chiper = base64_decode($board->password);
				$iv = substr($chiper, 0, 16);
				$chiper = substr($chiper, 16);
				$pwd = openssl_decrypt($chiper, 'AES-128-CTR', config('app.key'), OPENSSL_RAW_DATA, $iv);
				if ($pwd){
					$board->password = $pwd;
				}
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
				$chiper = base64_decode($board->password);
				$iv = substr($chiper, 0, 16);
				$chiper = substr($chiper, 16);
				$pwd = openssl_decrypt($chiper, 'AES-128-CTR', config('app.key'), OPENSSL_RAW_DATA, $iv);
				if ($pwd){
					$board->password = $pwd;
				}
				$this->rb_name = $rb;
				$this->rb = new \am05mhz\RouterOS();
				//$this->rb->debug = true;
				$this->rb->connect($board->ip, $board->user, $board->password);
			}
			
			$layers = $this->rb->getLayer7Protocols();
			
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
	
	public function push_filter_rules(Request $req, $rb){
		$push = $req->only('push');
		$board = \App\Board::where('name', $rb)->first();
		
		if ($board){
			if (!is_resource($this->rb) or ($this->rb_name != $rb)){
				$chiper = base64_decode($board->password);
				$iv = substr($chiper, 0, 16);
				$chiper = substr($chiper, 16);
				$pwd = openssl_decrypt($chiper, 'AES-128-CTR', config('app.key'), OPENSSL_RAW_DATA, $iv);
				if ($pwd){
					$board->password = $pwd;
				}
				$this->rb_name = $rb;
				$this->rb = new \am05mhz\RouterOS();
				//$this->rb->debug = true;
				$this->rb->connect($board->ip, $board->user, $board->password);
			}

			$new = [];
			$old = [];
			foreach($push['push'] as $rule_id){
				$rule = \App\FilterRule::where('id', $rule_id)->first();
				if ($rule){
					$find = json_decode($rule->rules, true);
					unset($find['invalid']);
					unset($find['dynamic']);
					$find['chain'] = $rule->chain;
					$find['action'] = $rule->action;
					if ($rule->comment){
						$find['comment'] = $rule->comment;
					}
					$exists = $this->rb->getFilterRules($find);
					if (count($exists) > 0){
						array_push($old, $rule_id);
					} else {
						array_push($new, $rule_id);
						$this->rb->addFilerRule($find);
					}
				}
			}
			return ['board' => $board->name, 'rules' => ['new' => $new, 'old' => $old]];
		}
		return ['error' => 'Board not found'];
	}
	
	public function push_nat(Request $req, $rb){
		$push = $req->only('push');
		$board = \App\Board::where('name', $rb)->first();
		
		if ($board){
			if (!is_resource($this->rb) or ($this->rb_name != $rb)){
				$chiper = base64_decode($board->password);
				$iv = substr($chiper, 0, 16);
				$chiper = substr($chiper, 16);
				$pwd = openssl_decrypt($chiper, 'AES-128-CTR', config('app.key'), OPENSSL_RAW_DATA, $iv);
				if ($pwd){
					$board->password = $pwd;
				}
				$this->rb_name = $rb;
				$this->rb = new \am05mhz\RouterOS();
				//$this->rb->debug = true;
				$this->rb->connect($board->ip, $board->user, $board->password);
			}

			$new = [];
			$old = [];
			$fail = [];
			foreach($push['push'] as $nat_id){
				$nat = \App\NAT::where('id', $nat_id)->first();
				if ($nat){
					$find = json_decode($nat->rules, true);
					unset($find['invalid']);
					unset($find['dynamic']);
					$find['chain'] = $nat->chain;
					$find['action'] = $nat->action;
					if ($nat->comment){
						$find['comment'] = $nat->comment;
					}
					$exists = $this->rb->getNAT($find);
					if (count($exists) > 0){
						array_push($old, $nat_id);
					} else {
						if (!$find['comment']){
							unset($find['comment']);
						}
						if ($this->rb->addNAT($find)){
							array_push($new, $nat_id);
						} else {
							array_push($fail, $nat_id);
						}
					}
				}
			}
			return ['board' => $board->name, 'nat' => ['new' => $new, 'exist' => $old, 'fail' => $fail]];
		}
		return ['error' => 'Board not found'];
	}
	
	public function push_mangle(Request $req, $rb){
		$push = $req->only('push');
		$board = \App\Board::where('name', $rb)->first();
		
		if ($board){
			if (!is_resource($this->rb) or ($this->rb_name != $rb)){
				$chiper = base64_decode($board->password);
				$iv = substr($chiper, 0, 16);
				$chiper = substr($chiper, 16);
				$pwd = openssl_decrypt($chiper, 'AES-128-CTR', config('app.key'), OPENSSL_RAW_DATA, $iv);
				if ($pwd){
					$board->password = $pwd;
				}
				$this->rb_name = $rb;
				$this->rb = new \am05mhz\RouterOS();
				//$this->rb->debug = true;
				$this->rb->connect($board->ip, $board->user, $board->password);
			}

			$new = [];
			$old = [];
			$fail = [];
			foreach($push['push'] as $mangle_id){
				$mangle = \App\Mangle::where('id', $mangle_id)->first();
				if ($mangle){
					$find = json_decode($mangle->rules, true);
					unset($find['invalid']);
					unset($find['dynamic']);
					$find['chain'] = $mangle->chain;
					$find['action'] = $mangle->action;
					if ($mangle->comment){
						$find['comment'] = $mangle->comment;
					}
					$exists = $this->rb->getMangle($find);
					if (count($exists) > 0){
						array_push($old, $mangle_id);
					} else {
						if ($this->rb->addMangle($find)){
							array_push($new, $mangle_id);
						} else {
							array_push($fail, $mangle_id);
						}
					}
				}
			}
			return ['board' => $board->name, 'mangle' => ['new' => $new, 'exist' => $old, 'fail' => $fail]];
		}
		return ['error' => 'Board not found'];
	}
	public function push_address_lists(Request $req, $rb){
		$push = $req->only('push');
		$board = \App\Board::where('name', $rb)->first();
		
		if ($board){
			if (!is_resource($this->rb) or ($this->rb_name != $rb)){
				$chiper = base64_decode($board->password);
				$iv = substr($chiper, 0, 16);
				$chiper = substr($chiper, 16);
				$pwd = openssl_decrypt($chiper, 'AES-128-CTR', config('app.key'), OPENSSL_RAW_DATA, $iv);
				if ($pwd){
					$board->password = $pwd;
				}
				$this->rb_name = $rb;
				$this->rb = new \am05mhz\RouterOS();
				//$this->rb->debug = true;
				$this->rb->connect($board->ip, $board->user, $board->password);
			}

			$new = [];
			$old = [];
			$fail = [];
			foreach($push['push'] as $addr_id){
				$addr = \App\AddressList::where('id', $mangle_id)->first();
				if ($addr){
					$find['list'] = $addr->list;
					$find['address'] = $addr->address;
					if ($addr->timeout){
						$find['timeout'] = $addr->timeout;
					}
					if ($addr->comment){
						$find['comment'] = $addr->comment;
					}
					$exists = $this->rb->getAddressLists($find);
					if (count($exists) > 0){
						array_push($old, $addr_id);
					} else {
						if ($this->rb->addAddressList($find)){
							array_push($new, $addr_id);
						} else {
							array_push($fail, $addr_id);
						}
					}
				}
			}
			return ['board' => $board->name, 'address' => ['new' => $new, 'exist' => $old, 'fail' => $fail]];
		}
		return ['error' => 'Board not found'];
	}
	public function push_layer7_protocols(Request $req, $rb){
		$push = $req->only('push');
		$board = \App\Board::where('name', $rb)->first();
		
		if ($board){
			if (!is_resource($this->rb) or ($this->rb_name != $rb)){
				$chiper = base64_decode($board->password);
				$iv = substr($chiper, 0, 16);
				$chiper = substr($chiper, 16);
				$pwd = openssl_decrypt($chiper, 'AES-128-CTR', config('app.key'), OPENSSL_RAW_DATA, $iv);
				if ($pwd){
					$board->password = $pwd;
				}
				$this->rb_name = $rb;
				$this->rb = new \am05mhz\RouterOS();
				//$this->rb->debug = true;
				$this->rb->connect($board->ip, $board->user, $board->password);
			}

			$new = [];
			$old = [];
			$fail = [];
			foreach($push['push'] as $proto_id){
				$proto = \App\Layer7Protocol::where('id', $proto_id)->first();
				if ($proto){
					$find['name'] = $proto->name;
					$find['regexp'] = $proto->regexp;
					if ($proto->comment){
						$find['comment'] = $proto->comment;
					}
					$exists = $this->rb->getLayer7Protocols($find);
					if (count($exists) > 0){
						array_push($old, $proto_id);
					} else {
						if ($this->rb->addLayer7Protocol($find)){
							array_push($new, $proto_id);
						} else {
							array_push($fail, $proto_id);
						}
					}
				}
			}
			return ['board' => $board->name, 'protocol' => ['new' => $new, 'exist' => $old, 'fail' => $fail]];
		}
		return ['error' => 'Board not found'];
	}
	
	public function delete_boards(Request $req){
		$boards = $req->only('del');
		\App\Board::whereIn('id', $boards['del'])->delete();
		return ['success' => true];
	}
	
	public function delete_filters(Request $req, $rb){
		$filters = $req->only('del');
		$board = \App\Board::where('name', $rb)->first();
		
		if ($board){
			if (!is_resource($this->rb) or ($this->rb_name != $rb)){
				$chiper = base64_decode($board->password);
				$iv = substr($chiper, 0, 16);
				$chiper = substr($chiper, 16);
				$pwd = openssl_decrypt($chiper, 'AES-128-CTR', config('app.key'), OPENSSL_RAW_DATA, $iv);
				if ($pwd){
					$board->password = $pwd;
				}
				$this->rb_name = $rb;
				$this->rb = new \am05mhz\RouterOS();
				//$this->rb->debug = true;
				$this->rb->connect($board->ip, $board->user, $board->password);
			}

			$del = [];
			$fail = [];
			$data = \App\FilterRule::whereIn('id', $filters['del']);
			$list = $data->get();
			foreach($list as $filter){
				$find = json_decode($filter->rules, true);
				$find['chain'] = $filter->chain;
				$find['action'] = $filter->action;
				if ($filter->comment){
					$find['comment'] = $filter->comment;
				}
				$exists = $this->rb->getFilterRules($find);
				if (count($exists) == 1){
					//$this->rb->removeFilterRule(['.id' => $exists[0]['.id']]);
					array_push($del, $filter->id);
				} else {
					array_push($fail, $filter->id);
				}
			}
			//$data->delete();
			return ['success' => true, 'result' => ['del' => $del, 'fail' => $fail]];
		} else {
			return ['error' => 'Board not found'];
		}
	}
	
	public function delete_nat(Request $req, $rb){
		$nat = $req->only('del');
		$board = \App\Board::where('name', $rb)->first();
		
		if ($board){
			if (!is_resource($this->rb) or ($this->rb_name != $rb)){
				$chiper = base64_decode($board->password);
				$iv = substr($chiper, 0, 16);
				$chiper = substr($chiper, 16);
				$pwd = openssl_decrypt($chiper, 'AES-128-CTR', config('app.key'), OPENSSL_RAW_DATA, $iv);
				if ($pwd){
					$board->password = $pwd;
				}
				$this->rb_name = $rb;
				$this->rb = new \am05mhz\RouterOS();
				//$this->rb->debug = true;
				$this->rb->connect($board->ip, $board->user, $board->password);
			}

			$del = [];
			$fail = [];
			$data = \App\NAT::whereIn('id', $nat['del']);
			$list = $data->get();
			foreach($list as $n){
				$find = json_decode($n->rules, true);
				$find['chain'] = $n->chain;
				$find['action'] = $n->action;
				if ($n->comment){
					$find['comment'] = $n->comment;
				}
				$exists = $this->rb->getNAT($find);
				if (count($exists) == 1){
					//$this->rb->removeNAT(['.id' => $exists[0]['.id']]);
					array_push($del, $n->id);
				} else {
					array_push($fail, $n->id);
				}
			}
			//$data->delete();
			return ['success' => true, 'result' => ['del' => $del, 'fail' => $fail]];
		} else {
			return ['error' => 'Board not found'];
		}
	}
	
	public function delete_mangle(Request $req, $rb){
		$mangle = $req->only('del');
		$board = \App\Board::where('name', $rb)->first();
		
		if ($board){
			if (!is_resource($this->rb) or ($this->rb_name != $rb)){
				$chiper = base64_decode($board->password);
				$iv = substr($chiper, 0, 16);
				$chiper = substr($chiper, 16);
				$pwd = openssl_decrypt($chiper, 'AES-128-CTR', config('app.key'), OPENSSL_RAW_DATA, $iv);
				if ($pwd){
					$board->password = $pwd;
				}
				$this->rb_name = $rb;
				$this->rb = new \am05mhz\RouterOS();
				//$this->rb->debug = true;
				$this->rb->connect($board->ip, $board->user, $board->password);
			}

			$del = [];
			$fail = [];
			$data = \App\Mangle::whereIn('id', $mangle['del']);
			$list = $data->get();
			foreach($list as $mgl){
				$find = json_decode($mgl->rules, true);
				$find['chain'] = $mgl->chain;
				$find['action'] = $mgl->action;
				if ($mgl->comment){
					$find['comment'] = $mgl->comment;
				}
				$exists = $this->rb->getMangle($find);
				if (count($exists) == 1){
					//$this->rb->removeMangle(['.id' => $exists[0]['.id']]);
					array_push($del, $mgl->id);
				} else {
					array_push($fail, $mgl->id);
				}
			}
			//$data->delete();
			return ['success' => true, 'result' => ['del' => $del, 'fail' => $fail]];
		} else {
			return ['error' => 'Board not found'];
		}
	}
	
	public function delete_address_lists(Request $req){
		$addrs = $req->only('del');
		$board = \App\Board::where('name', $rb)->first();
		
		if ($board){
			if (!is_resource($this->rb) or ($this->rb_name != $rb)){
				$chiper = base64_decode($board->password);
				$iv = substr($chiper, 0, 16);
				$chiper = substr($chiper, 16);
				$pwd = openssl_decrypt($chiper, 'AES-128-CTR', config('app.key'), OPENSSL_RAW_DATA, $iv);
				if ($pwd){
					$board->password = $pwd;
				}
				$this->rb_name = $rb;
				$this->rb = new \am05mhz\RouterOS();
				//$this->rb->debug = true;
				$this->rb->connect($board->ip, $board->user, $board->password);
			}

			$del = [];
			$fail = [];
			$data = \App\Mangle::whereIn('id', $addrs['del']);
			$list = $data->get();
			foreach($list as $addr){
				$find['list'] = $addr->list;
				$find['address'] = $addr->address;
				if ($addr->timeout){
					$find['timeout'] = $addr->timeout;
				}
				if ($addr->comment){
					$find['comment'] = $addr->comment;
				}
				$exists = $this->rb->getAddressLists($find);
				if (count($exists) == 1){
					//$this->rb->removeAddressList(['.id' => $exists[0]['.id']]);
					array_push($del, $addr->id);
				} else {
					array_push($fail, $addr->id);
				}
			}
			//$data->delete();
			return ['success' => true, 'result' => ['del' => $del, 'fail' => $fail]];
		} else {
			return ['error' => 'Board not found'];
		}
	}
	
	public function delete_layer7_protocols(Request $req){
		$proto = $req->only('del');
		$board = \App\Board::where('name', $rb)->first();
		
		if ($board){
			if (!is_resource($this->rb) or ($this->rb_name != $rb)){
				$chiper = base64_decode($board->password);
				$iv = substr($chiper, 0, 16);
				$chiper = substr($chiper, 16);
				$pwd = openssl_decrypt($chiper, 'AES-128-CTR', config('app.key'), OPENSSL_RAW_DATA, $iv);
				if ($pwd){
					$board->password = $pwd;
				}
				$this->rb_name = $rb;
				$this->rb = new \am05mhz\RouterOS();
				//$this->rb->debug = true;
				$this->rb->connect($board->ip, $board->user, $board->password);
			}

			$del = [];
			$fail = [];
			$data = \App\Mangle::whereIn('id', $proto['del']);
			$list = $data->get();
			foreach($list as $p){
				$find['name'] = $p->name;
				$find['regexp'] = $p->regexp;
				if ($p->comment){
					$find['comment'] = $p->comment;
				}
				$exists = $this->rb->getLayer7Protocols($find);
				if (count($exists) == 1){
					//$this->rb->removeLayer7Protocol(['.id' => $exists[0]['.id']]);
					array_push($del, $p->id);
				} else {
					array_push($fail, $p->id);
				}
			}
			//$data->delete();
			return ['success' => true, 'result' => ['del' => $del, 'fail' => $fail]];
		} else {
			return ['error' => 'Board not found'];
		}
	}
	
	public function save_board(Request $req){
		$data = $req->only(['name', 'ip', 'user', 'password']);
		$iv = openssl_random_pseudo_bytes(16);
		
		$board = new \App\Board();
		$board->name = $data['name'];
		$board->ip = $data['ip'];
		$board->user = $data['user'];
		$board->password = base64_encode($iv . openssl_encrypt($data['password'], 'AES-128-CTR', config('app.key'), OPENSSL_RAW_DATA, $iv));
		$board->save();
		
		return ['board' => $board];
	}
	
	public function save_address_list(Request $req){
		$data = $req->only(['list', 'address', 'timeout', 'comment']);
		
		$addr = new \App\AddressList();
		$addr->list = $data['list'];
		$addr->address = $data['address'];
		$addr->timeout = $data['timeout'];
		$addr->comment = $data['comment'];
		$addr->save();
		
		return ['addressList' => $addr];
	}
	
	public function save_layer7_protocol(Request $req){
		$data = $req->only(['name', 'regexp', 'comment']);
		
		$proto = new \App\Layer7Protocol();
		$proto->name = $data['name'];
		$proto->regexp = $data['regexp'];
		$proto->comment = $data['comment'];
		$proto->save();
		
		return ['layer7Protocol' => $proto];
	}
	
	public function update_board(Request $req){
		$data = $req->only(['id', 'name', 'ip', 'user', 'password']);
		$iv = openssl_random_pseudo_bytes(16);
		
		$board = \App\Board::where(['id' => $data['id']]);
		
		unset($data['id']);
		if (!$data['password']){
			unset($data['password']);
		} else {
			$data['password'] = base64_encode($iv . openssl_encrypt($data['password'], 'AES-128-CTR', config('app.key'), OPENSSL_RAW_DATA, $iv));
		}
		
		$board->update($data);
		
		return ['board' => $board->first()];
	}
	
	public function urls(){
		$urls = 'var navigation = ['
			. '{url:"' . url('/') . '", label:"Home"},' . 
			']';
		return $urls;
	}
	
}
