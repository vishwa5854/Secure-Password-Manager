docker run -d --name vault \
--env-file ./.env \
-p 3000:3000 vault