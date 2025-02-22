import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const CustomPostersContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f6f9fc, #e9ecef);
  padding: 5rem 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #c72032, #871d1d);
  }

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const Title = styled.h2`
  font-size: 3rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 800;
  animation: ${fadeIn} 0.6s ease-out;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: linear-gradient(135deg, #c72032, #871d1d);
    margin: 1rem auto;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 2rem;
  }
`;

const FormContainer = styled.form`
  max-width: 800px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 0.6s ease-out;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: translateX(-100%);
    transition: 0.5s;
  }

  &:hover::before {
    transform: translateX(100%);
  }

  @media (max-width: 768px) {
    padding: 2rem;
    gap: 1.5rem;
  }
`;

const InputGroup = styled.div`
  animation: ${slideIn} 0.5s ease-out;
  animation-fill-mode: backwards;

  &:nth-child(1) { animation-delay: 0.2s; }
  &:nth-child(2) { animation-delay: 0.4s; }
  &:nth-child(3) { animation-delay: 0.6s; }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.8rem;
  color: #2c3e50;
  font-weight: 600;
  font-size: 1.1rem;
`;

const FileInput = styled.input`
  width: 100%;
  padding: 1rem;
  background: #f8fafc;
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f1f5f9;
    border-color: #c72032;
  }

  &::file-selector-button {
    padding: 0.8rem 1.5rem;
    background: linear-gradient(135deg, #c72032, #871d1d);
    border: none;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    margin-right: 1rem;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(199, 32, 50, 0.3);
    }
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  background: #f8fafc;

  &:focus {
    outline: none;
    border-color: #c72032;
    box-shadow: 0 0 0 4px rgba(199, 32, 50, 0.1);
    background: white;
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const FilePreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 2px solid #e1e8ed;
  margin-top: 1rem;
  animation: ${fadeIn} 0.3s ease-out;
`;

const FileName = styled.span`
  color: #2c3e50;
  font-weight: 500;
`;

const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #dc2626;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
  }
`;

const SubmitButton = styled.button`
  padding: 1rem;
  background: linear-gradient(135deg, #c72032, #871d1d);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(199, 32, 50, 0.3);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const CustomPosters = () => {
  const [formData, setFormData] = useState({
    image: null,
    description: '',
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDeleteFile = () => {
    setFormData({ ...formData, image: null });
    document.getElementById("file-input").value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ image: null, description: '' });
  };

  return (
    <CustomPostersContainer>
      <Title>Create Your Custom Poster</Title>
      <FormContainer onSubmit={handleSubmit}>
        <InputGroup>
          <Label>Upload Your Design</Label>
          <FileInput
            type="file"
            name="image"
            id="file-input"
            accept="image/*"
            onChange={handleChange}
            required={!formData.image}
          />
          {formData.image && (
            <FilePreview>
              <FileName>{formData.image.name}</FileName>
              <DeleteButton type="button" onClick={handleDeleteFile}>
                Delete
              </DeleteButton>
            </FilePreview>
          )}
        </InputGroup>

        <InputGroup>
          <Label>Design Description</Label>
          <TextArea
            name="description"
            placeholder="Tell us about your design idea and any specific requirements..."
            value={formData.description}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <SubmitButton type="submit">
          Submit Your Design
        </SubmitButton>
      </FormContainer>
    </CustomPostersContainer>
  );
};

export default CustomPosters;