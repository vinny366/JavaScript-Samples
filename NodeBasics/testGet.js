"use strict";

const http = require('http');
const url = require('url');
const qs = require('querystring');  // has parse method

let routes = {
	'GET': {
		'/' :  (req,res)=> {
			res.writeHead(200,{'content-type' : 'text/html'});
			res.end("<h1> Hello Router </h1>");
		},
		'/about' : (req,res) => {
			res.writeHead(200,{'content-type' : 'text/html'});
			res.end("<h1>This is about page </h1>");
		},
		'/api/getinfo' : (req,res) =>{
			res.writeHead(200,{'content-type' : 'text/html'});
			res.end(JSON.stringify(req.queryParams));
		}

	},
	'POST' : {
		'/api/login':(req,res)=>{
			let body = '';
			req.on('data', data => {
				body += data;  // all this is in memory; data comes in bits so appending all data
				if(body.length > 2097152){ // thgis is to restrict size of upload to 2 MB
					res.writeHead(413,{'content-type' : 'text/html'});
					res.end('<h3>Error: The file uploaded is more than 2 MB </h3>', 
						() => req.connection.destroy());
					// this will destroy the request and does not affect other req's
				}
			});
			req.on('end',()=>{
				let params = qs.parse(body);
				console.log('User Name', params['username']);
				console.log('Password', params['password']);
				//query a user database if user Exists 
				// If so send JSON response.
				res.end(body);
			})
		}

	},
	'NA':(req, res) =>{
		res.writeHead(404);
		res.end("Content not found");
	}
}

function router(req, res){
	let baseURI = url.parse(req.url,true);
	console.log(req.method);
	let resolveRoute = routes[req.method][baseURI.pathname];
	if(resolveRoute != undefined){
		req.queryParams = baseURI.query;   // queryParams is our custom created
		resolveRoute(req,res);
	}else{
		routes['NA'](req,res);
	}

};

http.createServer(router).listen(3000, () =>{   // insted of router u can write anonymous fn
	console.log(" Server running on port 3000")
});