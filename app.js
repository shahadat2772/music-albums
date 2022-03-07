// FUN to get elelemt by id
const getById = (id) => {
  return document.getElementById(id);
};
// HANDLEING THE SEARCH
const handleSearch = () => {
  const keyword = getById("keyword");

  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showArtists(data.artists));
  // CLEARING INPUT VALUE
  getById("keyword").value = "";
};

// SHOW ARTISTS ON SITE
const showArtists = (data) => {
  // CLEARING ALBUMS TEXT CONTENT
  getById("albums").textContent = "";
  // CLEARING ARTISTS TEXT CONTENT
  getById("artists").textContent = "";
  const artistsContainer = getById("artists");
  data.forEach((artist) => {
    const artistDiv = document.createElement("div");
    artistDiv.classList.add("artist-card");
    artistDiv.innerHTML = `
    <div class="image-container">
    <div class="image-container-inner">
      <img
        src="${
          artist.strArtistThumb
            ? artist.strArtistThumb
            : "https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png"
        }"
        alt=""
      />
    </div>
  </div>
  <div class="info-container">
    <h1>${artist.strArtist}</h1>
    <p>Country: ${artist.strCountry ? artist.strCountry : "not available"}</p>
    <p>Style: ${artist.strGenre ? artist.strGenre : "not available"}</p>
  </div>
  <button class="album-button">
    <i class="fa-solid fa-compact-disc"></i>
    <p onclick="fetchAlbums('${
      artist.idArtist
    }')" class="button-title">Albums</p>
  </button>
    `;

    artistsContainer.appendChild(artistDiv);
  });
};

// FETCHING ALBUM
const fetchAlbums = (id) => {
  console.log(id);
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => shoeAlbums(data.album));
};

// SHOWIGN ALBUM TO THE SITE
const shoeAlbums = (albums) => {
  // CLEARING ALBUMS TEXT CONTENT
  getById("albums").textContent = "";
  const albumsContainer = getById("albums");
  albums.forEach((album) => {
    const albumDiv = document.createElement("div");
    albumDiv.classList.add("album");
    albumDiv.innerHTML = `
    <div class="album-image-container">
    <img
      src="${
        album.strAlbumThumb
          ? album.strAlbumThumb
          : "https://cdn.uppbeat.io/images/ub-track-placeholder.png"
      }"
      alt=""
    />
  </div>
  <div class="album-name">
    <h3>${album.strAlbum}</h3>
  </div>
    `;
    albumsContainer.appendChild(albumDiv);
  });
};
