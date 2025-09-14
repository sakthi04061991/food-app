import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-custom-green text-white text-center p-4 mt-5">
      <div>
        &copy; {new Date().getFullYear()} Food Recipes. All rights reserved.
      </div>
    </footer>
  );
}
