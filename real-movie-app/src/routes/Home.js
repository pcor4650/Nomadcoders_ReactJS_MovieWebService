// https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year 사용필요, 회사에서 접근 제한됨
import { useEffect, useState } from "react";
import styled from "styled-components";
import Movie from "../components/Movie";
import styles from "./Home.module.css";

const LoaderContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  async function getMovies() {
    try {
      const response = await fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.9&sort_by=year"
      );
      const json = await response.json();
      setMovies(json.data.movies);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  }

  // async - await 사용하여 fetch 이후 수정
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <LoaderContainer>
          <span>...Loading</span>
        </LoaderContainer>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(300px, 1fr)",
            gridGap: "50px",
            padding: "50px",
            width: "80%",
            paddingtop: "70px",
          }}
          className={styles.movies}
        >
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              year={movie.year}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
