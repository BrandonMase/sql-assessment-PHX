SELECT vehicles.* FROM vehicles
WHERE vehicles.owner_id = (SELECT id FROM users WHERE name LIKE CONCAT($1,'%'));