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
    <h1 className=' mb-2 text-light text-center'>Edita tu propio meme</h1>
    {!selectedImage? null : 
          <>
    <div className='Container'>
      <div className='container-editor text-center row my-2'>
        
        <div className='col-md-6 my-4'>
          
          <div className="contenedorInputs col-md-12">
          <div className='col-md-12  my-2'> <h2 className='mt-2 mb-4 text-center text-light'>Escribe tu frase</h2></div>
          <div className="inputs col-md-12 mt-2  ">
                <h5 className='text-light'>FRASE SUPERIOR</h5>
            <div className="inputs col-md-12">
              <input onChange={textmeme} type="text" className="inputText" placeholder="Escribe tu frase superior" />
              <input onChange={cambiarColorTextoSuperior} type="color" />
            </div>
            <div className="inputs col-md-12 mt-1 ">
              
            
              <p onChange={cambiaPosicionSuperior}>
              <label className='text-light'><strong>Ubicación Frase superior: </strong></label><input type="radio" name="posicion" value="start" /><label className='text-light'>Inicio</label>
                  <input type="radio" name="posicion" value="center" defaultChecked /><label className='text-light'>Medio</label>
                  <input type="radio" name="posicion" value="end" /><label className='text-light'>Fin</label>
              </p>

            </div>
            </div>
            <div className="inputs col-md-12 mt-5  ">
                <h5 className='text-light'>FRASE INFERIOR</h5>
              <div className="inputs col-md-12 mt-2  ">
                  <input onChange={textmemeabajo} type="text" className="inputText" placeholder="Escribe tu frase inferior" />
                  <input onChange={cambiarColorTextoInferior} type="color" />
              </div>
              <div className="inputs col-md-12 mt-1  ">
              
                  <p onChange={cambiaPosicionInferior}>
                  <label className='text-light'><strong>Ubicación Frase inferior: </strong></label><input type="radio" name="posicion2" value="start" /><label className='text-light'>Inicio</label>
                      <input type="radio" name="posicion2" value="center" defaultChecked /><label className='text-light'>Medio</label>
                      <input type="radio" name="posicion2" value="end" /><label className='text-light'>Fin</label>
                  </p>
              </div>
            </div>     

        </div>
        </div>
      
        <div className='image col-md-6'>
          
          <div className=' meme'>
            <figure className='container-img position-relative' id="exportar" > 
              <p className='textoArriba'><strong>{textomeme}</strong></p>
              <img src={selectedImage} alt='meme' className='figure-img m-auto' />
              <p className='textoAbajo m-20'><strong>{textomemeabajo}</strong></p>
            </figure>

          </div>
          
          
        </div> 
      </div>
    </div>
    <div className='text-center'>
      <button onClick={descarga} type='button' className='btn btn-primary mb-4'>Descargar meme</button>

    </div>
    </>}
    
    
    <h2 className='mt-2 mb-3 text-light'>Elige la imagen para tu meme</h2>
    <div className='card-list-Meme container'>
        
      {allMemes.map((meme) => (
        <div key={meme.id} className='card-meme' onClick={() => handleImageClick(meme.url)}>
          <div className='card-img'>
            <img className='imgmeme' src={meme.url} alt={`Meme ${meme.name}`} />
          </div>
          <div className='card-info'>
            <h6 className='card-title text-white'>{meme.name}</h6>
          </div>
        </div>
      ))}
    </div>
    </div>
   </>
   
  );
}

export default Memes;
