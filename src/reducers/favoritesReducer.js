const STORAGE_KEY = 'photo-gallery-favorites';

const loadFavoritesFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // Silent fail if localStorage is not available
  }
};

export const initialState = {
  favorites: loadFavoritesFromStorage(),
};

export const favoritesReducer = (state, action) => {
  let newState;

  switch (action.type) {
    case 'ADD_FAVORITE': {
      const exists = state.favorites.find((photo) => photo.id === action.payload.id);
      if (exists) {
        newState = state;
      } else {
        newState = {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
      }
      break;
    }

    case 'REMOVE_FAVORITE': {
      newState = {
        ...state,
        favorites: state.favorites.filter((photo) => photo.id !== action.payload),
      };
      break;
    }

    case 'TOGGLE_FAVORITE': {
      const isFavorite = state.favorites.some((photo) => photo.id === action.payload.id);
      if (isFavorite) {
        newState = {
          ...state,
          favorites: state.favorites.filter((photo) => photo.id !== action.payload.id),
        };
      } else {
        newState = {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
      }
      break;
    }

    default:
      newState = state;
  }

  if (newState !== state) {
    saveFavoritesToStorage(newState.favorites);
  }

  return newState;
};
