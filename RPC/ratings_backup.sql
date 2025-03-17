-- FUNCTION TO CHECK IF RATED
DROP FUNCTION IF EXISTS has_user_rated(uuid);

CREATE OR REPLACE FUNCTION has_user_rated(farmer_id_client uuid)
RETURNS boolean AS $$
DECLARE
    rating_exists boolean;
BEGIN
    SELECT EXISTS (
        SELECT 1
        FROM ratings_tb
        WHERE farmer_id = $1 AND entrep_id = auth.uid()
    ) INTO rating_exists;

    RETURN rating_exists;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

--FUNCTION TO CALCULATE RATING
DROP FUNCTION IF EXISTS calculate_rating(uid);

CREATE OR REPLACE FUNCTION calculate_rating(farmer_id_client uuid)
RETURNS numeric AS $$
DECLARE
    avg_rating numeric;
    has_rated boolean;
BEGIN

    SELECT AVG(rating) INTO avg_rating
    FROM ratings_tb
    WHERE farmer_id = farmer_id_client;

    RETURN COALESCE(avg_rating, 0); -- Return 0 if there are no ratings
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Create a view that calculates average ratings
DROP VIEW IF EXISTS farmer_ratings_average;

CREATE OR REPLACE VIEW farmer_ratings_average AS
SELECT 
  farmer_id,
  AVG(rating) AS average_rating
FROM 
  ratings_tb
WHERE 
  farmer_id IS NOT NULL 
  AND rating IS NOT NULL
GROUP BY 
  farmer_id;