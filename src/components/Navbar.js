import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  // Function to convert path names to readable titles
  const formatPathToTitle = (path) => {
    const formattedTitle = path
      .replace(/-/g, ' ') // Replace hyphens with spaces
      .replace(/\//g, '') // Remove slashes
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word

    return formattedTitle;
  };

  // Handle dynamic paths like '/hirer/view-developer/:id'
  const getTitleFromPath = (path) => {
    if (path.startsWith('/hirer/view-developer/')) {
      return 'View Developer Details';
    }
    return formatPathToTitle(path);
  };

  const title = getTitleFromPath(location.pathname);

  // Update the document title when the path changes
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <nav style={styles.navbar}>
      <h1 style={styles.title}>{title}</h1>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: 'blue',
    padding: '10px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60px', // Adjust the height as needed
  },
  title: {
    color: '#00b9e3',
    margin: '0',
    fontSize: '24px',
  },
};

export default Navbar;
