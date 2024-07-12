import React from 'react'
import "./Home.scss"

const Card = ({ img }) => (
  <img className='card' src={img} alt="cover" />
)
const Row = ({ title,arr = [{
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqBruQGzVpW8kl1A0ikZvKSeRNTIqRmXKKYw&s"
}
]}) => (
  <div className='row'>
    <h2>{title}</h2>
    <div>
      {
        arr.map((item)=>(
          <Card img={item.img} />
        ))
      }
     
    
    </div>
  </div>
)
function Home() {
  return (
    <section className='home'>
      <div className="banner"></div>
      <Row className="row" title={"Popular on Netflix"} />
    </section>
  )
}

export default Home
