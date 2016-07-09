import express from 'express';
import http from 'http';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match , RouterContext } from 'react-router';
import AppComponent from './components/AppComponent';
import IndexComponent from './components/IndexComponent';

const routes = {
	path: '',
	component: AppComponent,
	childRoutes: [
		{
			path: '/',
			component: IndexComponent
		}
	]
}




const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('*', (req, res) => {
    match({ routes, location: req.url }, (err, redirectLocation, props) => {
    	if(props) {
    		const markup = renderToString(<RouterContext { ...props } />)
    		console.log(markup);
    		res.render('index', { markup })
    	}
    })
});

const server = http.createServer(app);
server.listen(3030);
server.on('listening', () => {
    console.log('listening on', 3030 );
})
