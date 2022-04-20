import Link from 'next/link';
import { useRouter } from 'next/router';

function MainLinks() {
  const router = useRouter();
  const country = router.query.country;
  let pages = ['Women', 'Main', 'Development', 'Talent'];
  if (country == 'kids') {
    pages = ['Girls', 'Boys', 'Main', 'Development', 'Talent'];
  }
  return (
    <ul>
      {pages.map((page) => {
        const slug = page == 'Main' ? `/${country}` : `/${country}/${page.toLowerCase()}`;
        const className = slug === router.asPath ? 'active' : '';
        return (
          <li key={page} className={className}>
            <Link href={slug}>
              <a>{page}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default MainLinks;
