import React from 'react';

import ContractCard from '../../components/contract-card/contract_card';
import Sidebar from '../../components/sidebar/sidebar';
import "./home_page.css";

const HomePage = () => {
  const contractList = [
    {'title':'Stadium Ticket', 'description':'Football is the most popular sport branch in the world and its popularity drags millions behind it. Therefore, we thought that a smart contract which is developed for the match tickets can be used worldwide. We thought it would facilitate ticket sales and control processes in stadiums.', 'image':'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Samsun_19_May%C4%B1s_Stadyumu_oturma_plan%C4%B1_%282018-19%29.svg/2560px-Samsun_19_May%C4%B1s_Stadyumu_oturma_plan%C4%B1_%282018-19%29.svg.png', 'path': '/stadium-ticket'},
    {'title':'Cafe Menu', 'description':'To get rid of the third party institutions (like banks) and real money assets (produced by the local states), we can digitize and decentralize this interaction and process between cafe owners and customers by using smart contracts.', 'image':'https://images.pexels.com/photos/276147/pexels-photo-276147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'path': '/cafe-menu'},
    {'title':'Clinical Trial Data', 'description':'Clinical trial data is a huge problem in the real life since the health records of the people does really matter and protected by the laws. It would be beneficial to produce a specialized smart contract, so that the data transfer between the parties can be carried out by taking advantage of smart contracts.', 'image':'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'path': '/clinical-trial-data'},
    {'title':'Numbered Event Ticket', 'description':'In most of the events, we have tickets with the exact seat numbers. This type of tickets are used in theaters, concerts, cinemas, special screenings and many more events. Therefore, we thought that having a contract specialized for numbered tickets is a good idea.', 'image':'https://images.unsplash.com/photo-1543257455-a880cca3bb40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3129&q=80', 'path': '/numbered-event-ticket'},
    {'title':'Clothing', 'description': 'Clothing sector is one of the largest economic sectors in the world nowadays. To be a part of the clothing industry, it is not necessary to own a chain-store, everyone can manufacture and sell clothes. So you can use this smart contract to make the process easier.', 'image':'https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'path': '/clothing'},
    {'title':'Game Objects', 'description':'Gaming is very popular among people from almost every age group. In games, there may be very rare or strong collectible items, characters. These objects can be found, owned and then put in the market. You can develop a smart contract for these use cases.', 'image':'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'path': '/game-objects'},
    {'title':'Insurance', 'description':'Insurance market is a top influencer within the global economy. Government institutions, companies, healthcare organizations need varieties of insurance. The most important advantage of using smart contracts in the insurance industry is to gain the people’ trust.', 'image':'https://images.pexels.com/photos/7688374/pexels-photo-7688374.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'path': '/insurance'},
    {'title':'Product Management (Supply Chain)', 'description':'This smart contract is similar to clothing smart contract and cafe menu smart contract both in use cases and content. We included this subject into our smart contract idea pool because we thought that it could be very useful to track supplies, distributions and manufacturing.', 'image':'https://images.pexels.com/photos/262353/pexels-photo-262353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'path': '/product-management'},
    {'title':'Time Slot', 'description':'Time is one of the most important valuable assets in our life. Everyone wants to manage their daily life in the most efficient way. Since smart contract is immutable, everything is certain. We are sure which time intervals can be owned and what happens if another address wants to own a time slot owned before.', 'image':'https://images.pexels.com/photos/760710/pexels-photo-760710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'path': '/time-slot'},
    {'title':'Travel Ticket', 'description':'Traveling is an important need for human beings. Many people go to work, school, meetings, etc. everyday by using inner-city transportation. Apart from this, lots of people travel intercity and internationally regularly. Since travel is another big industry, we decided to include a smart contract related to this sector as well.', 'image':'https://images.pexels.com/photos/69866/pexels-photo-69866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'path': '/travel-ticket'},
    {'title':'UnNumbered Event Ticket', 'description':'This smart contract is so similar to the stadium ticket smart contract. We thought that there are also other events that has unnumbered seats with blocks of categories apart from the matches in the stadiums. They also have the same ticketing logic with the matches in the stadiums with some differences.', 'image':'https://images.pexels.com/photos/167491/pexels-photo-167491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'path': '/unnumbered-event-ticket'},
    {'title':'Weighted Multiple Voting', 'description':'Voting is one of the most wanted actions to be integrated into blockchain technology. The biggest reason is that there are many security problems in real-life voting and the process cannot be carried out transparently and reliably. Smart contracts with multiple weighted vote feature can fix this problem.', 'image':'https://images.pexels.com/photos/7103199/pexels-photo-7103199.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'path': '/weighted-multiple-voting'},  
  ];
  
  return (
    <>
    <div style={{ display: 'flex', height: '100%', direction: 'ltr' }}>
    <Sidebar/>
      <main>
        <div className='container'>
             {
              contractList.map(contract =>
                  <a href={contract.path}>
                      <ContractCard
                          name={contract.title} description={contract.description} image={contract.image}>
                      </ContractCard>
                  </a>
              )
          }
         </div>
      </main>
      </div>
    </>
  );
};

export default HomePage;