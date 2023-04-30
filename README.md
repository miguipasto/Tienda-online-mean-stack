Continuación del proyecto https://github.com/miguipasto/crud-app-mean . Implementación de Microservicios RESTful.

#Instalación
Instalación y ejecución con 'docker-compose build' y 'docker-compose up'

#Microservicios desarollados

**Microservicio de Gestión de Artículos (https://localhost:8081)** : CRUD APP para la gestión de actividades. Creación, modificación, consulta y borrado. Sólo accesible para **Administradores.**
**Microservicio de Gestión de Compras (https://localhost:8082)** : CRUD APP para la gestión de compras. Creación (compra), modificación, consulta y borrado (cancelación de compra) de las compras de un **Cliente**.
**Microservicio de Gestión de Usuarios (https://localhost:8083)** : APP para la creación y eliminación de usuarios. Se pueden crear dos tipos de usuarios **Administradores** para el Microservicio de Gestión de Artículos y **Clientes** para el Microservicio de Gestión de Compras.

Simula una web de compra donde administradores podrán gestionar los artículos a vender y los clientes comprar estos artículos.

#Capturas
##Microservicio de Gestión de Artículos
![image](https://user-images.githubusercontent.com/127023319/235368247-af194313-eb50-4e79-aa88-5c9aa2bb42b4.png)
![image](https://user-images.githubusercontent.com/127023319/235368271-e9ca5fbd-be76-4ab4-8d60-35f0633b5073.png)
![image](https://user-images.githubusercontent.com/127023319/235368293-2d1ca829-5e24-4253-b533-84bfff4f9fce.png)

##Microservicio de Gestión de Compras
![image](https://user-images.githubusercontent.com/127023319/235368317-7bacaf00-173f-4f6a-99f6-ca2a854c15f4.png)
![image](https://user-images.githubusercontent.com/127023319/235368325-b88fb0f0-91c9-4aaa-8fa4-0ef61e4a0139.png)
![image](https://user-images.githubusercontent.com/127023319/235368339-84e9dca0-98f4-4191-90f4-b61c47e3e73e.png)
![image](https://user-images.githubusercontent.com/127023319/235368352-7297ca2e-e85c-4a74-9902-f3fbec295145.png)


##Microservicio de Gestión de Usuarios
![image](https://user-images.githubusercontent.com/127023319/235368370-00424a99-2997-4f71-abae-a1db98b4778b.png)
![image](https://user-images.githubusercontent.com/127023319/235368381-96f84310-0a94-4655-9e04-bf57f85bfac8.png)
![image](https://user-images.githubusercontent.com/127023319/235368387-655d76f9-6904-4486-b5ba-0fc88cb14194.png)


