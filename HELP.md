# Getting Started

### Docker
> $ docker run --name lab-postgres -p 5432:5432 -e POSTGRES_PASSWORD=123456pop  -e POSTGRES_DB=blogs-lab-project -d postgres

### Run jar
> java -Dserver.port=9000 -jar backend-0.0.1-SNAPSHOT.jar