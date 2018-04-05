SELECT vehicles.*,users.name
FROM vehicles
JOIN users
ON users.id = vehicles.owner_id
WHERE vehicles.year > 2000
ORDER BY vehicles.year DESC;