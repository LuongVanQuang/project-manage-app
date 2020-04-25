Run Backend-api:

	1. Install knex.
	2. Create .env.development file and write:
		NODE_ENV=development
		DB_HOST=****//Database host
		DB_USER=****//Database user
		DB_PASS=****//Database password
		DB_NAME=***//project's database
	3. Run migration by command: 'knex migrate:latest'
	5. run node server: 'npm start'

Run frontend:

	1. Open frontend/src/config.js 
	2. Change value BACKEND_API to the url that backend server listen.
	3. npm start.
