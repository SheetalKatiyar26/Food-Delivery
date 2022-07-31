import React, { useEffect, useState } from "react";

import Classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://food-delivery-6cad8-default-rtdb.firebaseio.com/tasks/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went Wrong!!");
      }

      const responseData = await response.json();

      const loadedData = [];

      for (const key in responseData) {
        loadedData.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setLoading(false);

      setMeals(loadedData);
    };
    fetchData().catch((error) => {
      setLoading(false);
      setHttpError(error.message);
    });
  }, []);
  const Meals = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={Classes.meals}>
      <Card>
        {!loading && !httpError && <ul>{Meals}</ul>}
        {loading && !httpError && <p className={Classes.loading}>Loading...</p>}
        {httpError && <h2 className={Classes.error}>{httpError}</h2>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
