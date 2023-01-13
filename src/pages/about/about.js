
import './about.css';
import PersonItem from './person_item';

export default function About() {
  return (
    <div id='about'>
        <h1 style={{textAlign: 'center', marginTop: '20px'}}>Who We Are?</h1>
        <div className="members">
          <PersonItem instagramUrl="https://www.instagram.com/bahricanyesil/" linkedinUrl="https://www.linkedin.com/in/bahrican-yesil-490151172/" githubUrl="https://github.com/bahricanyesil" description="I'm a 4th-year computer engineering student at Bogazici University. I am specifically interested in mobile, web, and desktop app development with cross platform frameworks and also back end development." img="https://avatars.githubusercontent.com/u/60237280?v=4" name="Bahrican Yeşil"/>
          <PersonItem instagramUrl="https://www.instagram.com/egemenatik/" linkedinUrl="https://www.linkedin.com/in/egemen-atik/" githubUrl="https://github.com/egemenatikk" description="I am a senior computer engineering student in Bogazici University. I am mostly interested in mobile development, backend development and a little bit game development." img="https://avatars.githubusercontent.com/u/100771925?v=4" name="Egemen Atik"/>
          <PersonItem instagramUrl="https://www.instagram.com/beratdamarr/" linkedinUrl="https://www.linkedin.com/in/berat-damar-a8a1b7195/" githubUrl="https://github.com/BeratDamar" description=" I'm a 4th-year computer engineering student at Bogazici University. I'm interested in operating systems, web development, blockchain and parallel processing. I enjoy to implement a wide variety of software applications." img="https://avatars.githubusercontent.com/u/74484731?v=4" name="Berat Damar"/>
        </div>

        <h1 style={{textAlign: 'center', marginTop: '20px'}}>Our Advisor</h1>
        <div className="members">
    <div className="advisorMember">
    <img width={150} height={150} src="https://academics.boun.edu.tr/ozturaca/sites/ozturaca/files/styles/profile_picture/public/2021-04/ozturan_0.jpg?itok=u807H_ML" alt="Can"/>
    <div className="advisorDescription">
        <h1>Can Özturan</h1>
        <h2>Computer Engineering,</h2>
        <h2>Bogazici University</h2>
        <p>Can Özturan received his Ph.D. degree in Computer Science from Rensselaer Polytechnic Institute, Troy, NY, USA, in 1995. After working as a Postdoctoral Staff Scientist at the ICASE (Institute for Computer Applications in Science), NASA Langley Research Center, he joined the Department of Computer Engineering, Bogazici University in Istanbul, Turkey, as a faculty member in 1996.</p>
    </div>
  </div>
        </div>
    </div>
  );
}