var errand = function(args){
	if (this.self !== undefined){
		return new errand(args);
	}
	if (!this.parse(args)){
        throw 'invalid arguments';
    }

	var arr = [];
	for (var key in this.data){
		arr.push(key + '=' + this.data[key]);
	}
	if (this.method !== 'get'){
		this.formData = arr.join('&');
	} else if (arr.length > 0){
		this.url += (this.url.indexOf('?') != -1) ? '&' : '?' + arr.join('&');
	}

	this.setXhr();
};

errand.methods = ['get', 'post', 'put', 'delete'];
errand.prototype.parse = function(args){
    if (typeof args === 'string'){
        args = {
            url: args
        };
    }

    if (typeof args !== 'object') { return; }
	if (typeof args.url !== 'string') { return; }

    this.url = args.url;
    this.method = 'get';
    this.json = false;
    this.data = {};

    if (typeof args.method === 'string' && errand.methods.indexOf(args.method.toLowerCase()) != -1) {
        this.method = args.method.toLowerCase();
    }
    if (args.json){
        this.json = true;
    }
    if (typeof args.data === 'object'){
		this.data = args.data;
	}
	if (typeof args.headers === 'object'){
		this.headers = args.headers;
	} else {
		this.headers = {};
	}
	this.headers['X-Requested-With'] = 'XMLHttpRequest';

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
			if (typeof this.callbacks[category][i] === 'function'){
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

	if (this.headers){
		for (header in this.headers){
			this.xhr.setRequestHeader(header, this.headers[header]);
		}
	}

	this.xhr.send(this.formData !== undefined ? this.formData : null);
};

if (window.module !== undefined && module.exports){
	module.exports = errand;
}