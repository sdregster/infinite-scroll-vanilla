let nextPage = 2;

const infiniteObserver = new IntersectionObserver(
  ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      loadPosts(nextPage++);
    }
  },
  {
    threshold: 1,
    rootMargin: '50px',
  },
);

function loadPosts(page = 1) {
  fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`)
    .then((response) => response.json())
    .then((posts) => {
      posts.forEach((post) => {
        const postCard = document.createElement('div');
        postCard.innerHTML = `
            <h3>${post.id}. ${post.title}</h3>
            <p>${post.body}</p>
        `;
        postCard.className = 'card';
        document.body.append(postCard);
      });

      const lastPostCard = document.querySelector('.card:last-child');

      if (lastPostCard) infiniteObserver.observe(lastPostCard);
    })
    .catch(console.error);
}

loadPosts();
