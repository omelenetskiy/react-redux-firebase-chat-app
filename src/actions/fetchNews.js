export const SET_NEWS = 'SET_NEWS';

export const setNews = news => ({
  type: SET_NEWS,
  news,
});

const fetchNews = () => (dispatch) => {
  const url = 'https://newsapi.org/v2/top-headlines?country=ru&category=technology&apiKey=8ad9f8271d2943ec911506b4c9c21106';
  fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        return;
      }
      response.json().then((data) => {
        dispatch(setNews(data.articles));
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export default fetchNews;
