import React, { useState } from 'react';
import './Nutrition.css';

const Nutrition = () => {
  const [selectedAge, setSelectedAge] = useState('adult');
  const [selectedWeight, setSelectedWeight] = useState('medium');
  const [activeTab, setActiveTab] = useState('feeding');
  const [calculatorWeight, setCalculatorWeight] = useState('');
  const [calculatorResult, setCalculatorResult] = useState(null);

  const nutritionData = {
    kitten: {
      calories: '200-300 per day',
      protein: '30-35%',
      fat: '15-20%',
      meals: '3-4 times daily',
      tips: ['High-quality kitten food', 'Frequent small meals', 'Always fresh water']
    },
    adult: {
      calories: '250-400 per day',
      protein: '26-30%',
      fat: '10-15%',
      meals: '2 times daily',
      tips: ['Maintain healthy weight', 'Monitor portion sizes', 'Regular feeding schedule']
    },
    senior: {
      calories: '200-300 per day',
      protein: '28-32%',
      fat: '12-18%',
      meals: '2-3 times daily',
      tips: ['Easy-to-digest food', 'Consider joint supplements', 'Monitor health closely']
    }
  };

  const foodTypes = [
    {
      type: 'Dry Food',
      icon: '🥘',
      pros: ['Long shelf life', 'Convenient', 'Helps clean teeth', 'Cost-effective'],
      cons: ['Lower moisture content', 'May contain fillers', 'Less palatable']
    },
    {
      type: 'Wet Food',
      icon: '🥫',
      pros: ['High moisture content', 'More palatable', 'Better for hydration', 'Higher protein'],
      cons: ['Shorter shelf life', 'More expensive', 'Can spoil quickly']
    },
    {
      type: 'Raw Food',
      icon: '🥩',
      pros: ['Natural diet', 'High protein', 'No preservatives', 'Better digestion'],
      cons: ['Risk of bacteria', 'Expensive', 'Time-consuming', 'Requires knowledge']
    }
  ];

  const toxicFoods = [
    { name: 'Chocolate', danger: 'High', reason: 'Contains theobromine' },
    { name: 'Onions & Garlic', danger: 'High', reason: 'Damages red blood cells' },
    { name: 'Grapes & Raisins', danger: 'High', reason: 'Kidney failure' },
    { name: 'Tuna (large amounts)', danger: 'Medium', reason: 'Mercury poisoning' },
    { name: 'Milk & Dairy', danger: 'Low', reason: 'Lactose intolerance' },
    { name: 'Raw Eggs', danger: 'Medium', reason: 'Salmonella risk' }
  ];

  const calculateCalories = () => {
    if (!calculatorWeight || calculatorWeight <= 0) return;
    
    const weight = parseFloat(calculatorWeight);
    let baseCalories;
    
    // Basic calculation: 70 * (weight in kg)^0.75
    if (selectedWeight === 'small') baseCalories = weight * 60;
    else if (selectedWeight === 'medium') baseCalories = weight * 70;
    else baseCalories = weight * 80;

    // Adjust for age
    if (selectedAge === 'kitten') baseCalories *= 1.5;
    else if (selectedAge === 'senior') baseCalories *= 0.9;

    setCalculatorResult(Math.round(baseCalories));
  };

  return (
    <div className="nutrition-page">
      {/* Header */}
      <header className="nutrition-header">
        <div className="header-content">
          <button 
            onClick={() => window.history.back()} 
            className="back-button"
          >
            ← Back to Home
          </button>
          <h1 className="page-title">🥘 Cat Nutrition Guide</h1>
          <p className="page-subtitle">Everything you need to know about feeding your feline friend</p>
        </div>
      </header>

      {/* Interactive Tabs */}
      <section className="tabs-section">
        <div className="container">
          <div className="tabs-nav">
            {[
              { id: 'feeding', label: 'Feeding Guide', icon: '🍽️' },
              { id: 'calculator', label: 'Calorie Calculator', icon: '🧮' },
              { id: 'foods', label: 'Food Types', icon: '🥘' },
              { id: 'toxic', label: 'Toxic Foods', icon: '⚠️' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              >
                <span className="tab-icon">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="tab-content">
        <div className="container">
          
          {/* Feeding Guide Tab */}
          {activeTab === 'feeding' && (
            <div className="feeding-guide">
              <h2>Feeding Guidelines by Age</h2>
              
              {/* Age Selector */}
              <div className="age-selector">
                {Object.keys(nutritionData).map(age => (
                  <button
                    key={age}
                    onClick={() => setSelectedAge(age)}
                    className={`age-button ${selectedAge === age ? 'active' : ''}`}
                  >
                    {age.charAt(0).toUpperCase() + age.slice(1)} Cat
                  </button>
                ))}
              </div>

              {/* Nutrition Info */}
              <div className="nutrition-info">
                <div className="nutrition-grid">
                  <div className="nutrition-card">
                    <div className="card-icon">🔥</div>
                    <h3>Daily Calories</h3>
                    <p>{nutritionData[selectedAge].calories}</p>
                  </div>
                  <div className="nutrition-card">
                    <div className="card-icon">🥩</div>
                    <h3>Protein</h3>
                    <p>{nutritionData[selectedAge].protein}</p>
                  </div>
                  <div className="nutrition-card">
                    <div className="card-icon">🧈</div>
                    <h3>Fat</h3>
                    <p>{nutritionData[selectedAge].fat}</p>
                  </div>
                  <div className="nutrition-card">
                    <div className="card-icon">⏰</div>
                    <h3>Meals</h3>
                    <p>{nutritionData[selectedAge].meals}</p>
                  </div>
                </div>

                <div className="tips-section">
                  <h3>💡 Tips for {selectedAge.charAt(0).toUpperCase() + selectedAge.slice(1)} Cats</h3>
                  <ul className="tips-list">
                    {nutritionData[selectedAge].tips.map((tip, index) => (
                      <li key={index} className="tip-item">{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Calorie Calculator Tab */}
          {activeTab === 'calculator' && (
            <div className="calculator-section">
              <h2>🧮 Daily Calorie Calculator</h2>
              <div className="calculator-card">
                <div className="calculator-inputs">
                  <div className="input-group">
                    <label>Cat's Age Group:</label>
                    <select 
                      value={selectedAge} 
                      onChange={(e) => setSelectedAge(e.target.value)}
                      className="select-input"
                    >
                      <option value="kitten">Kitten (0-1 year)</option>
                      <option value="adult">Adult (1-7 years)</option>
                      <option value="senior">Senior (7+ years)</option>
                    </select>
                  </div>
                  
                  <div className="input-group">
                    <label>Activity Level:</label>
                    <select 
                      value={selectedWeight} 
                      onChange={(e) => setSelectedWeight(e.target.value)}
                      className="select-input"
                    >
                      <option value="small">Low Activity</option>
                      <option value="medium">Moderate Activity</option>
                      <option value="large">High Activity</option>
                    </select>
                  </div>
                  
                  <div className="input-group">
                    <label>Weight (kg):</label>
                    <input
                      type="number"
                      value={calculatorWeight}
                      onChange={(e) => setCalculatorWeight(e.target.value)}
                      placeholder="Enter weight in kg"
                      className="number-input"
                      step="0.1"
                      min="0.5"
                      max="15"
                    />
                  </div>
                  
                  <button onClick={calculateCalories} className="calculate-button">
                    Calculate Daily Calories
                  </button>
                </div>

                {calculatorResult && (
                  <div className="calculator-result">
                    <div className="result-card">
                      <h3>🎯 Recommended Daily Calories</h3>
                      <div className="result-number">{calculatorResult}</div>
                      <p className="result-note">
                        This is an estimate. Consult your veterinarian for personalized advice.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Food Types Tab */}
          {activeTab === 'foods' && (
            <div className="food-types-section">
              <h2>🥘 Types of Cat Food</h2>
              <div className="food-types-grid">
                {foodTypes.map((food, index) => (
                  <div key={index} className="food-type-card">
                    <div className="food-icon">{food.icon}</div>
                    <h3>{food.type}</h3>
                    
                    <div className="pros-cons">
                      <div className="pros">
                        <h4>✅ Pros:</h4>
                        <ul>
                          {food.pros.map((pro, i) => (
                            <li key={i}>{pro}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="cons">
                        <h4>❌ Cons:</h4>
                        <ul>
                          {food.cons.map((con, i) => (
                            <li key={i}>{con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Toxic Foods Tab */}
          {activeTab === 'toxic' && (
            <div className="toxic-foods-section">
              <h2>⚠️ Foods Toxic to Cats</h2>
              <p className="warning-text">
                These foods should NEVER be given to cats as they can cause serious health problems or death.
              </p>
              
              <div className="toxic-foods-list">
                {toxicFoods.map((food, index) => (
                  <div key={index} className={`toxic-food-item ${food.danger.toLowerCase()}`}>
                    <div className="danger-level">
                      <span className={`danger-badge ${food.danger.toLowerCase()}`}>
                        {food.danger} Risk
                      </span>
                    </div>
                    <div className="food-info">
                      <h3>{food.name}</h3>
                      <p>{food.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="emergency-info">
                <h3>🚨 Emergency Contact</h3>
                <p>If your cat has consumed any toxic food, contact your veterinarian immediately or call the Pet Poison Helpline: <strong>(855) 764-7661</strong></p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Nutrition;