import Link from 'next/link';
import BlogDB from './api/BlogDB.json';

export default function Blog() {
  const blogEntries = BlogDB.blog;

  return (
    <div>
      <h2>BLOG</h2>
      {
        blogEntries.sort((a, b) => b.num_date - a.num_date).map(entry => {
          return (
            <div className="blog_entry" key={entry.id}>
              <Link href="/blog">
                <a>
                  <h3>{entry.title}</h3>
                </a>
              </Link>
              <p>{entry.text}</p>
              <p>{entry.date}</p>
            </div>
          );
        })
      }
    </div>
  );
}