mongoimport --db ECOMMERCE --collection membres --file membres.json --jsonArray --drop
mongoimport --db ECOMMERCE --collection produits --file produits.json --jsonArray --drop
mongoimport --db ECOMMERCE --collection marques --file marques.json --jsonArray --drop
mongoimport --db ECOMMERCE --collection panier --file panier.json --jsonArray --drop
