// src/components/OneToOneButton.js
import React from 'react';
import { Link } from 'react-router-dom';

function FriendSearch() {
  return (
    <div>
      <Link to="/search-find">
        <button>친구 검색</button>
      </Link>
    </div>
  );
}

export default FriendSearch;
