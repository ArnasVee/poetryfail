import {useState, useEffect} from "react";
import Search from "../Search/Search";
import Poetry from "../Poetry/Poetry";
import {Row} from "react-bootstrap";

const Home =()=>{
    const [poetry, setPoetry] = useState({
        title:'',
        author:'',
        lines:''
    });

    const [criteria,setCriteria]=useState('')

    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (term)=>{
        // console.log('is home komponento ' + term)
        setSearchTerm(term)
    }
    useEffect(()=>{
        try{
            fetch(`https://poetrydb.org/title/${searchTerm}`)
                .then(response=>response.json())
                .then(data=>setPoetry(data))
        }catch(msg){
            console.log(msg)
        }
    },[searchTerm])  //<--prasuka efekta su nauja reiksme, tipo tikrina
    searchTerm && console.log(poetry)
    return(
        <div>
            <Search onSearch ={handleSearch}/>
            {poetry &&
            <div>
                <h2>Paieskos rezultatai</h2>
                <Row>
                    {poetry.map(rhymes=>(<Poetry id = {rhymes.title} value={rhymes.author} url={rhymes.lines}/>))}   //cia baisiai svarbu, cia jau parodo aplikacijoje
                </Row>
            </div>}
        </div>
    )
}

export default Home