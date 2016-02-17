watch:
	modd

js:
	cat \
		node_modules/react/dist/react.js \
		node_modules/react-dom/dist/react-dom.js \
		node_modules/redux/dist/redux.js \
		node_modules/page/page.js \
		assets/bower_components/lodash/dist/lodash.min.js \
		app/namespace.js `find app/lib -iname '*.js'` app/main.js > assets/js/bundle.js

sass:
	sass sass/main.sass > assets/css/bundle.css

assets: js sass

clean:
	rm -f ./assets/js/bundle.js
	rm -f ./assets/ss/bundle.css
	rm -rf node_modules
	rm -rf cordova

install-node-modules:
	npm install

install: install-node-modules init-cordova

init-cordova:
	cordova create cordova
	cd cordova && \
	cordova platform add browser && \
	cordova platform add android

android: assets
	cp -rf assets cordova/www
	cp -rf index.html cordova/www
	cd cordova && \
	cordova build android

.PHONY: android sass js
