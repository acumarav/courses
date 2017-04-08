--course
SELECT *
FROM rental;

EXPLAIN SELECT count(*)
        FROM payment;

SELECT *
FROM payment
WHERE date_lt(payment_date :: DATE, '2007-04-01' :: DATE);

SELECT
  amount,
  payment_date,
  date_part('quarter', payment_date)                                                  AS quarter,
  date_part('year', payment_date)                                                     AS year,
  'Q' || date_part('quarter', payment_date) || '-' || date_part('year', payment_date) AS display_quarter
FROM payment;

SELECT
  x,
  md5(x :: TEXT)
FROM
      generate_series(100, 0, -1) AS f(x);

SELECT x
FROM
      generate_series('2001-10-01' :: TIMESTAMP, '2002-10-01' :: TIMESTAMP, '10 days') AS f(x);

SELECT trunc(random() * 1000 + 1)
FROM generate_series(1, 1000);

SELECT
  min(payment_id),
  max(payment_id)
FROM payment;

CREATE OR REPLACE FUNCTION random_payments(counter INT)
  RETURNS SETOF payment
AS $$
DECLARE
  start_id INT;
  end_id   INT;
BEGIN
  SELECT min(payment_id)
  FROM payment
  INTO start_id;

  SELECT max(payment_id)
  FROM payment
  INTO end_id;

  RETURN QUERY (SELECT *
                FROM payment
                WHERE payment_id IN (
                  SELECT (trunc(random() * (end_id - start_id)) + start_id)
                  FROM generate_series(1, counter)));
END
$$ LANGUAGE plpgsql;

SELECT *
FROM random_payments(3);

SELECT
  count(first_name),
  first_name
FROM actor
GROUP BY first_name
ORDER BY count(1) DESC;

WITH actor_rollup AS (SELECT
                        count(first_name) AS name_count,
                        first_name
                      FROM actor
                      GROUP BY first_name)
SELECT *
FROM actor_rollup;

WITH actor_rollup AS (SELECT
                        actor_id,
                        first_name,
                        last_name,
                        count(1)
                        OVER (PARTITION BY first_name) AS first_name_count,
                        count(1)
                        OVER (PARTITION BY last_name)  AS last_name_count
                      FROM actor)
SELECT *
FROM actor_rollup
ORDER BY actor_id;
---sales view
CREATE OR REPLACE VIEW raw_sales AS
  SELECT
    title,
    description,
    length,
    rating,
    payment.amount,
    payment_date,
    date_part('quarter', payment_date)                                           AS quarter,
    date_part('month', payment_date)                                             AS month,
    date_part('year', payment_date)                                              AS year,
    'Q' || date_part('quarter', payment_date) || date_part('year', payment_date) AS rental_quarter,
    cash_words(amount :: MONEY),
    to_tsvector(concat(title, description))                                      AS search_field
  FROM film
    INNER JOIN inventory ON inventory.film_id = film.film_id
    INNER JOIN rental ON rental.inventory_id = inventory.inventory_id
    INNER JOIN payment ON payment.rental_id = rental.rental_id;

SELECT *
FROM raw_sales;

SELECT
  title,
  quarter,
  year,
  sum(amount)
FROM raw_sales
GROUP BY title, quarter, year
ORDER BY title;

SELECT DISTINCT
  title,
  year,
  sum(amount)
  OVER (PARTITION BY title, year) AS "Quaterly Sales",
  sum(amount)
  OVER (PARTITION BY year)        AS "Total Quaterly Sales",
  sum(amount)
  OVER (PARTITION BY title, year) / sum(amount)
  OVER (PARTITION BY year) * 100  AS "Percent of total sales"
FROM raw_sales
ORDER BY title;

WITH sales_rollup AS (
    SELECT DISTINCT
      title,
      year,
      sum(amount)
      OVER (PARTITION BY title, year) AS "Quaterly Sales",
      sum(amount)
      OVER (PARTITION BY year)        AS "Total Quaterly Sales",
      sum(amount)
      OVER (PARTITION BY title, year) / sum(amount)
      OVER (PARTITION BY year) * 100  AS "Percent of total sales"

    FROM raw_sales)
SELECT sum("Percent of total sales")
FROM sales_rollup;

--q1 and q2

WITH sales_rollups AS (
    SELECT DISTINCT
      title,
      year,
      quarter,
      sum(amount)
      OVER (PARTITION BY title, year) AS "Quaterly Sales",
      sum(amount)
      OVER (PARTITION BY year)        AS "Total Quaterly Sales",
      sum(amount)
      OVER (PARTITION BY title, year) / sum(amount)
      OVER (PARTITION BY year) * 100  AS "Percent of total sales"
    FROM raw_sales
    order by title),
 q1_2007 AS (select * FROM sales_rollups where year=2007 and quarter=1),
 q2_2007 AS (select * FROM sales_rollups where year=2007 and quarter=2)

  select
    (SELECT sum("Percent of total sales") from q2_2007) as "q2",
    (SELECT sum("Percent of total sales") from q1_2007 )as "q1"
;


