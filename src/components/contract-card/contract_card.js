import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ContractCard({name, description,image}) {
  return (
   <div style={{margin: '1%', alignItems: 'center', alignContent: 'center'}}>
    <Card style={{ width: '24rem', height: '24.6rem', padding:'6px', alignItems:'center' }}>
   <Card.Img style={{width: '18rem', height:'10rem', alignItems: 'center', textAlign:"center"}} variant="top" src={image} />
   <Card.Body>
     <Card.Title style={{ fontSize: '20px', color: 'black', textDecoration: 'underline' }}>{name}</Card.Title>
     <Card.Text style={{ fontSize: '13px'}}>
         {description}
     </Card.Text>
     <Button size='sm' variant="primary">Create a Contract</Button>
   </Card.Body>
 </Card></div>
  );
}

export default ContractCard;