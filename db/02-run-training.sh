#!/bin/sh
# Cree le schema TRAINING sur Oracle ATP et charge la table de correspondance.
# A executer sur le serveur OCI (145.241.174.15), le wallet et oracledb vivent dans le conteneur.
#   scp db/01-setup-training.js db/02-run-training.sh ubuntu@145.241.174.15:/tmp/
#   sudo sh /tmp/02-run-training.sh
# Mots de passe jamais affiches.
set -e
CT=b95bxu876yqnm7gn7staiifc-151746283726   # meme conteneur que prospect-mc

if [ ! -f /root/.ora_training ]; then
  P="Tr$(openssl rand -base64 32 | tr -dc 'A-Za-z0-9' | cut -c1-20)4k"
  printf '%s' "$P" > /root/.ora_training
  chmod 600 /root/.ora_training
  echo "mot de passe TRAINING genere -> /root/.ora_training (600)"
fi

APPDIR=$(docker exec "$CT" node -e "process.stdout.write(process.cwd())")
docker cp /tmp/01-setup-training.js "$CT:$APPDIR/01-setup-training.js"

docker exec \
  -e ORA_ADMIN_PASSWORD="$(tr -d '\n\r' < /root/.ora_admin)" \
  -e TRAINING_PASSWORD="$(tr -d '\n\r' < /root/.ora_training)" \
  -w "$APPDIR" "$CT" node ./01-setup-training.js

docker exec "$CT" sh -c "rm -f $APPDIR/01-setup-training.js"
echo "fichier temporaire retire du conteneur"
