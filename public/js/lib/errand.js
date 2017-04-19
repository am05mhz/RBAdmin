function isVarTypeOf(_var, _type){
    try {
        return _var.constructor === _type;
    } catch(ex) {
        return _var == _type; //fallback for null or undefined
    }
}

var errand = function(args){
	if (this.self !== undefined){
		return new errand(args);
	}
	if (!this.parse(args)){
        throw 'invalid arguments';
    }

	var arr = this.serialize(this.data);
	if (arr.length > 0){
		if (this.method !== 'get'){
			this.formData = arr.join('&');
		} else {
			this.url += (this.url.indexOf('?') != -1) ? '&' : '?' + arr.join('&');
		}
	}
	
	this.setXhr();
};

errand.methods = ['get', 'post', 'put', 'delete'];

errand.prototype.serialize = function(data, varName){
	var arr = [];
	var vName;
	for (var key in data){
		if (varName == '' || varName == undefined){
			vName = key;
		} else {
			vName = varName + '[' + key + ']';
		}
		if (isVarTypeOf(data[key], Array) || isVarTypeOf(data[key], Object)){
			arr = arr.concat(this.serialize(data[key], vName));
		} else {
			arr.push(vName + '=' + data[key]);
		}
	}
	return arr;
}

errand.prototype.parse = function(args){
    if (isVarTypeOf(args, String)){
        args = {
            url: args
        };
    }
	
    if (!isVarTypeOf(args, Object)) { return; }
	if (!isVarTypeOf(args.url, String)) { return; }
	
    this.url = args.url;
	this.method = 'get';
    this.json = false;
    this.data = {};
    this.formData = null;

    if (isVarTypeOf(args.method, String)){
		args.method = args.method.toLowerCase();
		if (errand.methods.indexOf(args.method) != -1) {
			this.method = args.method;
        }
    }
    if (args.json){
        this.json = true;
    }
    if (isVarTypeOf(args.data, Object)){
		this.data = args.data;
	}
	if (isVarTypeOf(args.headers, Object)){
		this.headers = args.headers;
	} else {
		this.headers = {};
	}

    return true;
};

errand.prototype.setXhr = function(){
	this.xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	this.xhr.json = this.json;

	this.cancel = function(callback){
		this.xhr.abort();
		return this;
	};

	this.xhr.callbacks = {
		success: [],
		error: []
	};

	for (var name in this.xhr.callbacks){
		this[name] = function(name) {
			return function(callback) {
				this.xhr.callbacks[name].push(callback);
				return this;
			};
		}(name);
	}

	this.xhr.call = function(category, result){
		for (var i = 0; i < this.callbacks[category].length; i++){
			if (isVarTypeOf(this.callbacks[category][i], Function)){
				this.callbacks[category][i](result);
			}
		}
	};

	this.xhr.onreadystatechange = function(){
		if (this.readyState == 4){
			var func = 'error', reply = {status: this.status, message: 'unknown', response: this.responseText};
			switch (this.status){
				case 200:
					var result = this.responseText;
					if (this.json){
						try{
							result = JSON.parse(result);
						} catch (error){
							reply.message = 'invalid json';
							this.call(func, reply);
							return false;
						}
					}
					func = 'success';
					reply = result;
					break;
				case 400:
					reply.message = 'bad request';
					break;
				case 401:
					reply.message = 'unauthorized';
					break;
				case 403:
					reply.message = 'forbidden';
					break;
				case 404:
					reply.message = 'not found';
					break;
				case 500:
					reply.message = 'internal server error';
					break;
				case 502:
					reply.message = 'bad gateway';
					break;
				case 504:
					reply.message = 'gateway timeout';
					break;
			}
			this.call(func, reply);
		}
	};

	this.xhr.open(this.method, this.url, true);
	this.xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	this.xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

	if (this.headers){
		for (header in this.headers){
			this.xhr.setRequestHeader(header, this.headers[header]);
		}
	}

	this.xhr.send(this.formData);
};

if (window.module !== undefined && module.exports){
	module.exports = errand;
}