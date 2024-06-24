import React, { useState } from 'react'
import Card from '../../components/Card'
import { IoAddCircleOutline } from "react-icons/io5";
import Addportfolio from '../../Modal/Addportfolio';
import './FreelancersPage.css';
export default function Protfolio() {
    const [cards, setCards] = useState([
        { title: 'Title of project 1', description: 'Description of project 1', completionTime: 'Completion Time of project 1', skills: 'html, css, javaScript' },
        { title: 'Title of project 2', description: 'Description of project 2', completionTime: 'Completion Time of project 2', skills: 'html, css, javaScript' },
        { title: 'Title of project 3', description: 'Description of project 3', completionTime: 'Completion Time of project 3', skills: 'html, css, javaScript' },
    ]);
    const [modalAddPortfolioOpen, setModalAddPortfolioOpen] = useState(false);

    const openAddPortfModal = () => {
        setModalAddPortfolioOpen(true);
    };

    const closeAddPortfModal = () => {
        setModalAddPortfolioOpen(false);
    };

    const handleSaveSkills = (data) => {
        // Perform save logic with the data object
        console.log('Saved data:', data);
    };
  return (
    <div className='d-flex justify-content-center'>
        <div className='portfolio'>
            <h1 className='py-3'>Portfolio</h1>
            <div className='add'>
                <button type='button' className='btn btn-primary' onClick={openAddPortfModal}><IoAddCircleOutline className='d-inline' />Protfolio</button>
            </div>
            <div className='cards d-flex justify-content-center flex-wrap'>
                {cards.map((card, index) => (
                    <Card key={index} title={card.title} description={card.description} completionTime={card.completionTime} skills={card.skills} />
                ))}
            </div>
        </div>
        <Addportfolio isOpen={modalAddPortfolioOpen} closeModal={closeAddPortfModal} saveData={handleSaveSkills}/>
    </div>
  )
}
