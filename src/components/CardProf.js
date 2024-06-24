import React from 'react'
import ProfileCard from './Select';
function CardProf() {
    const profiles = [
        { name: 'Youssef Elmahallawy', location: 'Talkhah', price: 20, rate: 4.0, image: 'path_to_image1.jpg' },
        { name: 'Youssef Elsayed', location: 'Aswan', price: 15, rate: 3.0, image: 'path_to_image2.jpg' },
        { name: 'Eslam Mohamed', location: 'Aswan', price: 25, rate: 5.0, image: 'path_to_image3.jpg' },
        { name: 'Mohamed Saeed', location: 'Dubai', price: 15, rate: 3.0, image: 'path_to_image4.jpg' },
        { name: 'Youssef Elsayed', location: 'Aswan', price: 15, rate: 3.0, image: 'path_to_image5.jpg' },
        { name: 'Youssef Elmahallawy', location: 'Alexandria', price: 10, rate: 2.0, image: 'path_to_image6.jpg' },
      ];

      
  return (
        <div style={{ display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center'}}>
            {profiles.map((profile, index) => (
                <ProfileCard
                key={index}
                name={profile.name}
                location={profile.location}
                price={profile.price}
                rate={profile.rate}
                image={profile.image}
                style={{
                    margin: '10px', /* add some margin between cards */
                    flexBasis: '30%', /* set the initial width of each card */
                  }}
                />
            ))}
        </div>
  )
}

export default CardProf;