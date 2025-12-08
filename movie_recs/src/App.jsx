import { useEffect, useState } from 'react'
import './App.css'


const Card = ({title} ) => {

  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`${title} has been liked: ${liked}`);
  }, [liked]);

  useEffect(() => {
    console.log(`CARD RENDERED`);
  }, []);
  
  return (
    <div className='card' onClick={() => setCount(count + 1)}>
      <h2>{title} <br/> {count} </h2>
      <button onClick={() => setLiked(!liked)}>
        {liked ? '❤️' : '🩶'}
      </button>
    </div>
  )
}
const App = () => {

  return (
      <div className='card-container'>
        <Card title="Avatar" rating={5} actors={[{name : 'actors'}]} />
        <Card title="Me Before You" />
        <Card title="Harry Potter and the Philosopher's Stone" />
      </div>
  )
}

export default App
