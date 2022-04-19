import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
function Breadcrumbs() {
  const router = useRouter();
  let parts = router.asPath.split('?')[0].split('/').slice(1);

  if (['view', 'edit'].includes(parts[parts.length - 2])) {
    parts = parts.slice(0, -1);
  }

  const buildLink = (part, index) => {
    if (index === parts.length - 1) return part;
    let url = '';
    for (let i = 0; i <= index; i++) {
      url += `/${parts[i]}`;
    }
    const titles = {
      admin: 'Home',
    };
    const title = titles[part] ?? part;
    return (
      <Link href={url}>
        <a>{title}</a>
      </Link>
    );
  };
  return (
    <div className="w-full mb-4">
      <ol className="list-reset flex text-grey-dark uppercase text-xs">
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {index < parts.length - 1 ? (
              <>
                <li key={part}>{buildLink(part, index)}</li>

                <li>
                  <span className="mx-2">/</span>
                </li>
              </>
            ) : (
              <li>{buildLink(part, index)}</li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </div>
  );
}

export default Breadcrumbs;
