up:
	node ace db:wipe
	node ace migration:run
	node ace db:seed -f database/seeders/UserSeeder.ts
	node ace db:seed -f database/seeders/DonationSeeder.ts
