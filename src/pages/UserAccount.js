import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const AccountContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f6f9fc, #e9ecef);
  padding: 2rem;
`;

const AccountWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  animation: ${fadeIn} 0.6s ease-out;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 2.8rem;
    color: #2c3e50;
    margin-bottom: 1rem;
    font-weight: 800;

    &::after {
      content: '';
      display: block;
      width: 80px;
      height: 4px;
      background: linear-gradient(135deg, #c72032, #871d1d);
      margin: 1rem auto;
      border-radius: 2px;
    }
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 1rem;
  overflow-x: auto;

  @media (max-width: 768px) {
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Tab = styled.button`
  padding: 1rem 2rem;
  border: none;
  background: ${props => props.active ? 'linear-gradient(135deg, #c72032, #871d1d)' : 'white'};
  color: ${props => props.active ? 'white' : '#2c3e50'};
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ContentSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const ProfileSection = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileImage = styled.div`
  text-align: center;

  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
    border: 4px solid white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`;

const FileInput = styled.input`
  display: none;
`;

const UploadButton = styled.label`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: #f1f5f9;
  color: #2c3e50;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: #e2e8f0;
  }
`;

const ProfileForm = styled.form`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #2c3e50;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #c72032;
    box-shadow: 0 0 0 4px rgba(199, 32, 50, 0.1);
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #c72032, #871d1d);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(199, 32, 50, 0.3);
  }

  &:disabled {
    background: #e2e8f0;
    cursor: not-allowed;
    transform: none;
  }
`;

const OrdersGrid = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const OrderCard = styled.div`
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: #c72032;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const OrderStatus = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  background: ${props => {
    switch (props.status.toLowerCase()) {
      case 'delivered':
        return '#dcfce7';
      case 'processing':
        return '#fef9c3';
      case 'cancelled':
        return '#fee2e2';
      default:
        return '#f1f5f9';
    }
  }};
  color: ${props => {
    switch (props.status.toLowerCase()) {
      case 'delivered':
        return '#166534';
      case 'processing':
        return '#854d0e';
      case 'cancelled':
        return '#991b1b';
      default:
        return '#475569';
    }
  }};
`;

const OrderItems = styled.div`
  display: grid;
  gap: 1rem;
`;

const OrderItem = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  img {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    
    img {
      width: 100%;
      height: 200px;
    }
  }
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.h4`
  margin: 0;
  color: #2c3e50;
  font-weight: 600;
`;

const ItemPrice = styled.p`
  margin: 0.5rem 0;
  color: #64748b;
`;

const PreferencesGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

const PreferenceCard = styled.div`
  background: ${props => props.active ? '#f1f5f9' : 'white'};
  border: 2px solid ${props => props.active ? '#c72032' : '#e2e8f0'};
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  h3 {
    margin: 0 0 0.5rem 0;
    color: #2c3e50;
  }

  p {
    margin: 0;
    color: #64748b;
  }
`;

const SuccessMessage = styled.div`
  background: #dcfce7;
  color: #166534;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ErrorMessage = styled.div`
  background: #fee2e2;
  color: #991b1b;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  animation: ${fadeIn} 0.3s ease-out;
`;

const UserAccount = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    address: '123 Street, City, Country',
    image: 'https://via.placeholder.com/200'
  });

  const [orders] = useState([
    {
      id: '1',
      date: '2024-01-15',
      status: 'Delivered',
      total: 129.99,
      items: [
        { id: 1, name: 'BMW Poster', price: 29.99, image: 'https://via.placeholder.com/60' },
        { id: 2, name: 'Car Sticker Pack', price: 15.99, image: 'https://via.placeholder.com/60' }
      ]
    },
    {
      id: '2',
      date: '2024-01-10',
      status: 'Processing',
      total: 89.99,
      items: [
        { id: 3, name: 'Vintage Racing Poster', price: 34.99, image: 'https://via.placeholder.com/60' }
      ]
    }
  ]);

  const [preferences, setPreferences] = useState({
    notifications: true,
    newsletter: false,
    darkMode: false
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
    }
    // Load user data from localStorage or API
  }, [navigate]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('userProfile', JSON.stringify(profile));
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    }
    setLoading(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePreferenceToggle = (key) => {
    setPreferences(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem('userPreferences', JSON.stringify(updated));
      return updated;
    });
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <AccountContainer>
      <AccountWrapper>
        <Header>
          <h1>My Account</h1>
        </Header>

        <TabContainer>
          <Tab 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </Tab>
          <Tab 
            active={activeTab === 'orders'} 
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </Tab>
          <Tab 
            active={activeTab === 'preferences'} 
            onClick={() => setActiveTab('preferences')}
          >
            Preferences
          </Tab>
        </TabContainer>

        {message.text && (
          <div>
            {message.type === 'success' ? (
              <SuccessMessage>{message.text}</SuccessMessage>
            ) : (
              <ErrorMessage>{message.text}</ErrorMessage>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <ContentSection>
            <ProfileSection>
              <ProfileImage>
                <img src={profile.image} alt="Profile" />
                <FileInput
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <UploadButton htmlFor="profileImage">
                  Change Photo
                </UploadButton>
              </ProfileImage>
              
              <ProfileForm onSubmit={handleProfileUpdate}>
                <FormGroup>
                  <Label>Full Name</Label>
                  <Input 
                    type="text" 
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Email</Label>
                  <Input 
                    type="email" 
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Phone</Label>
                  <Input 
                    type="tel" 
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Address</Label>
                  <Input 
                    type="text" 
                    value={profile.address}
                    onChange={(e) => setProfile({...profile, address: e.target.value})}
                  />
                </FormGroup>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </ProfileForm>
            </ProfileSection>
          </ContentSection>
        )}

        {activeTab === 'orders' && (
          <ContentSection>
            <OrdersGrid>
              {orders.map(order => (
                <OrderCard key={order.id}>
                  <OrderHeader>
                    <div>
                      <h3>Order #{order.id}</h3>
                      <p>{order.date}</p>
                    </div>
                    <div>
                      <OrderStatus status={order.status}>{order.status}</OrderStatus>
                      <p>Total: ${order.total.toFixed(2)}</p>
                    </div>
                  </OrderHeader>
                  <OrderItems>
                    {order.items.map(item => (
                      <OrderItem key={item.id}>
                        <img src={item.image} alt={item.name} />
                        <ItemDetails>
                          <ItemName>{item.name}</ItemName>
                          <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
                        </ItemDetails>
                      </OrderItem>
                    ))}
                  </OrderItems>
                </OrderCard>
              ))}
            </OrdersGrid>
          </ContentSection>
        )}

        {activeTab === 'preferences' && (
          <ContentSection>
            <PreferencesGrid>
              <PreferenceCard 
                active={preferences.notifications}
                onClick={() => handlePreferenceToggle('notifications')}
              >
                <h3>Push Notifications</h3>
                <p>Receive updates about your orders and promotions</p>
              </PreferenceCard>
              <PreferenceCard 
                active={preferences.newsletter}
                onClick={() => handlePreferenceToggle('newsletter')}
              >
                <h3>Newsletter</h3>
                <p>Subscribe to our newsletter for latest updates</p>
              </PreferenceCard>
              <PreferenceCard 
                active={preferences.darkMode}
                onClick={() => handlePreferenceToggle('darkMode')}
              >
                <h3>Dark Mode</h3>
                <p>Switch between light and dark theme</p>
              </PreferenceCard>
            </PreferencesGrid>
          </ContentSection>
        )}
      </AccountWrapper>
    </AccountContainer>
  );
};

export default UserAccount;