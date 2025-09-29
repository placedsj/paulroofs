// Assuming this is the structure, the actual code may vary

import React from 'react';

const Page = () => {
  return (
    <div>
      <nav>
        <h1>
          <img src="/images/logo-round.png" alt="Paul's Roofing Logo" />
        </h1>
      </nav>
      
      {/* Other content... */}

      <footer>
        {/* Updated emails */}
        <p>Contact us at: <a href="mailto:paul@paulroofs.com">paul@paulroofs.com</a></p>
        <p>Or you can reach out to: <a href="mailto:paul@paulroofs.com">paul@paulroofs.com</a></p>
        <p>Boss Quarters Password: Paul1234!!</p>
        {/* Footer branding */}
        <img src="/images/logo-round.png" alt="Paul's Roofing Logo" />
      </footer>
    </div>
  );
};

export default Page;