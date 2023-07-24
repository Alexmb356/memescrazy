import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';

function Memes() {
  const [allMemes, setAllMemes] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [textomeme, setTextomeme] = useState();
  const [textomemeabajo, setTextomemeabajo] = useState();

  const textmeme = (e) => {
    setTextomeme (e.target.value);
    console.log (e.target.value);

  }

  const textmemeabajo = (e) => {
    setTextomemeabajo (e.target.value);
    console.log (e.target.value);

  }

  const cargarMemes = async () => {
    try {
      const respuesta = await fetch('https://api.imgflip.com/get_memes');
      const datos = await respuesta.json();
      const data = datos.data;
      const resultado = data.memes;

      setAllMemes(resultado);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    cargarMemes();
  }, []);

  const handleImageClick = (url) => {
    setSelectedImage(url);
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
  };

  console.log("imagen seleccionada", selectedImage);

  const descarga = (e) => {
    html2canvas(document.querySelector('#exportar'), { useCORS: true }).then(function(canvas) {
      
      let img = canvas.toDataURL("memesImg/png");
      let link = document.createElement("a");
      link.download = "memepropio.png";
      link.href = img;
      link.click();
  });
     
  }

  function cambiaPosicionSuperior(e) {
    const $textoEncima = document.querySelector('.textoArriba');
    $textoEncima.style.textAlign = e.target.value;
}


function cambiaPosicionInferior(e) {
    const $textoDebajo = document.querySelector('.textoAbajo');
    $textoDebajo.style.textAlign = e.target.value;
}

function cambiarColorTextoSuperior(e) {
    const $textoEncima = document.querySelector('.textoArriba');
    $textoEncima.style.color = e.target.value;
}

function cambiarColorTextoInferior(e) {
    const $textoDebajo = document.querySelector('.textoAbajo');
    $textoDebajo.style.color = e.target.value;
}

 

  return (
   <>
   <div className='container'>
    <h1 className='mt-5 mb-3 text-light text-center'>Edita tu propio meme</h1>

    <div className='Container'>
      <div className='container-editor text-center row my-2'>
        <div className='col-md-12  my-2'> <h2 className='mt-2 mb-3 text-center text-light'>Escribe tu frase</h2></div>
        <div className='col-md-6 my-5'>
          
          <div className="contenedorInputs col-md-12">
            <div className="inputs col-md-12">
              <input onChange={textmeme} type="text" className="inputText" placeholder="texto 1" />
              <input onChange={cambiarColorTextoSuperior} type="color" />
            </div>
            <div className="inputs col-md-12">
              <p onChange={cambiaPosicionSuperior}>
                          <input type="radio" name="posicion" value="start" />principio
                          <input type="radio" name="posicion" value="center" defaultChecked />medio
                          <input type="radio" name="posicion" value="end" />fin
              </p>

            </div>
                  
            <div className="inputs col-md-12 mt-2  ">
                <input onChange={textmemeabajo} type="text" className="inputText" placeholder="texto 2" />
                <input onChange={cambiarColorTextoInferior} type="color" />
            </div>
            <div className="inputs col-md-12 mt-2  ">

                <p onChange={cambiaPosicionInferior}>
                    <input type="radio" name="posicion2" value="start" />principio
                    <input type="radio" name="posicion2" value="center" defaultChecked />medio
                    <input type="radio" name="posicion2" value="end" />fin
                </p>
            </div>

        </div>
        </div>
      
        <div className='image col-md-6'>
          {!selectedImage? null : 
          <>
          <div className='m-10 p-10'>
            <figure className='container-img position-relative' id="exportar" > 
              <p className='textoArriba'>{textomeme}</p>
              <img src={selectedImage} alt='meme' className='figure-img m-auto' />
              <p className='textoAbajo m-20'>{textomemeabajo}</p>
            </figure>

          </div>
          </>}
          
        </div> 
      </div>
    </div>
    <div className='text-center'>
      <button onClick={descarga} type='button' className='btn btn-primary mt-5 mb-4'>Descargar meme</button>

    </div>
    
    <h2 className='mt-2 mb-3 text-light'>Elige la imagen para tu meme</h2>
    <div className='card-list-Meme container'>
        
      {allMemes.map((meme) => (
        <div key={meme.id} className='card-meme' onClick={() => handleImageClick(meme.url)}>
          <div className='card-img'>
            <img className='imgmeme' src={meme.url} alt={`Meme ${meme.name}`} />
          </div>
          <div className='card-info'>
            <h5 className='card-title text-white'>{meme.name}</h5>
          </div>
        </div>
      ))}
    </div>
    </div>
   </>
   
  );
}

export default Memes;
