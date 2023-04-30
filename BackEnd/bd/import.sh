MONGO_HOST="mongodb://mongo:27017/database_web_c"
DB_NAME="database_web_c"

COLLECTION_NAME="activities"
JSON_FILE="activities.json"

mongoimport --db ${DB_NAME} --collection ${COLLECTION_NAME} --type json --file ${JSON_FILE}

COLLECTION_NAME="users" 
JSON_FILE="users.json"

mongoimport --db ${DB_NAME} --collection ${COLLECTION_NAME} --type json --file ${JSON_FILE}

COLLECTION_NAME="compras"
JSON_FILE="compras.json"

mongoimport --db ${DB_NAME} --collection ${COLLECTION_NAME} --type json --file ${JSON_FILE} 

echo "Base de datos importada"