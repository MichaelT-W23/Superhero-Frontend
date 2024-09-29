import React, { useState, useEffect } from 'react';
import { UserSuperheroService } from '../services/userSuperheroService';
import { useAuth } from '../states/auth';
import SuperheroCard from '../components/SuperheroCard';
import styles from '../styles/views/HomePage.module.css';

function HomePage() {
  const { user } = useAuth();
  const [superheroes, setSuperheroes] = useState([]);

  useEffect(() => {
    const fetchSuperheroes = async () => {
      try {
        const data = await UserSuperheroService.getUserSuperheroes(user.userId);
        if (data) {
          setSuperheroes(data);
        }
      } catch (error) {
        console.error('Failed to fetch superheroes:', error);
      }
    };

    if (user && user.userId) {
      fetchSuperheroes();
    }
  }, [user]);

  return (
    <div>
      <div className={styles['superheroes-grid']}>
        {superheroes.length > 0 ? (
          superheroes.map((superhero) => (
            <SuperheroCard key={superhero.superId} superhero={superhero} canNavigate={true} />
          ))
        ) : (
          <p>Loading superheroes...</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
