import React from 'react';

import ContractCard from '../../components/contract-card/contract_card';
import Sidebar from '../../components/sidebar/sidebar';
import "./home_page.css";

const HomePage = () => {
  const contractList = [
    {'title':'Stadium Ticket', 'description':'Football is the most popular sport branch in the world and its popularity drags millions behind it. Therefore, we thought that a smart contract which is developed for the match tickets can be used worldwide. We thought it would facilitate ticket sales and control processes in stadiums.', 'image':'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Samsun_19_May%C4%B1s_Stadyumu_oturma_plan%C4%B1_%282018-19%29.svg/2560px-Samsun_19_May%C4%B1s_Stadyumu_oturma_plan%C4%B1_%282018-19%29.svg.png', 'path': '/stadium-ticket'},
    {'title':'Cafe Menu', 'description':'To get rid of the third party institutions (like banks) and real money assets (produced by the local states), we can digitize and decentralize this interaction and process between cafe owners and customers by using smart contracts.', 'image':'https://images.squarespace-cdn.com/content/v1/58fe921246c3c4afb89c36e5/1601070645655-JMREMZFTU1Z294GMX5FW/digital+restaurant+menu%2C+menu+board%2C+restaurant+menu+board%2C+digital+signage%2C+XOGO', 'path': '/cafe-menu'},
    {'title':'Clinical Trial Data', 'description':'Clinical trial data is a huge problem in the real life since the health records of the people does really matter and protected by the laws. It would be beneficial to produce a specialized smart contract, so that the data transfer between the parties can be carried out by taking advantage of smart contracts.', 'image':'https://dev.rodpub.com/images/157/626_main.jpg', 'path': '/clinical-trial-data'},
    {'title':'Numbered Event Ticket', 'description':'In most of the events, we have tickets with the exact seat numbers. This type of tickets are used in theaters, concerts, cinemas, special screenings and many more events. Therefore, we thought that having a contract specialized for numbered tickets is a good idea.', 'image':'https://plymouthartscinema.org/wp-content/uploads/2021/09/Access-seating-plan-Sep-2021-1000x752.png', 'path': '/numbered-event-ticket'},
    {'title':'Clothing', 'description': 'Clothing sector is one of the largest economic sectors in the world nowadays. To be a part of the clothing industry, it is not necessary to own a chain-store, everyone can manufacture and sell clothes. So you can use this smart contract to make the process easier.', 'image':'https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?cs=srgb&dl=pexels-ksenia-chernaya-3965545.jpg&fm=jpg', 'path': '/clothing'},
    {'title':'Game Objects', 'description':'Gaming is very popular among people from almost every age group. In games, there may be very rare or strong collectible items, characters. These objects can be found, owned and then put in the market. You can develop a smart contract for these use cases.', 'image':'https://images.hive.blog/p/4PYjjVwJ1UdtC5FGc4dbeF1E4FitPfBjR7UqkAYqBLuRR1wQLaLaSR6WKTaVyL6yNkLXPUTGEDkZK4iHeRji1ddK7VgLfk1JxYUrC5XPe14?format=match&mode=fit', 'path': '/game-objects'},
    {'title':'Insurance', 'description':'Insurance market is a top influencer within the global economy. Government institutions, companies, healthcare organizations need varieties of insurance. The most important advantage of using smart contracts in the insurance industry is to gain the people’ trust.', 'image':'https://prod-sitefinity-library.kappro.com/images/default-source/career-corner/starting-career/insurance-producer_16.jpg?sfvrsn=d94c9803_5', 'path': '/insurance'},
    {'title':'Product Management', 'description':'This smart contract is similar to clothing smart contract and cafe menu smart contract both in use cases and content. We included this subject into our smart contract idea pool because we thought that it could be very useful to track supplies, distributions and manufacturing.', 'image':'https://www.productboard.com/wp-content/uploads/2022/03/product-excellence.png', 'path': '/product-management'},
    {'title':'Time Slot', 'description':'Time is one of the most important valuable assets in our life. Everyone wants to manage their daily life in the most efficient way. Since smart contract is immutable, everything is certain. We are sure which time intervals can be owned and what happens if another address wants to own a time slot owned before.', 'image':'https://uploads-ssl.webflow.com/6232d983fb6808367ba19d67/6256c34a22c973d322a114d6_TimeSlotManager.png', 'path': '/time-slot'},
    {'title':'Travel Ticket', 'description':'Traveling is an important need for human beings. Many people go to work, school, meetings, etc. everyday by using inner-city transportation. Apart from this, lots of people travel intercity and internationally regularly. Since travel is another big industry, we decided to include a smart contract related to this sector as well.', 'image':'https://img.freepik.com/premium-vector/airline-boarding-pass-tickets-plane-travel-journey-airline-tickets-illustration_100456-1487.jpg?w=2000', 'path': '/travel-ticket'},
    {'title':'UnNumbered Event Ticket', 'description':'This smart contract is so similar to the stadium ticket smart contract. We thought that there are also other events that has unnumbered seats with blocks of categories apart from the matches in the stadiums. They also have the same ticketing logic with the matches in the stadiums with some differences.', 'image':'https://www.jfo.cz/wp-content/uploads/2022/05/gong-mimoradky.png', 'path': '/unnumbered-event-ticket'},
    {'title':'Weighted Multiple Voting', 'description':'Voting is one of the most wanted actions to be integrated into blockchain technology. The biggest reason is that there are many security problems in real-life voting and the process cannot be carried out transparently and reliably. Smart contracts with multiple weighted vote feature can fix this problem.', 'image':'https://news.uchicago.edu/sites/default/files/images/2019-07/Mobile%20voting.jpg', 'path': '/weighted-multiple-voting'},  
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