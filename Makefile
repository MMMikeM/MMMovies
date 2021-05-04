initialise:
	docker-compose up -d
	docker-compose run --rm node npx prisma migrate dev --name init
	docker-compose run --rm node npx prisma db seed --preview-feature
	docker-compose down
	docker-compose up
	
down_with_volumes:
	docker-compose down -v
 
refresh:	down_with_volumes initialise