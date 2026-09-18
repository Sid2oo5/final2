import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bac?w=400", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400", description: "Easy to grow and propagate.", cost: "$12" },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?w=400", description: "Removes indoor toxin pollutants.", cost: "$18" },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=400", description: "Adds humidity and greenery.", cost: "$14" },
        { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1598880940371-c756e015fea1?w=400", description: "Glossy dark foliage.", cost: "$20" },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400", description: "Medicinal gel and purifies air.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=400", description: "Calming scent and purple blooms.", cost: "$22" },
        { name: "Mint", image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400", description: "Fresh herb for culinary use.", cost: "$8" },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=400", description: "Fragrant woody aroma.", cost: "$12" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729800017-a9f159f2012d?w=400", description: "Sweet night-blooming scent.", cost: "$25" },
        { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400", description: "Refreshing aromatic leaves.", cost: "$18" },
        { name: "Thyme", image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400", description: "Fragrant garden herb.", cost: "$9" }
      ]
    },
    {
      category: "Low Maintenance",
      plants: [
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400", description: "Tolerates low light and drought.", cost: "$25" },
        { name: "Pothos", image: "https://images.unsplash.com/photo-1595351298020-3a4816535ec8?w=400", description: "Vining plant easy to manage.", cost: "$12" },
        { name: "Jade Plant", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400", description: "Succulent symbol of good luck.", cost: "$15" },
        { name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400", description: "Extremely durable dark leaves.", cost: "$20" },
        { name: "Haworthia", image: "https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400", description: "Compact slow-growing succulent.", cost: "$10" },
        { name: "Chinese Evergreen", image: "https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?w=400", description: "Patterned indoor foliage.", cost: "$16" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isAddedToCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  return (
    <div className="product-list-container">
      <nav className="navbar">
        <div className="nav-logo" onClick={onHomeClick}>
          <h2>Paradise Nursery</h2>
        </div>
        <div className="nav-links">
          <button className="nav-btn" onClick={() => setShowCart(false)}>Plants</button>
          <button className="nav-btn cart-btn" onClick={() => setShowCart(true)}>
            🛒 Cart <span className="cart-badge">{totalQuantity}</span>
          </button>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="catalog">
          {plantsArray.map((categoryObj, idx) => (
            <div key={idx} className="category-section">
              <h2 className="category-title">{categoryObj.category}</h2>
              <div className="plant-grid">
                {categoryObj.plants.map((plant, pIdx) => (
                  <div key={pIdx} className="plant-card">
                    <img src={plant.image} alt={plant.name} className="plant-img" />
                    <h3>{plant.name}</h3>
                    <p className="plant-desc">{plant.description}</p>
                    <p className="plant-cost">{plant.cost}</p>
                    <button
                      className={`add-btn ${isAddedToCart(plant.name) ? 'disabled' : ''}`}
                      disabled={isAddedToCart(plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {isAddedToCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;