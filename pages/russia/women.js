import Footer from 'components/Footer';
import Nav from 'components/Nav';
import React from 'react';
import Link from 'next/link';

function Women() {
  return (
    <>
      <Nav className="relative" />
      <div className="content mt-[200px]">
        <main>
          <div className="container">
            <div className="text-center">
              <h1>Women</h1>
            </div>
            <div className="grid-thumbs">
              <Link href="/russia/profile">
                <a>
                  <div>
                    <img src="/images/models/1.jpg" alt="" />
                    <span>Amida Adan</span>
                  </div>
                </a>
              </Link>
              <Link href="/russia/profile">
                <a>
                  <div>
                    <img src="/images/models/2.jpg" alt="" />
                    <span>Amida Adan</span>
                  </div>
                </a>
              </Link>
              <Link href="/russia/profile">
                <a>
                  <div>
                    <img src="/images/models/3.jpg" alt="" />
                    <span>Amida Adan</span>
                  </div>
                </a>
              </Link>
              <Link href="/russia/profile">
                <a>
                  <div>
                    <img src="/images/models/4.jpg" alt="" />
                    <span>Amida Adan</span>
                  </div>
                </a>
              </Link>
              <Link href="/russia/profile">
                <a>
                  <div>
                    <img src="/images/models/5.jpg" alt="" />
                    <span>Amida Adan</span>
                  </div>
                </a>
              </Link>
              <Link href="/russia/profile">
                <a>
                  <div>
                    <img src="/images/models/6.jpg" alt="" />
                    <span>Amida Adan</span>
                  </div>
                </a>
              </Link>
              <Link href="/russia/profile">
                <a>
                  <div>
                    <img src="/images/models/1.jpg" alt="" />
                    <span>Amida Adan</span>
                  </div>
                </a>
              </Link>
              <Link href="/russia/profile">
                <a>
                  <div>
                    <img src="/images/models/2.jpg" alt="" />
                    <span>Amida Adan</span>
                  </div>
                </a>
              </Link>
              <Link href="/russia/profile">
                <a>
                  <div>
                    <img src="/images/models/3.jpg" alt="" />
                    <span>Amida Adan</span>
                  </div>
                </a>
              </Link>
              <Link href="/russia/profile">
                <a>
                  <div>
                    <img src="/images/models/4.jpg" alt="" />
                    <span>Amida Adan</span>
                  </div>
                </a>
              </Link>
              <Link href="/russia/profile">
                <a>
                  <div>
                    <img src="/images/models/5.jpg" alt="" />
                    <span>Amida Adan</span>
                  </div>
                </a>
              </Link>
              <Link href="/russia/profile">
                <a>
                  <div>
                    <img src="/images/models/6.jpg" alt="" />
                    <span>Amida Adan</span>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Women;
