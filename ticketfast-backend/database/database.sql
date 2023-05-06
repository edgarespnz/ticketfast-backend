CREATE DATABASE tickefast;

\c tickefast;

CREATE TABLE anp (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(200) NOT NULL
);

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE payment (
    id SERIAL PRIMARY KEY,
    total DECIMAL(10, 2) NOT NULL,
    ticket_quantity INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user"(id)
);

CREATE TABLE ticket (
    id SERIAL PRIMARY KEY,
    anp_id INTEGER NOT NULL,
    payment_id INTEGER NOT NULL,
    buying_date DATE NOT NULL,
    ticket_date DATE NOT NULL,
    FOREIGN KEY (anp_id) REFERENCES anp(id),
    FOREIGN KEY (payment_id) REFERENCES payment(id)
);


INSERT INTO anp (name, description, price, image)
VALUES ('Bosque Berlín', 'Descripción del Bosque Berlín', 20, 'https://www.conservamospornaturaleza.org/img/2013/03/refugio-2-1.jpg'),
       ('Kakiriuka', 'Descripción de Kakiriuka', 18, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv6m3JFEDpBhibyMpT9-prd4kmLGpf5gyC3nZeZJZ8OL6_RcSakXIz4BHGGR67MdBUl4Q&usqp=CAU'),
       ('Sabaullo', 'Descripción de Sabaullo', 22, 'https://elcomercio.pe/resizer/WYC2UA9xrBCxnYqbzxjgkACqo_E=/980x0/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/2EN6MYPMM5G45DHVPHN5MU44AQ.jpg');

UPDATE anp SET description = 'La reserva es un importante destino turístico para aquellos que desean experimentar la naturaleza y la cultura local de Colombia. Además, la reserva es administrada por las comunidades indígenas que la habitan, lo que garantiza la preservación y conservación de la biodiversidad y los valores culturales de la región.' WHERE id = 3;

